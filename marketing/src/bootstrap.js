import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

function mount(el, { onNavigate, defaultHistory }) {
  const history = defaultHistory || createMemoryHistory()

  onNavigate && history.listen(onNavigate)

  ReactDOM.render(<App history={history} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-marketing')

  el && mount(el, {
    defaultHistory: createBrowserHistory()
  })
}

export { mount }