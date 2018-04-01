import fetch from '../utils/fetch'
import api from '../utils/api'

class Contact {
  static getContactList() {
    return fetch.get(api.getContactList).then((res) => {
      return res.data
    })
  }
}

export default Contact
