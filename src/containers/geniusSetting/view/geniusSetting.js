import React from 'react'
import { NavBar, List, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { toastInfo } from '../../../utils/toast'
import Validator from '../../../utils/validator'
import AvatarSelector from '../../../components/avatar-selector/'
import { fillInfo } from '../actions'

const mapStateToProps = (state) => {
  return {
    user: state.user.isFillInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fillInfo(data) {
      dispatch(fillInfo(data))
    }
  }
}

class GeniusSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      nickname: '',
      job: '',
      salary: '',
      selfDescription: ''
    }
    this.onSelect = this.onSelect.bind(this)
    this.onInput = this.onInput.bind(this)
    this.submit = this.submit.bind(this)
  }

  onSelect({ icon }) {
    this.setState({
      avatar: icon
    })
  }

  onInput(type) {
    return (value) => {
      this.setState({
        [type]: value
      })
    }
  }

  submit() {
    const validator = new Validator()
    const errorMsg = {
      avatar: '请选择头像',
      nickname: '请填写昵称',
      job: '请填写应聘职位',
      salary: '请填写薪酬',
      jobDescription: '请填写自我介绍'
    }
    Object.keys(this.state).forEach((key) => {
      validator.add(this.state[key], 'noEmpty', errorMsg[key])
    })
    const validateResult = validator.start()
    if (validateResult) {
      toastInfo(validateResult)
    }
    this.props.fillInfo(this.state)
  }

  render() {
    const {
      nickname,
      job,
      salary,
      selfDescription
    } = this.state
    const { isFillInfo } = this.props.user
    if (isFillInfo) {
      return <Redirect to="/central" />
    }
    return (
      <div>
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector onSelect={this.onSelect}/>
        <WhiteSpace/>
        <List>
          <InputItem
            placeholder="请输入您的姓名或昵称"
            value={nickname}
            onChange={this.onInput('nickname')}
          >
            姓名昵称
          </InputItem>
          <InputItem
            placeholder="请输入您要应聘的职位"
            value={job}
            onChange={this.onInput('job')}
          >
            应聘职位
          </InputItem>
          <InputItem
            placeholder="如：10k-15k"
            value={salary}
            onChange={this.onInput('salary')}
          >
            薪酬范围
          </InputItem>
          <TextareaItem
            value={selfDescription}
            onChange={this.onInput('selfDescription')}
            rows={4}
            autoHeight
            placeholder="自我描述"
          />
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button onClick={this.submit} type="primary">提交</Button>
      </div>
    )
  }
}

GeniusSetting.propTypes = {
  user: PropTypes.object.isRequired,
  fillInfo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeniusSetting)
