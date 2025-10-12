/* src/pages/Inventario.jsx
import React, { useState, useEffect } from 'react';
import InventarioTable from '../components/InventarioTable';
import './Inventario.css';
import {useNavigate } from 'react-router-dom';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { getProducts } from '../api/productos';


const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem('access_token');

    fetch('http://localhost:8000/api/producto/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
      });
  }, []);


  const handleCerrarSesion = () => {
    navigate('/');

  };

  const handleIrTablero = () => {
    navigate('/dashboard');

  };

  const loadProduct = async() => {
        const response = await getProducts()
        console.log(response)
    }


    loadProduct()

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
*/