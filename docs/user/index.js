import { usersTag } from '../tags.js'
import { signupRequestBodySchema, signupResponseBodySchema } from './schema.js'

export const usersDocs = {

  '/users/sign-up': {
    post: {
      tags: [usersTag.name],
      description: 'Create new user',

      requestBody: {
        content: {
          'application/json': {
            schema: signupRequestBodySchema
          }
        }
      },

      responses: {
        200: {
          description: 'User signup successfully with an email verification sent',
          content: {
            'application/json': {
              schema: signupResponseBodySchema
            }
          }
        },

        400: {
          description: 'Bad Request, either from the schema of the request body or mongoose'
        }
      }

    }
  }
}
