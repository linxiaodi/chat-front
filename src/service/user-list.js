import fetch from '../utils/fetch'
import api from '../utils/api'

class UserList {
  static getList(params) {
    return fetch.get(api.getList, params)
  }
}

export default UserList
