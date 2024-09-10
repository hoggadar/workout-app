import 'colors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import authRoutes from './app/auth/auth.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

async function main() {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use('/api/auth', authRoutes)
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
