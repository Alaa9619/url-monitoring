import httpStatus from 'http-status'
import { urlChecksServices } from './services.js'

const { CREATED } = httpStatus

export const urlChecksController = {
  createUrlChecksInstance: async (req, res, next) => {
    const { body, user } = req

    try {
      const urlChecksInstance = await urlChecksServices.createUrlChecksInstance({ ...body }, { userId: user._id })

      return res.status(CREATED).send(urlChecksInstance)
    } catch (error) {
      return next(error)
    }
  }

}
