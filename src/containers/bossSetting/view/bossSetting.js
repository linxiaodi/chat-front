import React from 'react'
import { NavBar, List, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toastInfo } from '../../../utils/toast'
import AvatarSelector from '../../../components/avatar-selector/'
import Validator from '../../../utils/validator'
import { actions } from '../../geniusSetting/'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    fillInfo(data) {
      return dispatch(actions.fillInfo(data))
    }
  }
}

class BossSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      nickname: '',
      company: '',
      job: '',
      salary: '',
      jobDescription: ''
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
      company: '请填写公司名',
      job: '请填写招聘职位',
      salary: '请填写薪酬',
      jobDescription: '请填写工作要求'
    }
    Object.keys(this.state).forEach((key) => {
      validator.add(this.state[key], 'noEmpty', errorMsg[key])
    })
    const validateResult = validator.start()
    if (validateResult) {
      toastInfo(validateResult)
    }
    this.props.fillInfo(this.state).then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    const {
      nickname,
      company,
      job,
      salary,
      jobDescription
    } = this.state
    return (
      <div>
        <NavBar mode="dark">Boos完善信息页</NavBar>
        <AvatarSelector onSelect={this.onSelect}/>
        <WhiteSpace/>
        <List>
          <InputItem
            value={nickname}
            onChange={this.onInput('nickname')}
            placeholder="请输入您的姓名或昵称"
          >
            姓名昵称
          </InputItem>
          <InputItem
            value={company}
            onChange={this.onInput('company')}
            placeholder="请输入您所在的公司"
          >
            公司名称
          </InputItem>
          <InputItem
            value={job}
            onChange={this.onInput('job')}
            placeholder="请输入您要招聘的职位"
          >
            招聘职位
          </InputItem>
          <InputItem
            value={salary}
            onChange={this.onInput('salary')}
            placeholder="如：10k-15k"
          >
            薪酬范围
          </InputItem>
          <TextareaItem
            value={jobDescription}
            onChange={this.onInput('jobDescription')}
            rows={4}
            autoHeight
            placeholder="职位的详细要求"
          />
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button onClick={this.submit} type="primary">提交</Button>
      </div>
    )
  }
}

BossSetting.propTypes = {
  history: PropTypes.object.isRequired,
  fillInfo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(BossSetting)
