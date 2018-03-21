import React from 'react'
import { List, Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { actions } from '../../login/'

const { logout } = actions
const mapDispatchToProps = (dispatch) => {
  return () => ({
    logout() {
      return dispatch(logout())
    }
  })
}

const ModalAlert = Modal.alert

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.doLogout = this.doLogout.bind(this)
  }

  doLogout() {
    ModalAlert('退出登录？', '小主，要三思啊。', [
      { text: <div className="primary">取消</div> },
      {
        text: <div className="warn">确定</div>,
        onPress: () => {
          this.props.logout().then(() => {
            this.props.history.push('/login')
          })
        }
      },
    ])
  }

  render() {
    return (
      <List>
        <List.Item onClick={this.doLogout}>退出登录</List.Item>
      </List>
    )
  }
}

Logout.propTypes = {
  logout: Proptypes.func.isRequired,
  history: Proptypes.object.isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(Logout))
