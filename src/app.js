// Run the startup function
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import httpStatus from 'http-status'
import { swaggerDocument } from '../docs/config.js'
import appRouter from './router.js'
import { errorHandler } from '../middleware/error-handler.js'

const { NOT_FOUND } = httpStatus

dotenv.config()

const app = express()

app.use(express.json())

app.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(appRouter)

app.use(errorHandler)

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` })
})

export default app
