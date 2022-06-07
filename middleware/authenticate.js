import { FORBIDDEN, UNAUTHORIZED } from 'http-status'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import APIError from '../common/api-errors'
import { Users } from '../src/modules/users/models'
import { PENDING } from '../src/modules/users/models/constants'

export const authenticate = async (req, res, next) => {
  const token = req.headers.Authorization

  if (!token) {
    throw new APIError({ status: FORBIDDEN, message: 'A token is required for authentication' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Users.findOne({ ...decoded }).lean()
    if (!_.isNil(user)) {
      if (user.status === PENDING) {
        throw new APIError({ status: UNAUTHORIZED, message: 'The status is still pending you should verify your email first' })
      } else {
        return res.status(UNAUTHORIZED).send('Invalid Token')
      }
    }
    req.user = user
  } catch (err) {
    return res.status(UNAUTHORIZED).send('Invalid Token')
  }
  return next()
}
