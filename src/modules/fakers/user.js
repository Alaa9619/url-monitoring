import { hashSync } from 'bcrypt'
import { generateJWT } from '../users/helpers.js'
import { VERIFIED } from '../users/models/constants.js'
import { Users } from '../users/models/index.js'

export const createFakeAuthenticatedUser = async ({
  username = 'cool-man',
  password = 'coolMan5588123',
  email
}) => {
  const token = await generateJWT({ payload: { username, email } })
  const user = new Users({
    username,
    password: hashSync(password, 8),
    email,
    verificationToken: token,
    status: VERIFIED
  })
  await user.save()
  return user
}
