import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(<Root />);
