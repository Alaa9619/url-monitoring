import httpStatus from 'http-status'
import { urlChecksServices } from './services.js'

const { CREATED, OK, NO_CONTENT } = httpStatus

export const urlChecksController = {
  createUrlChecksInstance: async (req, res, next) => {
    const { body, user } = req

    try {
      const urlChecksInstance = await urlChecksServices.createUrlChecksInstance({ ...body }, { userId: user._id })

      return res.status(CREATED).send(urlChecksInstance)
    } catch (error) {
      return next(error)
    }
  },

  getUrlChecksInstance: async (req, res, next) => {
    const { params: { id: urlChecksInstanceId }, user: { _id: userId } } = req

    try {
      const urlChecksInstance = await urlChecksServices.getUrlChecksInstance({ urlChecksInstanceId }, { userId })

      return res.status(OK).send(urlChecksInstance)
    } catch (error) {
      return next(error)
    }
  },

  getBulkUrlsChecks: async (req, res, next) => {
    const { query: { tags }, user: { _id: userId } } = req
    try {
      const urlChecksBulk = await urlChecksServices.getBulkUrlsChecks({ tags }, { userId })

      return res.status(OK).send(urlChecksBulk)
    } catch (error) {
      return next(error)
    }
  },

  deleteUrlChecksInstance: async (req, res, next) => {
    const { params: { id: urlChecksInstanceId }, user: { _id: userId } } = req
    try {
      await urlChecksServices.deleteUrlChecksInstance({ urlChecksInstanceId }, { userId })

      return res.status(NO_CONTENT).send()
    } catch (error) {
      return next(error)
    }
  }
}
