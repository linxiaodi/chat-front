import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { view as Login } from './containers/login'
import { view as Register } from './containers/register'
import { view as BossSetting } from './containers/bossSetting'
import { view as GeniusSetting } from './containers/geniusSetting'

import Central from './containers/central'

import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/central" exact component={Central} />
            <Route path="/bossSetting" exact component={BossSetting} />
            <Route path="/geniusSetting" exact component={GeniusSetting} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  )
}

export default App
