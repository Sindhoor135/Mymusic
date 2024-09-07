

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter

// Import StateProvider and reducer
import { StateProvider } from './Context/StateProvider';
import  { initialState } from './Context/initalState';
import reducer from './Context/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire app with Router and StateProvider */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router> {/* Wrap the App with Router */}
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

