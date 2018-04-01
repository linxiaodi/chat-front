import React from 'react'
import { TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const { Item } = TabBar

const mapStateToProps = state => ({
  unRead: state.chat.unRead
})

const NavLink = ({ data, history, unRead }) => {
  const pathname = window.location.hash.split('#')[1]
  const toggleRoute = (path) => {
    return () => (history.push(path))
  }
  return (
    <div className="tabs">
      <TabBar>
        {
          data.map((el) => {
            return (
              <Item
                key={el.text}
                icon={<i className={el.icon}/>}
                title={el.text}
                badge={el.icon.indexOf('message') > -1 ? unRead : 0}
                selectedIcon={<i className={el.icon} style={{ color: '#108ee9' }}/>}
                selected={pathname === el.path}
                onPress={toggleRoute(el.path)}
              />
            )
          })
        }
      </TabBar>
    </div>
  )
}

NavLink.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  unRead: PropTypes.number.isRequired
}

export default withRouter(connect(mapStateToProps)(NavLink))
