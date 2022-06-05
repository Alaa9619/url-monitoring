import { Router } from 'express'
import UserRouter from './modules/user/router.js'

const router = new Router()

router.use('/users', UserRouter)

export default router
