import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import router from './routes/routes.jsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';


// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
