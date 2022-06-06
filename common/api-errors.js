/* eslint-disable space-before-function-paren */
import httpStatus from 'http-status'

const { INTERNAL_SERVER_ERROR } = httpStatus

class APIError extends Error {
  constructor({ message, status = INTERNAL_SERVER_ERROR } = {}) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

export default APIError
