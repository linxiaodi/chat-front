import { SET_CONTACT_LIST } from './actionTypes'

const setContactList = (data) => {
  return {
    type: SET_CONTACT_LIST,
    payload: data
  }
}

export {
  setContactList,
}

