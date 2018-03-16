import { LOGIN_SUCCESS, LOGIN_FAIL, FILL_INFO } from './actionTypes'
import User from '../../service/user'

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

function login(data) {
  return (dispatch) => {
    return User.login(data).then((res) => {
      dispatch(loginSuccess(res))
    }).catch((error) => {
      dispatch(loginFail(error))
    })
  }
}

export {
  login,
  loginSuccess,
  loginFail,
  fillInfo
}
