import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  const sessionData = req.sessionData
  const authHeader = req.headers.authorization

  if (req.session?.token) {
    token = req.session.token
  } else {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEED)
    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    res.status(401)
    throw new Error('Not authorized, invalid token')
  }
})

export { protect }