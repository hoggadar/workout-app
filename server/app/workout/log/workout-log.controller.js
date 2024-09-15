import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.util.js'

// @desc    Create new workout log
// @route   POST /api/workouts/log/:id
// @access  Private
export const createWorkoutLog = asyncHandler(async (req, res) => {
  const workoutId = +req.params.id
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId
    },
    include: {
      exercises: true
    }
  })

  if (!workout) {
    res.status(404)
    throw new Error('Workout not found')
  }

  const workoutLog = await prisma.workoutLog.create({
    data: {
      user: {
        connect: {
          id: req.user.id
        }
      },
      workout: {
        connect: {
          id: workoutId
        }
      },
      exerciseLogs: {
        create: workout.exercises.map(exercise => ({
          user: {
            connect: {
              id: req.user.id
            }
          },
          exercise: {
            connect: {
              id: exercise.id
            }
          },
          times: {
            create: Array.from({ length: exercise.times }, () => ({
              weight: 0,
              repeat: 0
            }))
          }
        }))
      }
    },
    include: {
      exerciseLogs: {
        include: {
          times: true
        }
      }
    }
  })
  res.json(workoutLog)
})

// @desc    Get workout log
// @route   GET /api/workouts/log/:id
// @access  Private
export const getWorkoutLog = asyncHandler(async (req, res) => {
  const workoutLog = await prisma.workoutLog.findUnique({
    where: {
      id: +req.params.id
    },
    include: {
      workout: {
        include: {
          exercises: true
        }
      },
      exerciseLogs: {
        orderBy: {
          id: 'asc'
        },
        include: {
          exercise: true
        }
      }
    }
  })

  if (!workoutLog) {
    res.status(404)
    throw new Error('Workout Log not found')
  }

  res.json({
    ...workoutLog,
    minute: calculateMinute(workoutLog.workout.exercises.length)
  })
})

// @desc    Update workout log completed
// @route   PATCH /api/workouts/log/complete/:id
// @access  Private
export const completeWorkoutLog = asyncHandler(async (req, res) => {
  try {
    const workoutLog = await prisma.workoutLog.update({
      where: {
        id: +req.params.id
      },
      data: {
        isCompleted: true
      }
    })
    res.json(workoutLog)
  } catch (error) {
    res.status(404)
    throw new Error('Workout log not found')
  }
})
