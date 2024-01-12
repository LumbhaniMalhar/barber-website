const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Barber = require('../models/barber');

const secret = 'web-dev-bootcamp';
exports.signUp = async (req, res, next) => {
  //logic for signup.
  try {
    console.log("start signup");
    const {
      firstName,
      lastName,
      email,
      password,
      availability,
      serviceIds,
      isOwner = false,
      instaId = ''
    } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).send({ status: 'error', message: 'email, password, first name is necessary' });
    };

    const salt = bcrypt.genSaltSync();
    console.log("Salt: ", salt);
    const encriptedPassword = await bcrypt.hash(password, salt);

    const newBarber = new Barber({
      firstName,
      lastName,
      email,
      password: encriptedPassword,
      availability,
      serviceIds,
      isOwner,
      instaId,
    });
    const user = await newBarber.save();
    const token = jwt.sign(
      { userId: user._id, email: user.email, isOwner: user.isOwner },
      secret,
      { expiresIn: '10h' }
    );

    res.setHeader('web-dev-token', token);
    return res.status(200).send({ status: 'success', message: 'User created successfully!' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Something went wrong.', error: error });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    console.log("starting sign in");
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).send({ status: 'error', message: 'email and password is necessary' });
    };

    const user = await Barber.findOne({ email: email });

    if (!user) {
      return res.status(401).send({ status: 'error', message: 'Email not found.' });
    }

    const passwordComparison = await bcrypt.compare(password, user.password);

    if (!passwordComparison) {
      return res.status(401).send({ status: 'error', message: 'password incorrect.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, isOwner: user.isOwner },
      secret,
      { expiresIn: '10h' }
    );

    res.setHeader('web-dev-token', token);
    return res.status(200).send({ status: 'success', user });

  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Something went wrong.', error: error });
  }
};

exports.isUserSignedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')?.[1];
    if (!token) {
      return res.status(401).send({ status: 'error', message: 'Please log in.' });
    }

    const userData = jwt.verify(token, secret);
    console.log({ userData });
    if (!userData) {
      return res.status(401).send({ status: 'error', message: 'Please log in.' });
    }
    req.user = userData;
    console.log({ userData });
    next();
  } catch (error) {
    return res.status(401).send({ status: 'error', message: 'invalid request! Please log in' });
  }
};