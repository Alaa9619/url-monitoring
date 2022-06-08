import { Router } from 'express'
import UserRouter from './modules/users/router.js'
import urlChecksRouter from './modules/url-checks/router.js'

const router = new Router()

router.use('/users', UserRouter)
router.use('/url-checks', urlChecksRouter)

export default router
