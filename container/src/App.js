import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './components/Header'
import Progress from './components/Progress'

const history = createBrowserHistory()

// 组件懒加载
const MarketingApp = lazy(() => import('./components/MarketingApp'))
const AuthApp = lazy(() => import('./components/AuthApp'))
const DashboardApp = lazy(() => import('./components/DashboardApp'))

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
      <Suspense fallback={<Progress />}>
        <Switch>
          <Route path='/auth/signin'>
            <AuthApp setStatus={setStatus} />
          </Route>
          <Route path='/dashboard'>
            {!status && <Redirect to='/'></Redirect>}
            <DashboardApp />
          </Route>
          <Route path='/'>
            <MarketingApp />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
