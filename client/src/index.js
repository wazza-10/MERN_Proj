import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {thunk} from 'redux-thunk';
import App from './App';
import './index.css';

import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="38464961384-cecng2p8qauf4vs6v6ntdkbg1l4tg6no.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </Provider>
  </GoogleOAuthProvider>

);
//ReactDOM.render(<App />, document.getElementById('root'));
