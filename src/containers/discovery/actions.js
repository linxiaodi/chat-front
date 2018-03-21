import { GET_LIST_SUCCESS } from './actionTypes'
import UserList from '../../service/user-list'

const getListSuccess = data => ({
  type: GET_LIST_SUCCESS,
  payload: data
})

const getList = () => {
  return (dispatch) => {
    return UserList.getList().then((res) => {
      if (res.code === 2000) dispatch(getListSuccess(res.data))
    })
  }
}

export {
  getListSuccess,
  getList
}
