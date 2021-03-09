import { json2Query } from '@/utils'
const Resource = require('./create-api')
const { api } = Resource
export const getOrderList = (params) => {
  console.log(params)
  const query = params ? `?${json2Query(params)}` : ''

  return api.get(`/api/order/getOrderList${query}`)
}
