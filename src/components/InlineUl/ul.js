import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import classes from './ul.scss'

export default class InlineUl extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render () {
    const { children, className } = this.props
    return <ul className={classnames(classes.ul, className)}>
      {children}
    </ul>
  }
}
