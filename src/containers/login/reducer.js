import { LOGIN_SUCCESS, LOGIN_FAIL, FILL_INFO } from './actionTypes'

const initState = {
  role: 'boss',
  username: '',
  isFillInfo: false, // 是否填写了基本信息
  msg: '',
  hasAuth: false // 是否登录
}

export default function (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        isFillInfo: action.payload.isFillInfo,
        hasAuth: true
      }
    case LOGIN_FAIL:
      return { ...state, ...{ msg: action.payload.msg }, isFillInfo: false }
    case FILL_INFO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
