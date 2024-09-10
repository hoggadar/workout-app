// @desc    Auth user
// @route   POST /api/auth/login

import { prisma } from "../prisma.js"

// @access  Public
export const authUser = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}
