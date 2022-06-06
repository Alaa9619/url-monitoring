import { modulesDocs } from './index.js'
import { tags } from './tags.js'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Url monitoring Api endpoints Documentation'
  },
  host: 'localhost:3000',
  basePath: '/',
  tags,
  paths: modulesDocs,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
}
