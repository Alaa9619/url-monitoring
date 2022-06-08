import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import APIError from '../common/api-errors.js'
import { PENDING } from '../src/modules/users/models/constants.js'
import { Users } from '../src/modules/users/models/index.js'

const { FORBIDDEN, UNAUTHORIZED } = httpStatus

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('JWT ', '').trim()

  if (!token) {
    throw new APIError({ status: FORBIDDEN, message: 'A token is required for authentication' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Users.findOne({ email: decoded.email, username: decoded.username, jwt: token }).lean()
    if (_.isNil(user)) {
      throw new APIError({ status: UNAUTHORIZED, message: 'The token is invalid' })
    } else if (!_.isNil(user) && user.status === PENDING) {
      throw new APIError({ status: UNAUTHORIZED, message: 'Please verify your email first' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(UNAUTHORIZED).send('Invalid Token')
  }
}
