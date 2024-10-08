// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Tailwind CSS

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);