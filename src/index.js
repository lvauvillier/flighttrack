import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/BrowserRouter';
import { Provider } from 'react-redux';

import configureStore from './store';
import AppContainer from './containers/AppContainer';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
