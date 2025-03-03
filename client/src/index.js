import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import ReduxProvider from './redux/ReduxProvider';



import App from './app/App'
import { Head } from "./config/Head";
import Preloader from './config/Preload';

import { initialState } from './redux/initialState';
import { actions } from './redux/actions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ReduxProvider initialState={initialState} actions={actions}>
      <BrowserRouter>
        <HelmetProvider>

          <Preloader wait={true} lastFetchName="app">
            <Head />
            <App />
          </Preloader>

        </HelmetProvider>
      </BrowserRouter>
    </ReduxProvider>
);
