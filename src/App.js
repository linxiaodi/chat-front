import React from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { view as Login } from './containers/login'
import { view as Register } from './containers/register'
import { view as BossSetting } from './containers/bossSetting'
import { view as GeniusSetting } from './containers/geniusSetting'
import { view as Dashboard } from './containers/dashboard/'

import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/bossSetting" component={BossSetting}/>
          <Route path="/geniusSetting" component={GeniusSetting}/>
          <Redirect to="/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
