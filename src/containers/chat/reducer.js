import { SET_MSG_LIST, MSG_RECV, OPEN_SOCKET, MSG_READ } from './actionTypes'
import { getItem } from '../../utils/robotDatabase'

const initState = {
  unRead: 0,
  chatDetails: getItem(),
  socketStatus: -1
}

// function markRead(chatDetails, payload) {
//   return chatDetails.map((item) => {
//   })
// }

export default (state = initState, action) => {
  switch (action.type) {
    case MSG_RECV: {
      const n = action.payload.to === action.userId ? action.payload.unread : 0
      return {
        ...state,
        chatDetails: [...state.chatDetails, action.payload],
        unRead: state.unRead + n
      }
    }
    case SET_MSG_LIST: {
      const unReadArr = action.payload.filter(e => e.unread > 0 && e.to === action.userId)
      return {
        ...state,
        chatDetails: [...state.chatDetails, ...action.payload],
        unRead: unReadArr.length
      }
    }
    case OPEN_SOCKET:
      return { ...state, socketStatus: 1 }
    case MSG_READ: {
      const { nModified, from } = action.payload
      return {
        ...state,
        unRead: state.unRead - nModified,
        chatDetails: state.chatDetails.map((e) => {
          return e.from === from ? { ...e, unread: 0 } : e
        })
      }
    }
    default:
      return state
  }
}
