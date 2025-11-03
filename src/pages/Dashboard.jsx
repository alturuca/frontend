import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import BotonCerrarSesion from '../components/BotonCerrarSesion';

const Dashboard = () => {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token || token === 'undefined' || token === 'null') {
      console.warn('Token no válido. Redirigiendo al login...');
      localStorage.removeItem('access_token');
      navigate('/');
      return;
    }

    fetch('http://127.0.0.1:8000/api/v1/auth/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Token inválido o expirado');
          }
          throw new Error('Error al obtener datos del usuario');
        }
        return res.json();
      })
      .then(data => {
        console.log('📦 Datos recibidos del backend:', data);
        setRol(data.rol);
        setUsuario(data.first_name || data.username || 'Usuario');
      })
      .catch(error => {
        console.error('Error al obtener el rol:', error);
        localStorage.removeItem('access_token');
        navigate('/');
      });
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Bienvenido, {usuario}</h1>
          <p>Tu panel de control en StocklyX</p>
        </div>
        <section className='header-container-botones'>
          <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
        </section>
      </header>

      <section className="dashboard-grid">
        <Link to="/ventas" className="dashboard-card dashboard-link">
          <h3>Modulo Ventas</h3>
          
        </Link>

        <Link to="/productos" className="dashboard-card dashboard-link">
          <h3>Gestion Productos</h3>
          
        </Link>

        {rol === 'administrador' && (
          <>
            <Link to="/compras" className="dashboard-card dashboard-link">
              <h3>Modulo Compras</h3>
              
            </Link>
            <Link to="/inventario" className="dashboard-card dashboard-link">
              <h3>Inventario</h3>
            </Link>
             
            <Link to="/reportes" className="dashboard-card wide dashboard-link">
              <h3>Reportes</h3>
              
            </Link>
            <Link to="/usuarios" className="dashboard-card dashboard-link">
              <h3>Gestion de Usuarios</h3>
              
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;