import { FILL_INFO_FAIL, FILL_INFO_SUCCESS } from './actionTypes'
import User from '../../service/user'
import { actions as userAction } from '../login/'

const setUserFillInfo = userAction.fillInfo

const fillSuccess = data => ({
  type: FILL_INFO_SUCCESS,
  payload: data
})

const fillFail = data => ({
  payload: data,
  type: FILL_INFO_FAIL
})

const fillInfo = (data) => {
  return (dispatch) => {
    return User.fillInfo(data).then((res) => {
      if (res.code === 2000) {
        dispatch(fillSuccess(data))
        dispatch(setUserFillInfo(res.data))
      } else {
        dispatch(fillFail(res))
      }
    })
  }
}

export {
  fillSuccess,
  fillFail,
  fillInfo
}
