import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.util.js'

// @desc    Create new exerciseLog
// @route   POST /api/exercises/log/:id
// @access  Private
export const createExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = +req.params.id
	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found!')
	}

	let timesDefault = []

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		})
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})

// @desc    Get exerciseLog
// @route   GET /api/exercises/log/:id
// @access  Private
export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseLog = await prisma.exerciseLog.findUnique({
    where: {
      id: +req.params.id
    },
    include: {
      exercise: true,
      times: {
        orderBy: {
          id: 'asc'
        }
      }
    }
  })

  if (!exerciseLog) {
    res.status(404)
    throw new Error('Exercise Log not found')
  }

  const prevExerciseLog = await prisma.exerciseLog.findFirst({
    where: {
      exerciseId: exerciseLog.exercise.id,
      userId: req.user.id,
      isCompleted: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      times: true
    }
  })

  res.json({
    ...exerciseLog,
    times: addPrevValues(exerciseLog, prevExerciseLog)
  })
})

// @desc    Update exercise log time
// @route   PUT /api/exercises/log/time/:id
// @access  Private
export const updateExerciseLogTime = asyncHandler(async (req, res) => {
  const { weight, repeat, isCompleted } = req.body
  try {
    const exerciseLogTime = await prisma.exerciseTime.update({
      where: {
        id: +req.params.id
      },
      data: {
        weight: weight,
        repeat: repeat,
        isCompleted: isCompleted
      }
    })
    res.json(exerciseLogTime)
  } catch (error) {
    res.status(404)
    throw new Error('Exercise log time not found')
  }
})

// @desc    Update status of complete exercise log
// @route   PATCH /api/exercises/log/complete/:id
// @access  Private
export const completeExerciseLog = asyncHandler(async (req, res) => {
  const { isCompleted } = req.body
  try {
    const exerciseLog = await prisma.exerciseLog.update({
      where: {
        id: +req.params.id
      },
      data: {
        isCompleted: isCompleted
      },
      include: { exercise: true, workoutLog: true }
    })
    res.json(exerciseLog)
  } catch (error) {
    res.status(404)
    throw new Error('Exercise log not found')
  }
})
