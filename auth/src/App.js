import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Signin from './components/Signin'

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/auth/signin' component={Signin} />
      </Switch>
    </Router>
  )
}

export default App
