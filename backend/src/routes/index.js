// var router = require('express').Router()
// var characters = require('./characters')
// var auth = require('./auth')

import express from 'express'
import characters from './characters.js'
import auth from './auth.js'

const router = express.Router()

router.use('/characters', characters)
router.use('/auth', auth)

export default router