import jwt from 'jsonwebtoken'

const JWT_EXPIRY_IN_SECONDS = '10h'

/**
 * Generate a JWT token
 *
 * @param {Object} args
 * @param {T} args.payload - the JWT payload to be encoded
 * @param {Number} [args.expiresIn = JWT_EXPIRY_IN_SECONDS]
 * @param {Object} args.options - jsonwebtoken module options, can override default options
 *
 * @returns {Promise<string>} theToken
 */
export const generateJWT = async ({
  payload,
  expiresIn = JWT_EXPIRY_IN_SECONDS,
  options = {}
}) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn, ...options })

/**
 * Generate a verification code with a given length
 *
 * @param {Number} length - length of the verification code
 *
 * @returns {Promise<string>} theToken
 */
export const generateVerificationCode = (length) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)]
  }
  return token
}
