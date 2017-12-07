import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Component from './index'
import ListComponent from './List'
import CeateComponent from './Create'

export default function (path, store) {
  return <Route path={path} component={Component}
    icon='icon-bookmark' text='Credentials' navbar>
    <IndexRedirect to='/admin/credentials/list' />
    <Route path='list' navbar component={ListComponent} />
    <Route path='create' navbar component={CeateComponent} />
  </Route>
}
