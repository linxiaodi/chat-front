import React from 'react'
import { List } from 'antd-mobile'
import PropTypes from 'prop-types'

const ExtractInfo = (props) => {
  const { role } = props.user
  const {
    job,
    salary,
    jobDescription,
    selfDescription
  } = props.userInfo
  const title = role === 'boss' ? '招聘信息' : '个人简介'

  return (
    <List renderHeader={title}>
      <List.Item multipleLine>
        {job}
        <p style={{ fontSize: '.9em' }} className="noMargin">{salary}</p>
        <List.Item.Brief>
          <pre className="noMargin">
            {selfDescription || jobDescription}
          </pre>
        </List.Item.Brief>
      </List.Item>
    </List>
  )
}

ExtractInfo.propTypes = {
  user: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
}

export default ExtractInfo
