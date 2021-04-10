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
export function createArticle (params) {
  return api.post('/api/article/add', params)
}
export function getArticleList (params) {
  return api.get(`/api/article/query?${json2Query(params)}`)
}
export function updateArticle (params) {
  return api.post('/api/article/update', params)
}
export function createVideo (params) {
  return api.post('/api/video/add', params)
}
export function getVideoList (params) {
  return api.get(`/api/video/query?${json2Query(params)}`)
}
export function updateVideo (params) {
  return api.post('/api/video/update', params)
}
export function createFeature (params) {
  return api.post('/api/feature/add', params)
}
export function getFeatureList (params) {
  return api.get(`/api/feature/query?${json2Query(params)}`)
}
export function updateFeature (params) {
  return api.post('/api/feature/update', params)
}
export function createGlobal (params) {
  return api.post('/api/globalCooper/add', params)
}
export function getGlobalList (params) {
  return api.get(`/api/globalCooper/query?${json2Query(params)}`)
}
export function updateGlobal (params) {
  return api.post('/api/globalCooper/update', params)
}
export function createBanner (params) {
  return api.post('/api/banner/add', params)
}
export function getBannerList (params) {
  return api.get(`/api/banner/query?${json2Query(params)}`)
}
export function updateBanner (params) {
  return api.post('/api/banner/update', params)
}
export function createMiniAppEntrance (params) {
  return api.post('/api/serverInlet/add', params)
}
export function getMiniAppEntranceList (params) {
  return api.get(`/api/serverInlet/query?${json2Query(params)}`)
}
export function updateMiniAppEntrance (params) {
  return api.post('/api/serverInlet/update', params)
}
export function createQr (params) {
  return api.post('/api/barcode/add', params)
}
export function getQrList (params) {
  return api.get(`/api/barcode/query?${json2Query(params)}`)
}
export function updateQr (params) {
  return api.post('/api/barcode/update', params)
}
export function createClassType (params) {
  return api.post('/api/courseType/add', params)
}
export function getClassTypeList (params) {
  return api.get(`/api/courseType/query?${json2Query(params)}`)
}
export function updateClassType (params) {
  return api.post('/api/courseType/update', params)
}
export function createClassResource (params) {
  return api.post('/api/course/add', params)
}
export function getClassResourceList (params) {
  return api.get(`/api/course/query?${json2Query(params)}`)
}
export function updateClassResource (params) {
  return api.post('/api/course/update', params)
}
export function getAboutList (params) {
  return api.get(`/api/companyProfile/selectByType?${json2Query(params)}`)
}
export function updateAbout (params) {
  return api.post('/api/companyProfile/update', params)
}
export function createProductType (params) {
  return api.post('/api/productType/add', params)
}
export function getProductTypeList (params) {
  return api.get(`/api/productType/query?${json2Query(params)}`)
}
export function updateProductType (params) {
  return api.post('/api/productType/update', params)
}
export function createProduct (params) {
  return api.post('/api/product/add', params)
}
export function getProductList (params) {
  return api.get(`/api/product/query?${json2Query(params)}`)
}
export function updateProduct (params) {
  return api.post('/api/product/update', params)
}
export function getUserDemandList (params) {
  return api.post('/api/userNeed/assignFollowUser', params)
}
