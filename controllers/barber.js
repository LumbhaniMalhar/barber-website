const bcrypt = require('bcrypt');
const Barber = require('../models/barber');

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
    await newBarber.save();
    return res.status(200).send({ status: 'success', message: 'User created successfully!' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Something went wrong.', error: error });
  }
}