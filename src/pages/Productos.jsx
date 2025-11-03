import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import './Productos.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/productos/';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
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

  const handleGuardar = async (producto) => {
    try {
      if (modoEdicion) {
        await axios.put(`${API_URL}${producto.sku}/`, producto, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
      } else {
        await axios.post(API_URL, producto, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
      }
      setModoEdicion(false);
      setProductoActual(null);
      fetchProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);
  };

  const handleEliminar = async (sku) => {
    const confirmacion = window.confirm('¿Eliminar este producto?');
    if (confirmacion) {
      try {
        await axios.delete(`${API_URL}${sku}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        fetchProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const handleCerrarSesion = () => {
    navigate('/');
  };

  const handleIrTablero = () => {
    navigate('/dashboard');
  };

  return (
    <div className="productos-page">
      <div className="header-container">
        <h2>Gestión de Productos</h2>
        <section className="header-container-botones">
          <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
          <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
        </section>
      </div>

      <div className="producto-form-container">
        <ProductForm
          onGuardar={handleGuardar}
          producto={productoActual}
          modoEdicion={modoEdicion}
        />
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
           
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.sku}>
              <td>{producto.sku}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              
              <td>
                <button onClick={() => handleEditar(producto)}>✏️</button>
                <button onClick={() => handleEliminar(producto.sku)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;