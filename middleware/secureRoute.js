import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user.js'

// Make sure that the user making the request has a valid token and they exist.

async function secureRoute(req, res, next) {
  try {
    // get the token from the headers
    const authToken = req.headers.authorization

    // if there is no token or the string doesn't start with Bearer, return unauthorized
    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).send({
        message: 'You are not authorized for perform this action'
      })
    }

    // strip the Bearer part of the token out as it doesn't hold any data
    const token = authToken.replace('Bearer ', '')

    // try to extract the data on the token using the secret. Also handles any errors
    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      // find the user by id using the id on the token (set in the user controller)
      const user = await User.findById(data.userId)

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      // OBJECT LEVEL PERMISSIONS - we will come back to this later
      req.currentUser = user

      next()
    })
  } catch (err) {
    return res.status(401).send({ message: 'Unathorized' })
  }
}

export default secureRoute
