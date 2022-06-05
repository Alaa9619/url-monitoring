import nodemailer from 'nodemailer'
import { GMAIL_EMAILING_SERVICES } from './constants.js'

/**
 * Sends email
 *
 * @param {Object} args
 * @param {String} args.html the html that contain the body of the email sent to the user
 * @param {String} args.from the email of the sender
 * @param {String} args.to the email of the recipient
 * @param {String} args.password the password of the sender
 * @param {String} args.subject the subject of email
 * @returns {Promise}
 */
export const sendEmail = async ({
  html,
  from,
  to,
  subject
}) => {
  const transport = nodemailer.createTransport({
    service: GMAIL_EMAILING_SERVICES,
    name: process.env.APP_NAME,
    port: process.env.PORT,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD
    }

  })
  const mailOptions = {
    from,
    to,
    subject,
    html
  }
  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
  }
}
