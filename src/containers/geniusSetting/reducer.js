import { FILL_INFO_SUCCESS, FILL_INFO_FAIL } from './actionTypes'

const initState = {
  avatar: '',
  nickname: '',
  selfDescription: '',
  jobDescription: '',
  salary: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case FILL_INFO_SUCCESS:
      return { ...state, ...action.payload }
    case FILL_INFO_FAIL:
      return { ...state, msg: action.payload.msg }
    default:
      return state
  }
}
