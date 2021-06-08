import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './/components/App';
import 'bootstrap/dist/css/bootstrap.css';



ReactDOM.render(
  <Provider store= {configureStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

