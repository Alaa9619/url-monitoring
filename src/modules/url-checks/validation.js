import Joi from 'joi'
import { PROTOCOLS } from './constants.js'
import { URL_REGEX } from './models/constants.js'

export const urlChecksValidation = {
  createUrlChecksInstance: {
    body: {
      name: Joi.string().required(),
      url: Joi.string().regex(URL_REGEX).required(),
      protocol: Joi.string().valid(...PROTOCOLS).required(),
      path: Joi.string(),
      port: Joi.number().min(0),
      webhook: Joi.string().regex(URL_REGEX),
      timeout: Joi.number().min(0).default(5),
      interval: Joi.number().min(0).default(10),
      threshold: Joi.number().min(0).default(1),
      authentication: Joi.object({
        username: Joi.string(),
        password: Joi.string().min(8)
      }),
      httpHeaders: Joi.array(),
      assert: Joi.object({
        statusCode: Joi.number().min(100).max(599) // range of the status code
      }),
      tags: Joi.array().items(Joi.string()),
      ignoreSSL: Joi.boolean().required()

    }
  }

}