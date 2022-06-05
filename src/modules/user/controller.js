import httpStatus from 'http-status'
import { userServices } from './services.js'

const { OK } = httpStatus

export const userController = {
  signUp: async (req, res, next) => {
    const { body } = req
    try {
      const user = await userServices.signUp(body)

      return res.status(OK).send(user)
    } catch (error) {
      return next(error)
    }
  }
}
