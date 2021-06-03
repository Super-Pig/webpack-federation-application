import React from 'react'
import MarketingApp from './components/MarketingApp'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './components/Header'

const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path='/'>
          <MarketingApp />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
