import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { Ul, Li } from 'components/InlineUl'
import { PluginListItem } from '../components/Plugins'

import classes from './plugin.scss'

export default class Plugin extends Component {
  static propTypes = {
    plugin: ImmutablePropTypes.map.isRequired,
    /**
     * 设置 是否启用 function (plugin: Plugin, enabled: bool) {}
     */
    toggle: PropTypes.func,
    /**
     * 删除 plugin function (plugin: Plugin) {}
     */
    remove: PropTypes.func,
    upgrade: PropTypes.func,
  }

  setDisabled = () => {
    const { plugin, toggle } = this.props
    return toggle && toggle(plugin, false)
  }

  setEnabled = () => {
    const { plugin, toggle } = this.props
    return toggle && toggle(plugin, true)
  }

  handleRemove = () => {
    const { plugin, remove } = this.props
    remove && remove(plugin)
  }

  handleUpgrade = () => {
    const { upgrade, plugin } = this.props
    upgrade && upgrade(plugin)
  }

  renderActions (enabled) {
    return <Ul className={classes.actions}>
      {enabled && <Li><a onClick={this.setDisabled}
        className={classes.grey}>
        停用
      </a></Li>}
      {!enabled && <Li><a onClick={this.handleRemove}>删除</a></Li>}
    </Ul>
  }

  renderUpdateInfo () {
    const { plugin } = this.props
    const name = plugin.get('name')
    return <div className={classes.update}>
      {name} 有新版本可用。<a href={plugin.get('details')} target='_blank'>
        查看详情
      </a> 或 <a
        onClick={this.handleUpgrade}>
        现在更新
      </a>
    </div>
  }

  render () {
    const { plugin } = this.props
    const version = plugin.get('tag')
    const lastest = plugin.get('currentTag')
    const canUpgrade = lastest && lastest !== version
    const enabled = plugin.get('enabled')
    return <PluginListItem plugin={plugin}
      actions={this.renderActions(enabled)}>
      {canUpgrade && this.renderUpdateInfo()}
    </PluginListItem>
  }
}
