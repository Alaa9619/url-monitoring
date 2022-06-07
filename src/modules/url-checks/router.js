
import { Router } from 'express'
import { authenticate } from '../../../middleware/authenticate.js'
import { validate } from '../../../middleware/schema-validation.js'
import { urlChecksController } from './controller.js'
import { urlChecksValidation } from './validation.js'

const router = Router()

router.post(
  '/',
  authenticate,
  validate(urlChecksValidation.createUrlChecksInstance),
  urlChecksController.createUrlChecksInstance
)

export default router
