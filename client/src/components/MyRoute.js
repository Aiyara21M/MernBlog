import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from '../App';
import FormComponents from './FormComponent';
import SingleComponent from './SingleComponent';
import EditComponent from './EditComponent';
import LoginCom from './LoginCom';
import AdminRoute from '../AdminRoute';

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginCom />} />
        <Route path="/create" element={<AdminRoute element={FormComponents} />} />
        <Route path="/blog/:slug" element={<SingleComponent />} />
        <Route path="/blog/update/:slug" element={<AdminRoute element={EditComponent} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
