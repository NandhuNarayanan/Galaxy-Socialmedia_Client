import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { DarkModeContextProvider } from './context/darkModeContext'

import { store} from './app/store';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <Provider store={store}>
        <App />
    </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
);
