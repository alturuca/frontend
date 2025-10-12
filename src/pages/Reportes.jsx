
import React, { useEffect, useState } from 'react';
import ReporteCard from '../components/ReporteCard';
import './Reportes.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { useNavigate } from 'react-router-dom';


const Reportes = () => {
  const [datos, setDatos] = useState({});
  const navigate = useNavigate();

  



  useEffect(() => {
    // Simulación de datos desde backend
    const mockData = {
      ventasTotales: 125000,
      comprasTotales: 87000,
      productosVendidos: 320,
      productosBajoStock: 12,
    };

    const utilidadBruta = mockData.ventasTotales - mockData.comprasTotales;


    setDatos({ ...mockData, utilidadBruta });
  }, []);
const handleCerrarSesion = () => {
  navigate('/');

};

const handleIrTablero = () => {
  navigate('/dashboard');

};

  return (
    <div className="reportes-page">
      <div className='header-container' >
        <h2>Resumen de Actividad</h2>
        <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
          </section>        
      </div>
      <div className="reportes-grid">
        <ReporteCard titulo="Ventas Totales" valor={`$${datos.ventasTotales}`} color="#4caf50" />
        <ReporteCard titulo="Compras Totales" valor={`$${datos.comprasTotales}`} color="#2196f3" />
        <ReporteCard titulo="Utilidad Bruta" valor={`$${datos.utilidadBruta}`} color="#9c27b0" />
        <ReporteCard titulo="Productos Vendidos" valor={datos.productosVendidos} color="#ff9800" />
        <ReporteCard titulo="Stock Bajo" valor={datos.productosBajoStock} color="#f44336" />
      </div>
    </div>
  );
};

export default Reportes;