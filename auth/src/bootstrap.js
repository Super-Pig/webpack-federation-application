import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

function mount(el, { onNavigate, defaultHistory, initialPath, setStatus }) {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  onNavigate && history.listen(onNavigate)

  ReactDOM.render(<App history={history} setStatus={setStatus} />, el)

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
  const el = document.querySelector('#dev-auth')

  el && mount(el, {
    defaultHistory: createBrowserHistory()
  })
}

export { mount }