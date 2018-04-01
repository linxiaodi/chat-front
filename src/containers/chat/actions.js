import socketIo from 'socket.io-client'
import { SET_MSG_LIST, MSG_RECV, OPEN_SOCKET, MSG_READ } from './actionTypes'
import Chat from '../../service/chat'
import { create as createRobotMsg, getItem } from '../../utils/robotDatabase'

const io = socketIo('http://193.112.55.132:8000')

const setMsgList = (data, userId) => {
  return {
    type: SET_MSG_LIST,
    payload: data,
    userId
  }
}

const openSocket = () => {
  return {
    type: OPEN_SOCKET
  }
}

const msgRecv = (data, userId) => {
  return {
    type: MSG_RECV,
    payload: data,
    userId
  }
}

const msgRead = (data) => {
  return {
    type: MSG_READ,
    payload: data
  }
}

// 发送
const sendMsg = ({ from, to, content }) => {
  return () => {
    return io.emit('sendMsg', { from, to, content })
  }
}

// 派发监听事件
const recvMsg = () => {
  return (dispatch, getState) => {
    const { user } = getState()
    const { _id } = user
    const { socketStatus } = getState().chat
    if (socketStatus > 0) return
    io.on('resvmsg', (data) => {
      if (data.chatid.indexOf(_id) > -1) {
        dispatch(msgRecv(data, _id))
        // 机器人存储在localStorage
        if (data.chatid.indexOf('robot') > -1) {
          createRobotMsg(data)
        }
      }
    })
    dispatch(openSocket())
  }
}

const getMsgList = (query) => {
  return (dispatch, getState) => {
    return Chat.getList(query).then((res) => {
      const userId = getState().user._id
      const len = getState().chat.chatDetails.length - getItem().length
      if (res.data.len !== len) {
        dispatch(setMsgList(res.data, userId))
      }
    })
  }
}

const markRead = (targetId) => {
  return (dispatch) => {
    return Chat.markRead(targetId).then((res) => {
      dispatch(msgRead({ ...res.data, from: targetId }))
    })
  }
}

export {
  getMsgList,
  setMsgList,
  sendMsg,
  msgRecv,
  recvMsg,
  msgRead,
  markRead
}
