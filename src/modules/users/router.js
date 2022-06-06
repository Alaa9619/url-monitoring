import { Router } from 'express'
import { validate } from '../../../middleware/schema-validation.js'
import { userController } from './controller.js'
import { userValidation } from './validation.js'

const router = Router()

router.post(
  '/sign-up',
  validate(userValidation.signUp),
  userController.signUp
)

router.post(
  '/verify-email',
  validate(userValidation.verifyEmail),
  userController.verifyEmail
)

router.post(
  '/login',
  validate(userValidation.login),
  userController.login
)
export default router
