import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import sum from '@/test'
import router from './router';
import { RouterProvider } from 'react-router-dom';

// 导入定制主题文件
import './theme.css'

console.log(sum(6, 6))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

