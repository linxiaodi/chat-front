import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'

const ChatHeader = ({ title, history }) => {
  const historyBack = () => { history.goBack() }
  return (
    <div className="chat-nav-bar">
      <NavBar
        icon={<Icon type="left"/>}
        onClick={historyBack}
      >
        {title}
      </NavBar>
    </div>
  )
}

ChatHeader.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(ChatHeader)
