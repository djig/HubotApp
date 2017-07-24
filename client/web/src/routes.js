import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import CommentsPage from './containers/CommentsPage';
import CommentFormPage from './containers/CommentFormPage'; 
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CommentsPage}/>
     <Route path="/comments" component={CommentsPage}/>
      <Route path="/comments/new" component={CommentFormPage}/>
      <Route path="/comments/:id" component={CommentFormPage}/>
      <Route path="*" component={NotFoundPage}/>
  </Route>
);