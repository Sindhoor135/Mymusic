const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();


// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

const admin = require("../config/firebase.config");


// Route to handle user data
router.post('/', async (req, res) => {
  const { userId, name, email } = req.body;

  try {
    let user = await User.findOne({ userId });

    if (user) {
      // If user exists, update user
      user.name = name;
      user.email = email;
      user = await user.save();
      console.log("Saved succesfully");
    } else {
      // If user doesn't exist, create new user
      user = new User({ userId, name, email });
      user = await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// router.get("/login", async (req, res) => {
//    if (!req.headers.authorization) {
//     return res.status(500).send({ message: "Invalid Token" });
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decodeValue = await admin.auth().verifyIdToken(token);
//     if (!decodeValue) {
//       return res.status(500).json({ message: "Un Authorize" });
//     }
//     // checking user email already exists or not
//     const userExists = await user.findOne({ user_id: decodeValue.user_id });
//     if (!userExists) {
//       newUserData(decodeValue, req, res);
//     } else {
//       updateUserData(decodeValue, req, res);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error });
//   }
// });


const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

module.exports = router;
