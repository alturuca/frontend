import React, { useState, useEffect } from 'react';
import InventarioTable from '../components/InventarioTable';
import './Inventario.css';
import {useNavigate } from 'react-router-dom';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/productos/';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };


   useEffect(() => {
      fetchProductos();
    }, []);

  const handleCerrarSesion = () => {
    navigate('/');

  };

  const handleIrTablero = () => {
    navigate('/dashboard');

  };

  


    

  return (
    <div className="inventario-page">
      <div className='header-container'>
        <h2>Inventario Actual</h2>
        <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
        </section>   
      </div>     
        <InventarioTable productos={productos} />
      
    </div>
  );
};

export default Inventario;
