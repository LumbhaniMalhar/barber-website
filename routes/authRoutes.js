const express = require('express');
const router = express.Router();
const { signUp, signIn, isUserSignedIn } = require('../controllers/auth');

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/test", isUserSignedIn, (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});


module.exports = router;
