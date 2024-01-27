import express from 'express'
import characters from './characters.js'
import auth from './auth.js'

const router = express.Router()

router.use('/characters', characters)
router.use('/auth', auth)

export default router