const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please Enter all the fields')
  }


  //check if the user already exist in db or not
  //query to find user by email
  const userExist = await User.findOne({ email });

  //if user is found throw error
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  //else create new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  })

  //if user is succesfully created
  //also create a fresh jwt token for user
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    })
  }

  //if user is not created succesfully then throw error
  else {
    res.status(400);
    throw new Error('User not created.')
  }

})



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find user in the db with email
  const user = await User.findOne({ email })


  // if user exist and entered password matches with the orinal password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password");
  }

})



// url for seach - /api/user?search?pranoy
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});


module.exports = { registerUser, authUser, allUsers }


















//Async handler handles error for us.