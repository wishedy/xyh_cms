import { json2Query } from '@/utils'
const Resource = require('./create-api')
const { api } = Resource
export function handleRegister (params) {
  return api.post('/api/sysUser/sysRegister', JSON.stringify(params))
}
export function handleAdmin (params) {
  return api.post('/api/sysUser/check', params)
}
export function userLogin (params) {
  return api.get(`/api/sysUser/login?${json2Query(params)}`)
}
export function passwordReset (params) {
  return api.get(`/api/sysUser/passwordReset?${json2Query(params)}`)
}
export function getAdminList (params) {
  return api.get(`/api/sysUser/query?${json2Query(params)}`)
}
