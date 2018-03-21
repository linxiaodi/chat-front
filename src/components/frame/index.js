import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const TabBarItem = TabBar.Item

const Discovery = () => (<div>发现</div>)
const Message = () => (<div>信息</div>)
const User = () => (<div>我的</div>)

const tabBars = [
  {
    icon: 'iconfont icon-find',
    text: '发现',
    component: <Discovery />,
    path: '/discover'
  },
  {
    icon: 'iconfont icon-message',
    text: '消息',
    component: <Message />,
    path: 'message'
  },
  {
    icon: 'iconfont icon-fonts-user',
    text: '我的',
    component: <User />,
    path: 'user'
  }
]

const mapStateToProps = state => ({
  user: state.user
})

class Framework extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 0,
      tabBars,
      role: this.props.user.role
    }
    this.toggleRoute = this.toggleRoute.bind(this)
  }

  toggleRoute(i) {
    return () => {
      this.setState({
        route: i
      })
    }
  }

  render() {
    const { title, children } = this.props
    return (
      <div className="framework">
        <NavBar>{title}</NavBar>
        {children}
        <TabBar>
          {
            tabBars.map((el, i) => {
              return (
                <TabBarItem
                  key={el.text}
                  icon={<i className={el.icon}/>}
                  title={el.text}
                  onPress={this.toggleRoute(i)}
                  selected={this.state.route === i}
                  selectedIcon={<i className={el.icon} style={{ color: '#108ee9' }}/>}
                >
                  {el.component}
                </TabBarItem>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}

Framework.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  user: PropTypes.object.isRequired
}

Framework.defaultProps = {
  children: null,
  title: '牛人列表'
}

export default withRouter(connect(mapStateToProps)(Framework))
