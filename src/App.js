import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import LoginForm from './LoginForm';
import RegisterForm from "./RegisterForm"

const App = () => {
  return (
    
      <Routes>
        <Route path="/registrar" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/listar" element={<ProductList />} />
        <Route path="/cadastro" element={<ProductForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    
  );
};

export default App;
