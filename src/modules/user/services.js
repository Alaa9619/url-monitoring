import { sendVerificationEmail } from '../../../mics/verification-services/email-verification.js'
import { generateJWT } from './helpers.js'
import { Users } from './model/index.js'
import bcrypt from 'bcrypt'

const { hashSync } = bcrypt

export const userServices = {

  signUp: async ({ username, email, password }) => {
    const token = await generateJWT({ payload: { username, email } })
    const user = new Users({
      username,
      password: hashSync(password, 8),
      email,
      verificationCode: token
    })

    await user.save()
    await sendVerificationEmail({ to: email, verificationToken: token })
  }

}
