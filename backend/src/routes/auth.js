import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.route('/user').get(protect, userController.getUserProfile)
router.route('/logout').post(protect, userController.logoutUser)

export default router