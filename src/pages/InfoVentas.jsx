import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoVentasTabla from "../components/InfoVentaTabla";
import { useNavigate } from "react-router-dom";
import BotonCerrarSesion from "../components/BotonCerrarSesion";
import './InfoVentas.css';



const API_URL = 'http://127.0.0.1:8000/api/v1/facturas/';

const InfoVentas = () => {
    const [infoventas, setInfoVentas] = useState([]);
    const navigate = useNavigate();

    const fetchInfoVentas = async () => {
        try {
            const res = await axios.get(API_URL, {
                headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(res.data);
      setInfoVentas(res.data);
        } catch (error) {
            console.error('Error al obtener información de ventas:', error);
        }
    };

    useEffect(() => {
      fetchInfoVentas();
    }, []);

    const handleCerrarSesion = () => {
    navigate('/');

  };

  const handleIrTablero = () => {
    navigate('/dashboard');

  };



    return (
        <div className="venta-pages">
          <div className='header-container'>

            <h2>Información de Ventas</h2>
            <section className='header-container-botones'>
              <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
              <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
            </section>
            
          </div>
       
            <InfoVentasTabla infoventas={infoventas} />
        </div>
    );

};


export default InfoVentas;