import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  const sessionData = req.sessionData
  const authHeader = req.headers.authorization

  if (req.session?.token) {
    token = req.session.token
  } else if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]
      // const decoded = jwt.verify(token, process.env.JWT_SEED)
      // req.user = await User.findById(decoded.id).select('-password')

      // next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SEED)
    req.user = await User.findById(decoded.id).select('-password')

    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

export { protect }