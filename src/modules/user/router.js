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

export default router
