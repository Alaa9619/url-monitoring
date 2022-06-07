import httpStatus from 'http-status'
import { urlChecksServices } from './services.js'

const { OK } = httpStatus

export const urlChecksController = {
  createUrlChecksInstance: async (req, res, next) => {
    const { body, user: { _id: userId } } = req
    try {
      const urlChecksInstance = await urlChecksServices.signUp({ ...body }, { userId })

      return res.status(OK).send(urlChecksInstance)
    } catch (error) {
      return next(error)
    }
  }

}
