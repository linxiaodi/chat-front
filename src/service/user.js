// 登录，注册
import fetch from '../utils/fetch'
import api from '../utils/api'

class User {
  static register(data) {
    return fetch.post(api.register, data).then((res) => {
      return res
    })
  }

  static login(data) {
    return fetch.post(api.login, data).then((res) => {
      console.log(res.data)
      return res.data
    })
  }
  static fillInfo(data) {
    return fetch.post(api.fillInfo, data)
  }

  static initUser() {
    return fetch.get(api.initUser)
  }

  static logout() {
    return fetch.get(api.logout)
  }
}

export default User
