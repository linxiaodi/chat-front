import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputBox from './input-box'
import ChatHeader from './header'
import createChatid from './chatid.create'
import { actions as userActions } from '../../login/'
import { recvMsg, getMsgList, sendMsg, markRead } from '../actions'
import init from '../../../utils/init'
import { actions as discoveryActions } from '../../discovery/'
import MsgBox from './msg-box'

const mapStateToProps = state => ({
  user: state.user,
  chat: state.chat,
  discoveryList: state.discoveryList
})

const mapDispatchToProps = dispatch => ({
  recvMsg() {
    dispatch(recvMsg())
  },
  getMsgList() {
    dispatch(getMsgList())
  },
  sendMsg(data) {
    dispatch(sendMsg(data))
  },
  initUser() {
    return dispatch(userActions.initUser())
  },
  initDiscoveryList() {
    dispatch(discoveryActions.getList())
  },
  markRead(targetId) {
    dispatch(markRead(targetId))
  }
})

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      list: [],
      target: this.props.match.params.target,
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    // init
    const {
      recvMsg,
      initUser,
      chat,
      getMsgList,
      user,
      discoveryList,
      initDiscoveryList
    } = this.props
    init(recvMsg, initUser, chat.chatDetails, getMsgList, user)
    window.scrollTo(0, this.box.offsetHeight)
    if (discoveryList.length < 1) {
      initDiscoveryList()
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, this.box.offsetHeight)
  }

  componentWillUnmount() {
    this.props.markRead(this.state.target)
  }

  submit(text) {
    const { target } = this.state
    const { _id } = this.props.user
    const send = {
      from: _id,
      to: target,
      content: text
    }
    this.props.sendMsg(send)
  }

  render() {
    const { discoveryList, user } = this.props
    const { _id } = user
    const { target } = this.state
    const chatid = createChatid(_id, target)
    const list = this.props.chat.chatDetails.filter(e => e.chatid === chatid)
    let userInfo = discoveryList.find(e => e._id === target) || {}
    if (target === 'robot') {
      userInfo = { avatar: 'http://oph3rwqhn.bkt.clouddn.com/18-3-24/56207657.jpg', nickname: '机器人' }
    }

    return (
      <div ref={box => this.box = box} className="chat-box">
        <ChatHeader title={userInfo.nickname || '我想静静'}/>
        {
          list.map((el) => {
            const { createAt } = el
            return (
              <MsgBox
                key={createAt}
                userInfo={el.from === _id ? user : userInfo}
                cs={el.from === _id ? 'local' : 'other'}
                msgItem={el}
              />
            )
          })
        }
        <InputBox doSubmit={this.submit} state={this.state} onChangeText={this.onChangeText}/>
      </div>
    )
  }
}

Chat.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  getMsgList: PropTypes.func.isRequired,
  recvMsg: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
  initUser: PropTypes.func.isRequired,
  discoveryList: PropTypes.array.isRequired,
  initDiscoveryList: PropTypes.func.isRequired,
  markRead: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
