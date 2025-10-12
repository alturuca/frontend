
import React, { useState } from 'react';
import VentaForm from '../components/VentaForm';
import './Ventas.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { useNavigate } from 'react-router-dom';


const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  const handleGuardarVenta = (nuevaVenta) => {
    const nuevaId = ventas.length + 1;
    setVentas([...ventas, { ...nuevaVenta, id: nuevaId }]);
  };

  const handleCerrarSesion = () => {
    navigate('/');

  };

  const handleIrTablero = () => {
    navigate('/dashboard');

  };
  

  return (
    <div className="ventas-page">
      <div className='header-container'>        
        <h2>Registro de Ventas</h2>
        <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
        </section>
      </div>
      <VentaForm onGuardar={handleGuardarVenta} />

      <table className="ventas-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.fecha}</td>
              <td>{venta.cliente}</td>
              <td>{venta.producto}</td>
              <td>{venta.cantidad}</td>
              <td>${venta.precioUnitario}</td>
              <td>${venta.cantidad * venta.precioUnitario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;