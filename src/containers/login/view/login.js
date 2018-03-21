import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Validator from '../../../utils/validator'
import Logo from '../../../components/logo'
import { toastInfo } from '../../../utils/toast'
import wrapper from './wrapper'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
    this.checkForm = this.checkForm.bind(this)
  }

  submit() {
    const result = this.checkForm()
    if (result) return toastInfo(result)
    const { username, password } = this.props.state
    this.props.doLogin({ username, password }).then((res) => {
      const { role, isFillInfo } = res // true 登录成功，如何判断是否填写资料
      this.props.history.push(isFillInfo ? '/' : `${role}Setting`)
    })
  }

  checkForm() {
    const validator = new Validator()
    const { username, password } = this.props.state
    validator.add(username, 'noEmpty', '用户名不能为空')
    validator.add(password, 'noEmpty', '密码不能为空')
    return validator.start()
  }

  render() {
    const { username, password } = this.props.state
    const { setFormState } = this.props
    return (
      <div className="login">
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              value={username}
              onChange={setFormState.bind(this, 'username')}
              data-id="username"
              placeholder="请输入您的账号"
            >
              账号
            </InputItem>
            <InputItem
              value={password}
              onChange={setFormState.bind(this, 'password')}
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
//
Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired
}

export default wrapper(Login)
