import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sum from '@/test'

console.log(sum(6, 6))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

