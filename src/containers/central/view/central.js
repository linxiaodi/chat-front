import React from 'react'
import { connect } from 'react-redux'
import PropsTypes from 'prop-types'
import { Result, WhiteSpace } from 'antd-mobile'
import ExtractInfo from './extra-info'
import Logout from './logout'

const mapStateToProps = state => ({
  user: state.user,
  userInfo: state.userInfo
})

class Central extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { nickname, avatar, company } = this.props.userInfo
    const myavatr = () => (<img className="big-avatar" src={avatar} alt=""/>)
    return (
      <div>
        <Result
          title={nickname}
          img={myavatr()}
          message={company}
        />
        <ExtractInfo
          user={this.props.user}
          userInfo={this.props.userInfo}
        />
        <WhiteSpace />
        <Logout />
      </div>
    )
  }
}

Central.propTypes = {
  user: PropsTypes.object.isRequired,
  userInfo: PropsTypes.object.isRequired
}

export default connect(mapStateToProps)(Central)
