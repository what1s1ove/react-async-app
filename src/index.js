import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './store/store';
import './assets/styles/styles.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
