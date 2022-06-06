import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../common/api-errors.js'

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpStatus

export const errorHandler = (err, res, next) => {
  if (err instanceof mongoose.Error.ValidationError || err.isJoi) {
    err = new APIError({ message: err.message, status: BAD_REQUEST })
  } else {
    err = new APIError({ message: 'Undetected error', status: INTERNAL_SERVER_ERROR })
  }
  const response = { message: err.message, status: err.status }

  // TODO  some kind of logging should be implemented here for now we console it
  console.log(err)
  return res.status(response.status).json(response)
}
