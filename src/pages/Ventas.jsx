
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

  nuevaVenta.detalles.forEach((detalle) => {
    setVentas((prev) => [
      ...prev,
      {
        id: nuevaId,
        fecha: nuevaVenta.fecha,
        cliente: nuevaVenta.cliente,
        producto: detalle.producto,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precio_unitario,
      },
    ]);
  });
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
      <section className="ventas-instrucciones">
        <div>
          <VentaForm onGuardar={handleGuardarVenta} />
        </div>
        
      </section>
    </div>
  );
};

export default Ventas;