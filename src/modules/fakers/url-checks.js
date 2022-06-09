import { HTTPS_PROTOCOL } from '../url-checks/constants'
import { urlChecks } from '../url-checks/models'

// TODO add function docs and add fake generators instead of magic words
export const createFakeUrlChecksInstance = async ({
  userId,
  url = 'https://www.Netflix.com',
  name = 'Netflix',
  protocol = HTTPS_PROTOCOL,
  path = '/watch',
  port = 3000,
  webhook = 'https://www.netflix.com',
  assert = { statusCode: 201 },
  timeout = 10,
  interval = 7,
  threshold = 7,
  authentication,
  httpHeaders = [{
    Expires: 'Wed, 21 Oct 2015 07:28:00 GMT',
    'content-type': 'application/json+protobuf'
  }],
  tags = ['educational', 'entertainment'],
  ignoreSSL = true
}) => {
  const urlCheckInstance = await urlChecks.create({
    userId,
    name,
    url,
    protocol,
    path,
    port,
    webhook,
    timeout,
    interval,
    threshold,
    assert,
    httpHeaders,
    authentication,
    tags,
    ignoreSSL
  })
  return urlCheckInstance
}
