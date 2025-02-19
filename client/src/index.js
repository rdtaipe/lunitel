import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import ReduxProvider from './redux/ReduxProvider';
import { Head } from "./config/head";

// app
import App from './app/App'


import { initialState } from './redux/initialState';
import { actions } from './redux/actions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider initialState={initialState} actions={actions}>
      <BrowserRouter>
        <HelmetProvider>
          <Head />
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
