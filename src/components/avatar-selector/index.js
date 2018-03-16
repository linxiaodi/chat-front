import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
import renderData from './staticRender'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.doSelect = this.doSelect.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      icon: '',
      text: ''
    }
  }

  doSelect(target) {
    this.setState({
      ...target
    })
    this.props.onSelect(target)
  }

  renderHeader() {
    const { icon, text } = this.state
    const hasSelected = (
      <div>
        <span>已选择头像：</span>
        <img className="thumbnail" src={icon} alt={text}/>
      </div>
    )
    const noSelected = (
      <div>
        <span>尚未选择头像</span>
      </div>
    )
    if (icon) return hasSelected
    return noSelected
  }

  render() {
    return (
      <List renderHeader={this.renderHeader}>
        <Grid
          columnNum={5}
          onClick={this.doSelect}
          data={renderData}
        />
      </List>
    )
  }
}

AvatarSelector.propTypes = {
  onSelect: PropTypes.func
}

AvatarSelector.defaultProps = {
  onSelect: () => {}
}

export default AvatarSelector
