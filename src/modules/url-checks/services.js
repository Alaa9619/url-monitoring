import _ from 'lodash'
import mongoose from 'mongoose'
import { urlChecks } from './models'

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
    assert: { statusCode } = {},
    tags = [],
    ignoreSSL
  }, { userId }) => {
    // non optional and have a default value
    const urlChecksInstanceCreationQuery = {
      userId,
      _id: new mongoose.Types.ObjectId(),
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
    if (!_.isNil(statusCode)) { urlChecksInstanceCreationQuery.authentication.statusCode = statusCode }

    const urlChecksInstance = await urlChecks.create(urlChecksInstanceCreationQuery)
    return urlChecksInstance
  }
}
