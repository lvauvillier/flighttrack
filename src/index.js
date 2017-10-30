import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';
import AppContainer from './containers/AppContainer';

import theme from './theme';

import './styles.css';

injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router>
        <AppContainer />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
