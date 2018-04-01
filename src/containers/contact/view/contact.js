import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'

import ListItem from './list-item'

/*
* @return {lastMsg: String, unread: Number}
* */

function getLastMsg(array, _id) {
  const lastMsg = array[array.length - 1].content
  const lastTargetMsg = array.filter(item => item.to === _id)
  const unread = lastTargetMsg.reduce((accumulator, item) => {
    return accumulator + item.unread
  }, 0)
  return { lastMsg, unread }
}

const mapStateToProps = state => ({
  user: state.user,
  contactList: state.contactList,
  chat: state.chat,
  discoveryList: state.discoveryList
})

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.props.getList()
  }

  render() {
    // 计算值
    const { discoveryList, user } = this.props
    const chatDetails = this.props.chat.chatDetails.filter(v => v.chatid.indexOf('robot') < 0)
    const classifyMsg = {}
    chatDetails.forEach((el) => {
      const { chatid } = el
      if (classifyMsg[chatid]) {
        classifyMsg[chatid].push(el)
      } else {
        classifyMsg[chatid] = [el]
      }
    })

    const contactList = Object.keys(classifyMsg).map((key) => {
      let targetId
      key.split('_').forEach((id) => {
        if (id !== user._id) targetId = id
      })
      const el = discoveryList.find(e => e._id === targetId)
      const lastMsg = getLastMsg(classifyMsg[key], user._id)
      return {
        ...el,
        ...lastMsg
      }
    })
    contactList.unshift({
      avatar: 'http://oph3rwqhn.bkt.clouddn.com/18-3-24/56207657.jpg',
      lastMsg: '想聊什么随便来',
      nickname: '机器人',
      unread: 0,
      _id: 'robot',
    })
    return (
      <div className="contact">
        <List>
          {
            contactList.map((e) => {
              return <ListItem key={e._id} data={e}/>
            })
          }
        </List>
      </div>
    )
  }
}

Contact.propTypes = {
  user: PropTypes.object.isRequired,
  discoveryList: PropTypes.array.isRequired,
  chat: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Contact)
