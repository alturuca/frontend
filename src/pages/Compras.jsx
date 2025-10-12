
import React, { useState } from 'react';
import CompraForm from '../components/CompraForm';
import './Compras.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import {useNavigate } from 'react-router-dom';


const Compras = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();


  const handleGuardarCompra = (nuevaCompra) => {
    const nuevaId = compras.length + 1;
    setCompras([...compras, { ...nuevaCompra, id: nuevaId }]);

  };

  const handleCerrarSesion = () => {
    navigate('/');

  };

  const handleIrTablero = () => {
    navigate('/dashboard');

  };

  return (

      <div className="compras-page">
        <div className='header-container'>
          <h2>Registro de Compras</h2>
          <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
          </section>
         </div>
        <CompraForm onGuardar={handleGuardarCompra} />

        <table className="compras-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Proveedor</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.fecha}</td>
                <td>{compra.proveedor}</td>
                <td>{compra.producto}</td>
                <td>{compra.cantidad}</td>
                <td>${compra.precioUnitario}</td>
                <td>${compra.cantidad * compra.precioUnitario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default Compras;