import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
  createNewExercise,
  deleteExercise,
  getExercises,
  updateExercise
} from './exercise.controller.js'
import {
  createExerciseLog,
  getExerciseLog,
  updateExerciseLogTime,
  completeExerciseLog
} from './log/exercise-log.controller.js'

const router = express.Router()

router.route('/').get(protect, getExercises)
router.route('/').post(protect, createNewExercise)
router.route('/:id').put(protect, updateExercise)
router.route('/:id').delete(protect, deleteExercise)

router.route('/log/:id').post(protect, createExerciseLog)
router.route('/log/:id').get(protect, getExerciseLog)
router.route('/log/time/:id').put(protect, updateExerciseLogTime)
router.route('/log/complete/:id').patch(protect, completeExerciseLog)

export default router
