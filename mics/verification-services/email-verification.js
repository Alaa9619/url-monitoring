import { sendEmail } from '../helpers.js'

/**
 * Sends a verification email
 *
 * @param {Object} args
 * @param {String} args.to the email of the recipient
 * @param {String} args.verificationToken the verificationToken of the recipient
 * @returns {Promise}
 */
export const sendVerificationEmail = async ({
  to,
  verificationToken
}) => {
  await sendEmail({
    from: process.env.ADMIN_EMAIL,
    to,
    subject: 'Email verification',
    password: process.env.ADMIN_PASSWORD,
    html: `
    <p>Please verify your email by clicking on the following link</p>
    <a href=http://${process.env.APP_NAME}/email-verifiction/${verificationToken}> Click here</a>
    </div>`
  })
}
