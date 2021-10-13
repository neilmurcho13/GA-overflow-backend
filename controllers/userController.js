import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'

async function getAllUsers(req, res, next) {
  try {
    const user = await User.find()
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function getProfile(req, res, next) {
  return res.status(201).json(req.currentUser)
}

async function registerUser(req, res, next) {
  try {
    const user = await User.create(req.body)
    return res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'Not a user' })
    }

    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const token = jwt.sign(
      { userId: user._id }, // the information we want to store on the token
      secret, // what to encrypt the token with
      { expiresIn: '12h' } // how long the token is valid for
    )

    return res.status(202).send({ token, message: 'Login successful' })
  } catch (err) {
    next(err)
  }
}

export default {
  registerUser,
  loginUser,
  getAllUsers,
  getProfile
}
