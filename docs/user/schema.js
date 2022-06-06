import { PENDING, VERIFIED } from '../../src/modules/users/models/constants.js'

export const signupRequestBodySchema = {
  type: 'object',
  required: ['username', 'password', 'email'],
  properties: {
    username: {
      type: 'string',
      example: 'Someone-cool96'
    },
    email: {
      type: 'string',
      example: 'someone5588@gmail.com'
    },
    password: {
      type: 'string',
      example: 'L3L311235813'
    }

  }
}

export const signupResponseBodySchema = {
  type: 'object',
  required: ['username', 'password', 'email', 'verificationToken', 'status'],
  properties: {
    username: {
      type: 'string',
      example: 'Someone-cool96'
    },
    email: {
      type: 'string',
      example: 'someone5588@gmail.com'
    },
    password: {
      type: 'string',
      example: 'L3L311235813'
    },
    verificationToken: {
      type: 'string',
      description: 'JWT for this specific user'
    },
    status: {
      type: 'string',
      enum: [PENDING, VERIFIED],
      description: 'Email status'
    }

  }
}

export const loginRequestBodySchema = {
  type: 'object',
  required: ['username', 'password', 'email'],
  properties: {
    username: {
      type: 'string',
      example: 'Someone-cool96'
    },
    email: {
      type: 'string',
      example: 'someone5588@gmail.com'
    },
    password: {
      type: 'string',
      example: 'L3L311235813'
    }

  }
}
export const loginResponseBodySchema = {
  type: 'object',
  required: ['verificationToken'],
  properties: {
    verificationToken: {
      type: 'string',
      description: 'JWT for this specific user'
    }

  }
}
