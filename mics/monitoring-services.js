import { HTTP_PROTOCOL } from '../src/modules/url-checks/constants.js'
import http from 'http'

export const monitorUrl = async ({
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
  assert: { statusCode },
  ignoreSSL
}) => {
  let status
  let previousStatus
  let downCounter = 0
  let timer

  const options = {
    host: url,
    path,
    port,
    method: 'GET',
    headers: { ...httpHeaders },
    timeout
  }
  const callback = (res, error) => {
    if (res.status === statusCode) {
      status = statusCode
    } else {
      downCounter += 1
    }

    if (status !== previousStatus) {
      console.log('send mail')
      previousStatus = status
    }
    if (downCounter === threshold) {
      clearInterval(timer)
      console.log('send mail')
    }
  }
  if (protocol === HTTP_PROTOCOL) {
    timer = setInterval(() => {
      http.request(options, callback)
    }, interval)
  }
}
