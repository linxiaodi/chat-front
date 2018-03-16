import React from 'react'
import { List, WingBlank, WhiteSpace, Radio, InputItem, Button } from 'antd-mobile'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Logo from '../../../components/logo'
import Validator from '../../../utils/validator'
import { toastInfo } from '../../../utils/toast'
import User from '../../../service/user'
import { actions } from '../../login/'

const { RadioItem } = Radio
const { login } = actions

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin(data) {
      return dispatch(login(data))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      role: 'boss'
    }
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
    } = this.state
    validator.add(username, 'noEmpty', '用户名不能为空')
    validator.add(password, 'minLength:6', '密码不能小于6位数')
    validator.add([password, verifyPassword], 'sameValue', '两次输入密码不相符')
    return validator.start()
  }

  doRegister() {
    const validateResult = this.checkform()
    if (validateResult) return toastInfo(validateResult)
    User.register(this.state).then((res) => {
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
    } = this.state
    const { hasAuth, isFillInfo } = this.props.user
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
              onChange={this.saveInfo.bind(this, 'username')}
              placeholder="请输入您的账号"
            >
              账号
            </InputItem>
            <InputItem
              value={password}
              onChange={this.saveInfo.bind(this, 'password')}
              placeholder="密码不能小于6位数"
              type="password"
            >
              密码
            </InputItem>
            <InputItem
              value={verifyPassword}
              onChange={this.saveInfo.bind(this, 'verifyPassword')}
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
              onChange={this.saveInfo.bind(this, 'role', 'boss')}
            >
              Boss
            </RadioItem>
            <RadioItem
              value="genius"
              checked={role === 'genius'}
              onChange={this.saveInfo.bind(this, 'role', 'genius')}
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
  // history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  doLogin: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
