import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import UserPageContainer from './containers/UserPage'; // eslint-disable-line import/no-named-as-default
 
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
     <Route path="users" component={UserPageContainer}/>
      <Route path="*" component={NotFoundPage}/>
  </Route>
);
