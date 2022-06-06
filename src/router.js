import { Router } from 'express'
import UserRouter from './modules/users/router.js'

const router = new Router()

router.use('/users', UserRouter)

export default router
