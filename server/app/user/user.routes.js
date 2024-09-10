import express from 'express'
import { profile } from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/profile').get(protect, profile)

export default router
