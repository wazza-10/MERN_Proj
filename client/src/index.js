import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';

import reducers from './reducers';

const store = configureStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,

);
//ReactDOM.render(<App />, document.getElementById('root'));
