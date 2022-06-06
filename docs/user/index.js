import { usersTag } from '../tags.js'
import { verificationTokenParameter } from './parameters.js'
import { signupRequestBodySchema, signupResponseBodySchema } from './schema.js'

export const usersDocs = {

  '/users/sign-up': {
    post: {
      tags: [usersTag.name],
      description: 'Sign up new user and sends a verification email',

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
  },

  '/users/verify-email': {
    post: {
      tags: [usersTag.name],
      description: 'Verify user email',
      parameters: [verificationTokenParameter],

      responses: {
        204: {
          description: 'Email is verified successfully'
        },

        400: {
          description: 'Bad Request, either from the schema of the request body or mongoose'
        },

        404: {
          description: 'Not found token'
        }
      }

    }
  }
}
