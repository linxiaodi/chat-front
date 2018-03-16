import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Validator from '../../../utils/validator'
import Logo from '../../../components/logo'
import { toastInfo } from '../../../utils/toast'
import { login } from '../actions'

const mapDispatchToState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin(data) {
      dispatch(login(data))
    }
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.submit = this.submit.bind(this)
    this.checkForm = this.checkForm.bind(this)
  }

  setUsername(value) {
    this.setState({
      username: value,
    })
  }

  setPassword(value) {
    this.setState({
      password: value
    })
  }

  submit() {
    const result = this.checkForm()
    if (result) return toastInfo(result)
    this.props.doLogin(this.state)
  }

  checkForm() {
    const validator = new Validator()
    const { username, password } = this.state
    validator.add(username, 'noEmpty', '用户名不能为空')
    validator.add(password, 'noEmpty', '密码不能为空')
    return validator.start()
  }

  render() {
    const { username, password } = this.state
    const { isFillInfo, role, hasAuth } = this.props.user // true 登录成功，如何判断是否填写资料
    if (hasAuth) {
      let redirectUrl = ''
      if (isFillInfo) {
        redirectUrl = '/central'
      } else {
        redirectUrl = `${role}Setting`
      }
      return <Redirect to={redirectUrl}/>
    }
    return (
      <div className="login">
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              value={username}
              onChange={this.setUsername}
              data-id="username"
              placeholder="请输入您的账号"
            >
              账号
            </InputItem>
            <InputItem
              value={password}
              onChange={this.setPassword}
              data-id="password"
              type="password"
              placeholder="请输入您的密码"
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace size="xl"/>
          <Button onClick={this.submit} type="primary">登录</Button>
          <WhiteSpace/>
          <Link className="textRight" to="/register" replace>还没有账号？赶紧注册</Link>
        </WingBlank>
      </div>
    )
  }
}

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapDispatchToState, mapDispatchToProps)(Login)
