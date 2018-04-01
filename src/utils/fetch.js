import axios from 'axios'
import { toastLoading, hideToast, toastInfo } from './toast'

axios.interceptors.request.use((data) => {
  // do something before request
  toastLoading()
  return data
})

axios.interceptors.response.use((res) => {
  // do something after response
  hideToast()
  const { code } = res.data
  const match = code.toString().match('40')
  if (code === 4006) {
    window.location.href = '/#/login'
  }
  if (code === 4007) {
    window.location.href = `/#/${res.data.data.role}Setting`
  }
  if (match) {
    toastInfo(res.data.msg)
    throw new Error(res.data.message)
  }
  return res.data
})

const fetch = (function () {
  const reqFunc = function (method = 'GET', url, data) {
    const reqParams = method === 'GET' ? { params: data } : { data }
    return axios({
      method,
      url,
      ...reqParams,
      timeout: 4000,
    }).catch((err) => {
      return Promise.reject(err)
    })
  }
  return {
    get(url, data) {
      return reqFunc('GET', url, data)
    },
    post(url, data) {
      return reqFunc('POST', url, data)
    }
  }
}())

export default fetch
