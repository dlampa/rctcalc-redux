import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// See reference below
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import calcHistoryReducer from './reducers';
import { Provider } from 'react-redux';

// Site components
import './index.css';
import App from './App';
import SiteNav from './SiteNav';
import CalcHistory from './CalcHistory';


const store = createStore(
  calcHistoryReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For redux devtools
);

// Provider wants a function
const Root = (store) => (
  <Provider store={store.store}>
    <Router>
      <SiteNav />
      <Route path="/" exact component={App} />
      <Route path="/history" component={CalcHistory} />
    </Router>
  </Provider>
);

/*  This was a big pain. Render from 'react-dom' produced an error about default.render not being a function
    Solution was to use ReactDOM.render instead of just render. Could be an issue with react library
    version not having render function, based on discussion in thread
    Ref: https://stackoverflow.com/a/39157549/12802214 */ 
ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root")
);

