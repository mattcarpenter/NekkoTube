import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { Home } from './components'
import { App, Video } from './containers'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="video/:videoId" component={Video}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('mount')
)

