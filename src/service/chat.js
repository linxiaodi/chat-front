import fetch from '../utils/fetch'
import api from '../utils/api'

class Chat {
  static getList(query) {
    return fetch.get(api.getChatDetails, query)
  }
  static markRead(targetId) {
    return fetch.get(api.markRead, { from: targetId })
  }
}

export default Chat
