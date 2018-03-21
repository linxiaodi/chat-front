import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLink from '../../../components/nav-link'
import { view as Discovery } from '../../discovery/'
import { view as Central } from '../../central/'
import { actions as userActions } from '../../login/'

const Message = () => (<div>消息</div>)

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  initUser() {
    dispatch(userActions.initUser())
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
          component: Message,
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
    const { avatar } = this.props.user
    if (!avatar) this.props.initUser()
  }

  getDiscoveryTitle() {
    return this.props.user.role === 'boss' ? '牛人列表' : 'Boss列表'
  }

  render() {
    const { navTabLinks } = this.state
    const title = () => {
      const tabLinks = this.state.navTabLinks
      const { pathname } = window.location
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
  initUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
