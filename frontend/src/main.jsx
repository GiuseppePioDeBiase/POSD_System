// main.jsx (o main.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './pages/Component/Login/Store_Redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
 </Provider>,
);