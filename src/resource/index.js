// import { json2Query } from '@/utils'
const Resource = require('./create-api')
const { api } = Resource
export function handleRegister (params) {
  return api.post('/api/sysUser/sysRegister', JSON.stringify(params))
}
