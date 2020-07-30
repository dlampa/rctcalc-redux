import React from 'react';
// import ReactDOM from 'react-dom';

// Ref: https://redux.js.org/basics/usage-with-react/
import ReactDOM from 'react-dom';
import render from 'react-dom';
import './index.css';

// Redux
import { createStore } from 'redux';
import calcHistoryReducer from './reducers';
import { Provider } from 'react-redux';

import App from './App';

const store = createStore(
  calcHistoryReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For redux devtools
);

// Provider wants a function
const Root = (store) => (
  <Provider store={store.store}>
    <App />
  </Provider>
);

// render(
//   <Root store={store} />,
//   document.getElementById("root")
// );


ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
