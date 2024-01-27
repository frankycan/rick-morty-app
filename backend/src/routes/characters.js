import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import * as characterController from '../controllers/characterController.js'

const router = express.Router()

router.route('/').get(protect, characterController.getAllByPage)
router.route('/:id').get(protect, characterController.getById)

export default router