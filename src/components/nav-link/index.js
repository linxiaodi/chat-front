import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const { Item } = TabBar

const NavLink = ({ data, history }) => {
  const { pathname } = window.location
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
}

export default withRouter(NavLink)
