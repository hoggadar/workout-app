import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout
} from './workout.controller.js'
import {
  completeWorkoutLog,
  createWorkoutLog,
  getWorkoutLog
} from './log/workout-log.controller.js'

const router = express.Router()

router.route('/').get(protect, getWorkouts)
router.route('/').post(protect, createWorkout)
router.route('/:id').get(protect, getWorkout)
router.route('/:id').put(protect, updateWorkout)
router.route('/:id').delete(protect, deleteWorkout)

router.route('/log/:id').post(protect, createWorkoutLog)
router.route('/log/:id').get(protect, getWorkoutLog)
router.route('/log/complete/:id').patch(protect, completeWorkoutLog)

export default router
