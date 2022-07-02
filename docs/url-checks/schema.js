import { PROTOCOLS } from '../../src/modules/url-checks/constants.js'

export const urlChecksBasicSchema = {
  type: 'object',
  required: ['url', 'name', 'protocol', 'ignoreSSL'],
  properties: {
    url: {
      type: 'string'
    },
    name: {
      type: 'string'
    },

    protocol: {
      type: 'string',
      enum: PROTOCOLS
    },

    path: {
      type: 'string'
    },

    webhook: {
      type: 'string'
    },
    threshold: {
      type: 'number',
      default: 1
    },
    interval: {
      type: 'number',
      default: 10
    },
    timeout: {
      type: 'number',
      default: 5

    },
    port: {
      type: 'number'
    },
    authentication: {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    },
    httpHeaders: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    assert: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number'
        }
      }
    },
    ignoreSSL: {
      type: 'boolean'
    }

  }
}

export const createUrlChecksRequestBody = {
  ...urlChecksBasicSchema
}

export const createUrlChecksResponseBody = {
  type: 'object',
  required: [...urlChecksBasicSchema.required, 'userId'],
  properties: {
    userId: { type: 'string' },
    ...urlChecksBasicSchema.properties
  }
}

export const getUrlChecksByTagResponseBody = {
  type: 'array',
  items: {
    ...createUrlChecksResponseBody
  }

}
