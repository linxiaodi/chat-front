import { SET_CONTACT_LIST } from './actionTypes'

const initState = [
  {
    nickname: '机器人',
    _id: 'robot',
    avatar: 'http://oph3rwqhn.bkt.clouddn.com/18-3-24/56207657.jpg',
    unread: 0,
    lastMsg: '想聊什么随便来'
  }
]

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CONTACT_LIST:
      return [...initState, ...action.payload]
    default:
      return state
  }
}
