import axios from 'axios'
export function getAxios (settings, timeout = 10000) {
  console.log(settings)
  const ins = axios.create(settings)
  axios.defaults.timeout = timeout
  setInterceptors(ins)
  return ins
}

function setInterceptors (axiosIns) {
  axiosIns.interceptors.request.use(req => {
    // console.log(req, 'req')
    console.time(req.method.toUpperCase() + ' ' + req.url)
    return req
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })
  axiosIns.interceptors.response.use(res => {
    console.log('------')
    console.log(res)
    res.data.code = parseInt(res.data.code, 10)
    console.timeEnd(res.config.method.toUpperCase() + ' ' + res.config.url)
    if (res.status >= 200 && res.status < 300 && (!res.data.code || res.data.code === 200)) {
      return res.data.data || res.data
    }
    return Promise.reject(res.data)
  }, error => {
    const errorData = error.data || (error.response && error.response.data) || {
      code: 5001,
      message: '网络错误'
    }
    return Promise.reject(errorData)
  })
}
