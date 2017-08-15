import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { connect } from 'react-redux'

import createI18n from '../i18n'
import language from 'util/language'

import { Map } from 'immutable'

// import moment from 'moment'

import Loading from 'components/Loading'

import { Mapping, Legend, Entry } from './mapping'

import classes from './info.scss'

function mapStateToProps (state, props) {
  const { job } = state
  const { params: { jobId } } = props
  return {
    job: job.getIn(['data', jobId])
  }
}

export class JobInfo extends Component {
  static propTypes = {
    job: ImmutablePropTypes.map,
    i18n: PropTypes.func.isRequired,
  }

  static defaultProps = {
    i18n: createI18n(language),
  }

  getCommit (id) {
    return id ? id.substr(0, 7) : ''
  }

  renderCommit () {
    const { job, i18n } = this.props
    const outputs = job.get('outputs', new Map())
    return <Mapping>
      <Legend name={i18n('提交信息')} />
      <Entry name='Commit' value={<a target='_blank'>
        {outputs.getIn(['FLOW_GIT_COMMIT_ID', 'value'], '-')}
      </a>} />
      <Entry name='Author'
        value={outputs.getIn(['FLOW_GIT_COMMITER', 'value'])} />

      <Entry name='Branch'
        value={outputs.getIn(['FLOW_GIT_BRANCH', 'value'])} />

      <Entry name='Commit message'
        value={outputs.getIn(['FLOW_GIT_CHANGELOG', 'value'])} />

      <Entry name='Compare' value={<a target='_blank'>
        {outputs.getIn(['FLOW_GIT_COMPARE_ID', 'value'])}
      </a>} />
      <Legend name={i18n('Agent 信息')} />
      <Entry name='Agent'
        value={outputs.getIn(['FLOW_AGENT_ZONE', 'value'])} />
    </Mapping>
  }

  renderContent () {
    return <div>
      {this.renderCommit()}
    </div>
  }

  render () {
    const { job } = this.props
    return <div>
      {job ? this.renderContent() : <div className={classes.loading}>
        <Loading />
      </div>}
    </div>
  }
}

export default connect(mapStateToProps)(JobInfo)
