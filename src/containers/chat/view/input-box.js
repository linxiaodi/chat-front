import React from 'react'
import { InputItem } from 'antd-mobile'
import PropTypes from 'prop-types'
import { toastInfo } from '../../../utils/toast'

class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.keyDownSubmit = this.keyDownSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
    this.state = {
      text: ''
    }
  }

  onChangeText(v) {
    this.setState({
      text: v
    })
  }

  keyDownSubmit(e) {
    if (e.keyCode === 13) {
      this.props.doSubmit(this.state.text)
      this.setState({ text: '' })
    }
  }

  doSubmit() {
    const { text } = this.state
    if (!text.trim()) {
      toastInfo('你想说什么呀~')
      return
    }
    this.props.doSubmit(this.state.text)
    this.setState({ text: '' })
  }

  render() {
    const { text } = this.state

    const sendBtn = (<div onClick={this.doSubmit}>发送</div>)
    return (
      <div className="input-box">
        <InputItem
          value={text}
          onChange={this.onChangeText}
          extra={sendBtn}
          onKeyDown={this.keyDownSubmit}
        />
      </div>
    )
  }
}

InputBox.propTypes = {
  doSubmit: PropTypes.func.isRequired,
}

export default InputBox
