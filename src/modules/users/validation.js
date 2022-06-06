import Joi from 'joi'

export const userValidation = {
  signUp: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },

  verifyEmail: {
    query: {
      verificationToken: Joi.string().required()
    }
  },

  login: {
    body: Joi.object({
      password: Joi.string().required(),
      email: Joi.string(),
      username: Joi.string()
    }).or('email', 'username').required()
  }

}
