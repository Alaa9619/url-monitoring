import { NOT_FOUND, UNAUTHORIZED } from 'http-status'
import _ from 'lodash'
import APIError from '../../../common/api-errors.js'
import { urlChecks } from './models/index.js'

export const urlChecksServices = {
  createUrlChecksInstance: async ({
    name,
    url,
    path,
    threshold = 1,
    protocol,
    timeout = 5,
    interval = 10,
    port,
    authentication: { username, password } = {},
    httpHeaders = [],
    webhook,
    assert: { statusCode },
    tags = [],
    ignoreSSL
  }, { userId }) => {
    // non optional and have a default value
    const urlChecksInstanceCreationQuery = {
      userId,
      name,
      url,
      protocol,
      ignoreSSL,
      timeout,
      interval,
      threshold
    }
    // arrays
    if (!_.isEmpty(tags)) { urlChecksInstanceCreationQuery.tags = tags }
    if (!_.isEmpty(httpHeaders)) { urlChecksInstanceCreationQuery.httpHeaders = httpHeaders }

    // optional values
    if (!_.isNil(path)) { urlChecksInstanceCreationQuery.path = path }
    if (!_.isNil(port)) { urlChecksInstanceCreationQuery.path = port }
    if (!_.isNil(webhook)) { urlChecksInstanceCreationQuery.webhook = webhook }
    if (!_.isNil(username)) { urlChecksInstanceCreationQuery.authentication.username = username }
    if (!_.isNil(password)) { urlChecksInstanceCreationQuery.authentication.password = password }
    if (!_.isNil(statusCode)) { urlChecksInstanceCreationQuery.statusCode = statusCode }

    const urlChecksInstance = await urlChecks.create(urlChecksInstanceCreationQuery)
    return urlChecksInstance
  },

  getUrlChecksInstance: async ({ urlChecksInstanceId }, { userId }) => {
    const urlCheckInstance = await urlChecks.findOne({ _id: urlChecksInstanceId }).lean()

    if (_.isNil(urlCheckInstance)) {
      throw new APIError({ status: NOT_FOUND, message: 'No url checks with this id' })
    }

    if (String(userId) !== String(urlCheckInstance.userId)) {
      throw new APIError({ status: UNAUTHORIZED, message: 'The user is not authorized to access this url checks instance' })
    }

    return urlCheckInstance
  },

  // if tags are empty it will return all the allowed urls checks to this user

  getBulkUrlsChecks: async ({ tags }, { userId }) => {
    const queryMatcher = { userId }

    if (tags.length !== 0) { queryMatcher.tags = tags }

    const urlChecksBulk = await urlChecks.find(queryMatcher).lean()

    return urlChecksBulk
  },

  deleteUrlChecksInstance: async ({ urlChecksInstanceId }, { userId }) => {
    const urlCheckInstance = await urlChecks.findOne({ _id: urlChecksInstanceId }).lean()
    if (_.isNil(urlCheckInstance)) {
      throw new APIError({ status: NOT_FOUND, message: 'No url checks with this id' })
    }

    if (String(userId) !== String(urlCheckInstance.userId)) {
      throw new APIError({ status: UNAUTHORIZED, message: 'The user is not authorized to access this url checks instance' })
    }

    await urlChecks.deleteOne({ _id: urlChecksInstanceId })
  },

  updateUrlChecksInstance: async ({
    urlChecksInstanceId,
    name,
    url,
    path,
    threshold,
    protocol,
    timeout,
    interval,
    port,
    authentication: { username, password },
    httpHeaders,
    webhook,
    assert: { statusCode },
    tags,
    ignoreSSL
  }, { userId }) => {
    const urlCheckInstance = await urlChecks.findOne({ _id: urlChecksInstanceId }).lean()
    if (_.isNil(urlCheckInstance)) {
      throw new APIError({ status: NOT_FOUND, message: 'No url checks with this id' })
    }

    if (String(userId) !== String(urlCheckInstance.userId)) {
      throw new APIError({ status: UNAUTHORIZED, message: 'The user is not authorized to access this url checks instance' })
    }

    if (!_.isEmpty(tags)) { urlCheckInstance.tags = tags }
    if (!_.isEmpty(httpHeaders)) { urlCheckInstance.httpHeaders = httpHeaders }

    if (!_.isNil(path)) { urlCheckInstance.path = path }
    if (!_.isNil(port)) { urlCheckInstance.path = port }
    if (!_.isNil(webhook)) { urlCheckInstance.webhook = webhook }
    if (!_.isNil(username)) { urlCheckInstance.authentication.username = username }
    if (!_.isNil(password)) { urlCheckInstance.authentication.password = password }
    if (!_.isNil(statusCode)) { urlCheckInstance.statusCode = statusCode }
    if (!_.isNil(name)) { urlCheckInstance.name = name }
    if (!_.isNil(url)) { urlCheckInstance.url = url }
    if (!_.isNil(threshold)) { urlCheckInstance.threshold = threshold }
    if (!_.isNil(protocol)) { urlCheckInstance.protocol = protocol }
    if (!_.isNil(timeout)) { urlCheckInstance.timeout = timeout }
    if (!_.isNil(interval)) { urlCheckInstance.interval = interval }
    if (!_.isNil(ignoreSSL)) { urlCheckInstance.ignoreSSL = ignoreSSL }

    urlCheckInstance.save()
    return urlCheckInstance
  }
}
