import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Ventas from './pages/Ventas'
import Productos from './pages/Productos';
import Compras from './pages/Compras';
import Usuarios from './pages/Usuarios';
import Reportes from './pages/Reportes';

import './App.css'



function App() {
  

  return  (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/ventas" element={<Ventas/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/compras" element={<Compras/>} />
        <Route path="/reportes" element={<Reportes/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
      </Routes>
    </Router>

  );  
   
  
  
}

export default App
