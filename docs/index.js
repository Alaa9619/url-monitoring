import { urlChecksDocs } from './url-checks/index.js'
import { usersDocs } from './user/index.js'

export const modulesDocs = {

  ...usersDocs,
  ...urlChecksDocs

}
