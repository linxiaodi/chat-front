import React from 'react'
import PropTypes from 'prop-types'

const MsgBox = (props) => {
  const { content } = props.msgItem
  const { avatar } = props.userInfo
  return (
    <div className={`msg-box ${props.cs}`}>
      <img className="msg-box__avatar" src={avatar} alt=""/>
      <p className="msg-box__content">{content}</p>
    </div>
  )
}

MsgBox.propTypes = {
  msgItem: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  cs: PropTypes.string.isRequired,
}

export default MsgBox
