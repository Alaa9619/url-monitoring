import { urlChecksTag } from '../tags.js'
import { tagsParameter } from './parameters.js'
import { createUrlChecksRequestBody, createUrlChecksResponseBody, getUrlChecksByTagResponseBody } from './schema.js'

export const urlChecksDocs = {
  '/url-checks/': {
    post: {
      tags: [urlChecksTag.name],
      description: 'Creates new url checks instance',

      requestBody: {
        content: {
          'application/json': {
            schema: createUrlChecksRequestBody
          }
        }
      },

      responses: {
        201: {
          description: 'Url checks is created for a specific user',
          content: {
            'application/json': {
              schema: createUrlChecksResponseBody
            }
          }
        },

        400: {
          description: 'Bad Request, either from the schema of the request body or mongoose'
        }

      }
    },

    get: {
      tags: [urlChecksTag.name],
      description: 'Gets new url checks instances related to the given tag',
      parameters: [tagsParameter],
      responses: {
        200: {
          description: `Url checks array returned successfully for a specific user.
          Note: if the tag is empty array then it gets all the url checks instances for a given user
          `,
          content: {
            'application/json': {
              schema: getUrlChecksByTagResponseBody
            }
          }
        },

        400: {
          description: 'Bad Request, either from the schema of the request body or mongoose'
        },

        401: {
          description: 'The user does not own the url'
        }

      }

    }

  }

}
