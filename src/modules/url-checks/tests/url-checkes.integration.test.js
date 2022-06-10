import mongoose from 'mongoose'
import { createFakeAuthenticatedUser } from '../../fakers/user.js'
import request from 'supertest'
import { CREATED, NOT_FOUND, NO_CONTENT, OK, UNAUTHORIZED } from 'http-status'
import app from '../../../app.js'
import { HTTPS_PROTOCOL, HTTP_PROTOCOL } from '../constants.js'
import { createFakeUrlChecksInstance } from '../../fakers/url-checks.js'

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

  // TODO add function to validate the schema
  describe('POST /url-checks/', () => {
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

  describe('GET /url-checks/:id', () => {
    test('It gets url checks successfully', async () => {
      const urlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id })

      const res = await request(app)
        .get(`/url-checks/${urlCheckInstance._id}`)
        .set('Authorization', `JWT ${user.verificationToken}`)

      expect(res.status).toBe(OK)
    })

    test('It fails to get url checks as the id is not found', async () => {
      const res = await request(app)
        .get(`/url-checks/${mongoose.Types.ObjectId()}`)
        .set('Authorization', `JWT ${user.verificationToken}`)

      expect(res.status).toBe(NOT_FOUND)
    })

    test('It fails if the user does not own this url', async () => {
      const anotherUser = await createFakeAuthenticatedUser({ email: 'anotherCoolMan987@gmail.com' })

      const urlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id })

      const res = await request(app)
        .get(`/url-checks/${urlCheckInstance._id}`)
        .set('Authorization', `JWT ${anotherUser.verificationToken}`)

      expect(res.status).toBe(UNAUTHORIZED)
    })
  })

  describe('DELETE /url-checks/:id', () => {
    test('It deletes url checks successfully', async () => {
      const urlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id })

      const res = await request(app)
        .delete(`/url-checks/${urlCheckInstance._id}`)
        .set('Authorization', `JWT ${user.verificationToken}`)

      expect(res.status).toBe(NO_CONTENT)
    })

    test('It fails to delete url checks as the id is not found', async () => {
      const res = await request(app)
        .get(`/url-checks/${mongoose.Types.ObjectId()}`)
        .set('Authorization', `JWT ${user.verificationToken}`)

      expect(res.status).toBe(NOT_FOUND)
    })

    test('It fails if the user does not own this url', async () => {
      const anotherUser = await createFakeAuthenticatedUser({ email: 'anotherCoolMan7@gmail.com' })

      const urlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id })

      const res = await request(app)
        .get(`/url-checks/${urlCheckInstance._id}`)
        .set('Authorization', `JWT ${anotherUser.verificationToken}`)

      expect(res.status).toBe(UNAUTHORIZED)
    })
  })

  describe('GET /url-checks/', () => {
    test('It gets a bulk of urls checks successfully', async () => {
      const tags = ['science', 'fiction']
      const firstUrlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id, tags })
      const secondUrlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id, tags })
      console.log(firstUrlCheckInstance)
      console.log(secondUrlCheckInstance)
      const res = await request(app)
        .get('/url-checks/')
        .query({ tags })
        .set('Authorization', `JWT ${user.verificationToken}`)

      expect(res.status).toBe(OK)
      expect(res.body.length).toBe(2)
    })
  })

  describe('PUT /url-checks/:id', () => {
    test('It updates url check successfully', async () => {
      const urlCheckInstance = await createFakeUrlChecksInstance({ userId: user._id })

      const newBody = {
        name: 'google',
        url: 'https://www.Google.com',
        protocol: HTTP_PROTOCOL,
        path: '/find',
        port: 3000,
        webhook: 'https://www.google.com',
        timeout: 7,
        interval: 8,
        threshold: 1,
        assert: { statusCode: 201 },
        httpHeaders: [{
          Expires: 'Wed, 21 Oct 2015 07:28:00 GMT',
          'content-type': 'application/json+protobuf'
        }],
        tags: ['science'],
        ignoreSSL: false
      }
      const res = await request(app)
        .patch(`/url-checks/${urlCheckInstance._id}`)
        .set('Authorization', `JWT ${user.verificationToken}`)
        .send(newBody)

      expect(res.status).toBe(OK)
    })
  })
})
