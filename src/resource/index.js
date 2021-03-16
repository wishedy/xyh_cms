import { json2Query } from '@/utils'
const Resource = require('./create-api')
const { api } = Resource
export function handleRegister (params) {
  return api.post('/api/sysUser/sysRegister', JSON.stringify(params))
}
export function handleAdmin (params) {
  return api.post('/api/sysUser/check', params)
}
export function updatePass (params) {
  return api.post('/api/sysUser/updatePass', params)
}
export function createDemand (params) {
  return api.post('/api/needType/add', params)
}
export function updateDemand (params) {
  return api.post('/api/needType/update', params)
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
export function setManager (params) {
  return api.get(`/api/sysUser/setManager?${json2Query(params)}`)
}
export function getDemandList (params) {
  return api.get(`/api/needType/query?${json2Query(params)}`)
}
