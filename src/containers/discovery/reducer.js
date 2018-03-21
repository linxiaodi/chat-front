import { GET_LIST_SUCCESS } from './actionTypes'

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return action.payload
    default:
      return state
  }
}
