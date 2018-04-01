import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const ListItem = (props) => {
  const {
    nickname,
    avatar,
    lastMsg,
    unread,
    _id,
  } = props.data
  const historyGo = () => { props.history.push(`/chat/${_id}`) }
  const cs = unread > 0 ? 'contact-item active' : 'contact-item'
  return (
    <List.Item onClick={historyGo}>
      <div className={cs}>
        <img className="contact-item__avatar" src={avatar} alt=""/>
        <div className="contact-item__brief">
          <p className="contact-item__brief__nickname">{nickname}</p>
          <p className="contact-item__brief__msg">{lastMsg}</p>
        </div>
        <p className="contact-item__extra">{unread}</p>
      </div>
    </List.Item>
  )
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(ListItem)
