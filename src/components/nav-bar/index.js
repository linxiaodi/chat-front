import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'

const { Item } = TabBar

const NavBar = (props) => {
  return (
    <TabBar>
      {
        props.data.map((el) => {
          return (
            <Item
              key={el.text}
              icon={<i className={el.icon}/>}
              title={el.text}
              selectedIcon={<i className={el.icon} style={{ color: '#108ee9' }}/>}
            >
              {el.component}
            </Item>
          )
        })
      }
    </TabBar>
  )
}

NavBar.propTypes = {
  data: PropTypes.object.isRequired
}

export default NavBar
