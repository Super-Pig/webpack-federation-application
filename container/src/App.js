import React, { useState, useEffect } from 'react'
import MarketingApp from './components/MarketingApp'
import AuthApp from './components/AuthApp'
import Header from './components/Header'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (status) {
      history.push('/dashboard')
    }
  }, [status])

  return (
    <Router history={history}>
      <Header status={status} setStatus={setStatus} />
      <Switch>
        <Route path='/auth/signin'>
          <AuthApp />
        </Route>
        <Route path='/'>
          <MarketingApp />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
