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
      assert: {
        statusCode: Joi.number().min(100).max(599) // range of the status code
      },
      tags: Joi.array().items(Joi.string()),
      ignoreSSL: Joi.boolean().required()

    }
  },

  getUrlChecksInstance: {
    params: {
      id: Joi.string().hex().length(24).required()
    }
  },

  getBulkUrlsChecks: {
    query: {
      tags: Joi.array().items(Joi.string()).min(1).single()
    }
  },

  deleteUrlChecksInstance: {
    params: {
      id: Joi.string().hex().length(24).required()
    }
  },

  updateUrlChecksInstance: {
    params: {
      id: Joi.string().hex().length(24).required()
    },
    body: {
      name: Joi.string(),
      url: Joi.string().regex(URL_REGEX),
      protocol: Joi.string().valid(...PROTOCOLS),
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
      assert: {
        statusCode: Joi.number().min(100).max(599) // range of the status code
      },
      tags: Joi.array().items(Joi.string()),
      ignoreSSL: Joi.boolean()

    }
  }
}
