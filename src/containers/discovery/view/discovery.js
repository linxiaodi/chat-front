import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, WhiteSpace } from 'antd-mobile'

const CardHeader = Card.Header
const CardBody = Card.Body
const CardFooter = Card.Footer

const mapStateToProps = state => ({
  user: state.user,
  discoveryList: state.discoveryList
})

class Discovery extends React.Component {
  constructor(props) {
    super(props)
    this.toChat = this.toChat.bind(this)
  }

  toChat(el) {
    return () => {
      const { _id } = el
      this.props.history.push(`/chat/${_id}`)
    }
  }

  render() {
    const { discoveryList } = this.props
    const bodyTitle = this.props.user === 'genius' ? '个人简介' : '任职要求'
    return (
      <div>
        {
          discoveryList.map((el, i) => {
            const time = el.updateTime.split('T')[0]
            const timeElement = (
              <div className="card-footer-extra">
                {time}
              </div>
            )
            const footerTitle = (
              <div className="card-footer-title">
                <img src={el.avatar} alt=""/>
                <p>{el.nickname}</p>
              </div>
            )
            return (
              <div key={el.updateTime}>
                <Card onClick={this.toChat(el)}>
                  <CardHeader
                    title={el.job}
                    extra={<span className="salary">{el.salary}</span>}
                  />
                  <CardBody>
                    <p className="noMargin body-title">{bodyTitle}：</p>
                    <pre className="card-body-pre">
                      {el.jobDescription || el.selfDescription}
                    </pre>
                  </CardBody>
                  <CardFooter
                    content={footerTitle}
                    extra={timeElement}
                  />
                </Card>
                {
                  i === discoveryList.length - 1 ? null : <WhiteSpace/>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

Discovery.propTypes = {
  user: PropTypes.object.isRequired,
  discoveryList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Discovery)
