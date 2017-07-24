/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import client from './graphQl/client';
import './styles/styles.scss'; // Yes, that's right. You can import SASS/CSS files too! Webpack will run the associated loade///////r and plug this into the page.
import './styles/about-page.css';
import { syncHistoryWithStore } from 'react-router-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider} from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


injectTapEventPlugin();
const store = configureStore();
// Create an enhanced history that syncs navigation events with the store fd
const history = syncHistoryWithStore(browserHistory, store);

render(
  <ApolloProvider store={store} client={client}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </ApolloProvider>, document.getElementById('app')
);
