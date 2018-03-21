import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'


const mapStateToProps = state => ({
  user: state.user,
  userInfo: state.userInfo,
})

const mapDispatchToProps = dispatch => ({
  doLogin(data) {
    return dispatch(login(data))
  }
})

/*
* Login与Register的装饰器
*
* @props: {
*   user: Object,
*   userInfo, Object,
*   state: Object,
*   setFormState: func, 更新外部state
*   doLogin: func
* }
* */

function wrapper(WrapedCompoennt) {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
        verifyPassword: '',
        role: 'boss'
      }
      this.setFormState = this.setFormState.bind(this)
    }

    setFormState(type, val) {
      this.setState({ [type]: val })
    }

    render() {
      const props = {
        ...this.props,
        state: this.state,
        setFormState: this.setFormState
      }
      return <WrapedCompoennt {...props}/>
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

export default wrapper
