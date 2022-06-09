
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

router.get(
  '/:id',
  authenticate,
  validate(urlChecksValidation.getUrlChecksInstance),
  urlChecksController.getUrlChecksInstance
)

router.get(
  '/',
  authenticate,
  validate(urlChecksValidation.getBulkUrlsChecks),
  urlChecksController.getBulkUrlsChecks
)

router.delete(
  '/:id',
  authenticate,
  validate(urlChecksValidation.deleteUrlChecksInstance),
  urlChecksController.deleteUrlChecksInstance
)

export default router
