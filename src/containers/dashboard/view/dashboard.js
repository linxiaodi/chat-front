import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLink from '../../../components/nav-link'
import { view as Discovery } from '../../discovery/'
import { view as Central } from '../../central/'
import { view as Contact } from '../../contact/'
import { actions as userActions } from '../../login/'
import { actions as chatActions } from '../../chat/'
import { actions as discoveryAction } from '../../discovery/'
import init from '../../../utils/init'

const mapStateToProps = state => ({
  user: state.user,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({
  initUser() {
    return dispatch(userActions.initUser())
  },
  initSocket() {
    return dispatch(chatActions.recvMsg())
  },
  getMsgList() {
    return dispatch(chatActions.getMsgList())
  },
  initDiscovery() {
    return dispatch(discoveryAction.getList())
  }
})

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navTabLinks: [
        {
          icon: 'iconfont icon-find',
          text: '发现',
          title: 'Boss列表',
          component: Discovery,
          path: `${this.props.match.url}/discover`
        },
        {
          icon: 'iconfont icon-message',
          text: '消息',
          title: '消息',
          component: Contact,
          path: `${this.props.match.url}/message`
        },
        {
          icon: 'iconfont icon-fonts-user',
          text: '我的',
          title: '个人中心',
          component: Central,
          path: `${this.props.match.url}/user`
        }
      ]
    }
    this.getDiscoveryTitle = this.getDiscoveryTitle.bind(this)
  }

  componentDidMount() {
    const {
      initSocket,
      initUser,
      chat,
      getMsgList,
      user
    } = this.props
    init(initSocket, initUser, chat.chatDetails, getMsgList, user)
    this.props.initDiscovery()
  }

  getDiscoveryTitle() {
    return this.props.user.role === 'boss' ? '牛人列表' : 'Boss列表'
  }

  render() {
    const { navTabLinks } = this.state
    const title = () => {
      const tabLinks = this.state.navTabLinks
      const pathname = window.location.hash.split('#')[1]
      const i = tabLinks.findIndex(e => e.path === pathname)
      return i > 0 ? tabLinks[i].title : this.getDiscoveryTitle()
    }
    return (
      <div className="main">
        <NavBar>{title()}</NavBar>
        <Switch>
          {
            navTabLinks.map((el) => {
              return <Route key={el.text} path={el.path} component={el.component}/>
            })
          }
          <Redirect to={navTabLinks[0].path}/>
        </Switch>
        <NavLink data={this.state.navTabLinks} currentPath={this.props.match.url}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  initUser: PropTypes.func.isRequired,
  initSocket: PropTypes.func.isRequired,
  getMsgList: PropTypes.func.isRequired,
  initDiscovery: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
