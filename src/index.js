require('bootstrap/dist/css/bootstrap.css');
require('../style/style.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import {Router,browserHistory} from 'react-router';
import routes from './routes';
import promise from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    	<Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
