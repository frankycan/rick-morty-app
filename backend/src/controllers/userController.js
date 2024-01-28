import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check if email exists in db
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(404)
    throw new Error('User already exists')
  }

  // create new user document in db
  const user = await User.create({ email, password })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check if user email exists in db
  const user = await User.findOne({ email })

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    const sessionData = {
      _id: user._id,
      email: user.email,
      favoriteCharacters: user.favoriteCharacters,
      userToken: generateToken(user._id)
    }
    req.session = { token: sessionData.userToken }
    res.json(sessionData)
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id)

  if (user) {
    req.session = null
    res.json()
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { favoriteCharacters } = req.body
  const user = await User.findById(req.user._id)

  if (user) {
    await User.updateOne({ _id: req.user._id }, { $set: { favoriteCharacters: favoriteCharacters }})
    const updatedUser = await User.findById(req.user._id)
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      favoriteCharacters: updatedUser.favoriteCharacters
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      favoriteCharacters: user.favoriteCharacters
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// generate token that expires in 12 hours
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEED, { expiresIn: '12h' })
}

export { registerUser, loginUser, logoutUser, getUserProfile, updateUser }