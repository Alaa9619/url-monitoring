import mongoose from 'mongoose'
import { createFakeAuthenticatedUser } from '../../fakers/user-fakers.js'
import request from 'supertest'
import { CREATED } from 'http-status'
import app from '../../../app.js'
import { HTTPS_PROTOCOL } from '../constants.js'

describe('[INTEGRATION] Url Checks Endpoints', () => {
  let user
  let connection

  beforeAll(async () => {
    const MONGO_TEST_URI = process.env.MONGO_TEST_URL
    connection = await mongoose.connect(MONGO_TEST_URI, {
      useNewUrlParser: true
    }).catch(err => console.log(err.reason))

    user = await createFakeAuthenticatedUser({ email: 'alaaKhalwe49342@gmail.com' })
  })

  afterAll(async () => {
    // TODO make a tear down file and drop the testing data base in it
    await connection.connection.dropCollection('users')
    await mongoose.disconnect()
  })

  describe('POST /url-checks', () => {
    test('It creates url check successfully', async () => {
      const createUrlChecksInstanceBody =
      {
        name: 'Netflix',
        url: 'https://www.Netflix.com',
        protocol: HTTPS_PROTOCOL,
        path: '/watch',
        port: 3000,
        webhook: 'https://www.goole.com',
        timeout: 6,
        interval: 7,
        threshold: 2,
        assert: { statusCode: 201 },
        httpHeaders: [{
          Expires: 'Wed, 21 Oct 2015 07:28:00 GMT',
          'content-type': 'application/json+protobuf'
        }],
        tags: ['educational', 'entertainment'],
        ignoreSSL: true
      }

      const res = await request(app)
        .post('/url-checks/')
        .set('Authorization', `JWT ${user.verificationToken}`)
        .send(createUrlChecksInstanceBody)

      expect(res.status).toBe(CREATED)
    })
  })
})
