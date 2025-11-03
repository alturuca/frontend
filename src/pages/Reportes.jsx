

import ReporteCard from '../components/ReporteCard';
import './Reportes.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { useNavigate } from 'react-router-dom';


const Reportes = () => {
 
  const navigate = useNavigate();

  

  



  
const handleCerrarSesion = () => {
  navigate('/');

};

const handleIrTablero = () => {
  navigate('/dashboard');

};

const handleIrInfoVentas = () => {
  navigate('/infoventas');
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
        <ReporteCard titulo="Ventas Totales" onClick={handleIrInfoVentas} color="#4caf50" />
        <ReporteCard titulo="Compras Totales"  color="#2196f3" />
        <ReporteCard titulo="Utilidad Bruta"  color="#9c27b0" />
        <ReporteCard titulo="Productos Vendidos"  color="#ff9800" />
        <ReporteCard titulo="Stock Bajo"  color="#f44336" />
      </div>
    </div>
  );
};

export default Reportes;