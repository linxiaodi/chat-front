import { LOGIN_SUCCESS, LOGIN_FAIL, FILL_INFO, RESET } from './actionTypes'

const initState = {
  role: 'boss',
  _id: '',
  msg: '',
  hasAuth: false // 是否登录
}

export default function (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        _id: action.payload._id.toString(),
        avatar: action.payload.avatar || 'http://oph3rwqhn.bkt.clouddn.com/18-3-26/88043022.jpg',
        nickname: action.payload.nickname,
        hasAuth: true
      }
    case LOGIN_FAIL:
      return { ...state, ...{ msg: action.payload.msg } }
    case FILL_INFO:
      return { ...state, ...action.payload }
    case RESET:
      return initState
    default:
      return state
  }
}
