import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { hash, verify } from 'argon2'
import { generateToken } from './generate-token.js'

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  const isValidPassword = await verify(user.password, password)

  if (user && isValidPassword) {
    const token = generateToken(user.id)
    res.json({ user, token })
  } else {
    res.status(401)
    throw new Error('Email and password are not correct')
  }
})

// @desc    Signup
// @route   POST /api/auth/login
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: await hash(password)
    }
  })

  const token = generateToken(user.id)

  res.json({ user, token })
})
