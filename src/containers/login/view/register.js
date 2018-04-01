import React from 'react'
import { List, WingBlank, WhiteSpace, Radio, InputItem, Button } from 'antd-mobile'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Logo from '../../../components/logo'
import Validator from '../../../utils/validator'
import { toastInfo } from '../../../utils/toast'
import User from '../../../service/user'
import * as actions from '../actions'

const { RadioItem } = Radio
const { login } = actions

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin(data) {
      return dispatch(login(data))
    }
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    // event
    this.saveInfo = this.saveInfo.bind(this)
    this.doRegister = this.doRegister.bind(this)
    this.checkform = this.checkform.bind(this)
    this.doRegister = this.doRegister.bind(this)
  }

  saveInfo(type, v) {
    this.setState({
      [type]: v,
    })
  }

  checkform() {
    const validator = new Validator()
    const {
      username,
      password,
      verifyPassword,
    } = this.props.state
    validator.add(username, 'noEmpty', '用户名不能为空')
    validator.add(password, 'minLength:6', '密码不能小于6位数')
    validator.add([password, verifyPassword], 'sameValue', '两次输入密码不相符')
    return validator.start()
  }

  doRegister() {
    const validateResult = this.checkform()
    if (validateResult) return toastInfo(validateResult)
    User.register(this.props.state).then((res) => {
      debugger
      if (res && res.code === 2000) {
        this.props.doLogin(this.state)
      }
    })
  }

  render() {
    const {
      username,
      password,
      verifyPassword,
      role,
    } = this.props.state
    const { hasAuth } = this.props.user
    const { isFillInfo } = this.props.userInfo
    if (hasAuth) {
      let redirectUrl = ''
      if (isFillInfo) {
        redirectUrl = '/central'
      } else {
        redirectUrl = `${this.props.user.role}Setting`
      }
      return <Redirect to={redirectUrl}/>
    }
    return (
      <div className="register">
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              value={username}
              onChange={this.setFormState.bind(this, 'username')}
              placeholder="请输入您的账号"
            >
              账号
            </InputItem>
            <InputItem
              value={password}
              onChange={this.setFormState.bind(this, 'password')}
              placeholder="密码不能小于6位数"
              type="password"
            >
              密码
            </InputItem>
            <InputItem
              value={verifyPassword}
              onChange={this.setFormState.bind(this, 'verifyPassword')}
              placeholder="请再次输入您的密码"
              type="password"
            >
              确认密码
            </InputItem>
          </List>
          <WhiteSpace/>
          <List renderHeader="请选择您的身份">
            <RadioItem
              value="boss"
              checked={role === 'boss'}
              onChange={this.setFormState.bind(this, 'role', 'boss')}
            >
              Boss
            </RadioItem>
            <RadioItem
              value="genius"
              checked={role === 'genius'}
              onChange={this.setFormState.bind(this, 'role', 'genius')}
            >
              求职者
            </RadioItem>
          </List>
          <WhiteSpace size="xl"/>
          <Button onClick={this.doRegister} type="primary">确认注册</Button>
          <WhiteSpace/>
          <Link to="/login">已有账号，点击登录</Link>
        </WingBlank>
      </div>
    )
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  doLogin: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
