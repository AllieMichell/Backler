import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import configureStore from './store/configureStore';
import './index.css';
import App from './component/App';


const app = document.getElementById('root');

const store = configureStore();
sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  app
);
