import httpStatus from 'http-status'
import { userServices } from './services.js'

const { OK, NO_CONTENT } = httpStatus

export const userController = {
  signUp: async (req, res, next) => {
    const { body } = req
    try {
      const user = await userServices.signUp(body)

      return res.status(OK).send(user)
    } catch (error) {
      return next(error)
    }
  },

  verifyEmail: async (req, res, next) => {
    console.log(req.query)
    const { query: { verificationToken } } = req
    try {
      await userServices.verifyEmail({ verificationToken })

      return res.status(NO_CONTENT).send()
    } catch (error) {
      return next(error)
    }
  },

  login: async (req, res, next) => {
    console.log(req.query)
    const { body: { username, email, password } } = req
    try {
      const token = await userServices.login({ username, email, password })

      return res.status(OK).send(token)
    } catch (error) {
      return next(error)
    }
  }
}
