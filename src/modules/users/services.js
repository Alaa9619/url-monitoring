import { sendVerificationEmail } from '../../../mics/verification-services/email-verification.js'
import { generateJWT } from './helpers.js'
import { Users } from './models/index.js'
import bcrypt from 'bcrypt'
import APIError from '../../../common/api-errors.js'
import httpStatus from 'http-status'
import { PENDING, VERIFIED } from './models/constants.js'
import _ from 'lodash'

const { hashSync } = bcrypt
const { NOT_FOUND, UNAUTHORIZED, FORBIDDEN } = httpStatus

export const userServices = {
  /**
     * Sign-Up for certain user
     *
     * @param {Object} args
     * @param {String} args.username
     * @param {String} args.email
     *
     * @returns {Promise<String>} userToken
     */
  signUp: async ({ username, email, password }) => {
    const token = await generateJWT({ payload: { username, email } })
    const user = new Users({
      username,
      password: hashSync(password, 8),
      email,
      verificationToken: token
    })

    await user.save()
    await sendVerificationEmail({ to: email, verificationToken: token })

    return { user }
  },

  /**
 * Email verification for certain user
 *
 * @param {Object} args
 * @param {String} args.verificationToken
 *
 * @returns {Promise}
 */
  verifyEmail: async ({ verificationToken }) => {
    const tokenExists = await Users.exists({ verificationToken })
    if (!tokenExists) {
      throw new APIError({ status: NOT_FOUND, message: 'This user doesn\'t exist you may sign up' })
    }

    await Users.updateOne({ verificationToken }, { status: VERIFIED })
  },

  /**
     *Login  user with username or email
     *
     * @param {Object} args
     * @param {String} args.username
     * @param {String} args.email
     *
     * @returns {Promise<String>} userToken
     */
  login: async ({ username, email, password }) => {
    const queryMatcher = {}
    if (!_.isNil(username)) {
      queryMatcher.username = username
    }

    if (!_.isNil(email)) {
      queryMatcher.email = email
    }

    const user = await Users.findOne(queryMatcher).lean()

    if (_.isNil(user)) {
      throw new APIError({ status: NOT_FOUND, message: 'No such user with this username or email.' })
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
      throw new APIError({ status: FORBIDDEN, message: 'Wrong password' })
    }

    if (user.status === PENDING) {
      throw new APIError({ status: UNAUTHORIZED, message: 'Please go back to your email and verify your email.' })
    }

    return user.verificationToken
  }

}
