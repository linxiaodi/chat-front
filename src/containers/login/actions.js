import { LOGIN_SUCCESS, LOGIN_FAIL, FILL_INFO, RESET } from './actionTypes'
import User from '../../service/user'
import { actions as infoActions } from '../geniusSetting/'

const { fillSuccess } = infoActions

function loginSuccess(result) {
  return {
    type: LOGIN_SUCCESS,
    payload: result
  }
}

function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    payload: error
  }
}

function fillInfo(data) {
  return {
    type: FILL_INFO,
    payload: {
      isFillInfo: data.isFillInfo
    }
  }
}

function reset() {
  return {
    type: RESET
  }
}

function login(data) {
  return (dispatch) => {
    return User.login(data).then((res) => {
      dispatch(loginSuccess(res))
      return res
    }).catch((error) => {
      dispatch(loginFail(error))
    })
  }
}

function initUser() {
  return (dispatch) => {
    return User.initUser().then((res) => {
      if (res.code === 2000) {
        dispatch(loginSuccess(res.data))
        dispatch(fillSuccess(res.data))
      }
    })
  }
}

function logout() {
  return (dispatch) => {
    return User.logout().then((res) => {
      if (res.code === 2000) {
        dispatch(reset())
        return res.data
      }
    })
  }
}

export {
  login,
  loginSuccess,
  loginFail,
  fillInfo,
  initUser,
  logout
}
