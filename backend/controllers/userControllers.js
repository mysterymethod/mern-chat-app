const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
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
  if (userExists) {
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
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic
    })
  }

  //if user is not created succesfully then throw error
  else {
    res.status(400);
    throw new Error('User not created.')
  }

})


module.exports = { registerUser }


















//Async handler handles error for us.