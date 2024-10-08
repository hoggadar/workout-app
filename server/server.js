import 'colors'
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import workoutRoutes from './app/workout/workout.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

const app = express()

const PORT = process.env.PORT || 3000

async function main() {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(cors())
  app.use(express.json())
  const __dirname = path.resolve()
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))
  app.use('/api/auth', authRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/exercises', exerciseRoutes)
  app.use('/api/workouts', workoutRoutes)
  app.use(notFound)
  app.use(errorHandler)
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
        .bold
    )
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
