// src/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import './Productos.css';
import BotonCerrarSesion from '../components/BotonCerrarSesion';
import { useNavigate } from 'react-router-dom';


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const navigate = useNavigate();

  // Simulación de carga inicial
  useEffect(() => {
    const productosMock = [
      { id: 1, plu: 456789, nombre: 'Botella PET 500ml', descripcion: 'tipo personal', costo: 1200, venta: 1600, stock: 50 },
      { id: 2, plu: 890098, nombre: 'Papel térmico', descripcion: 'transparente', costo: 800, venta:1000, stock: 20 },
    ];
    setProductos(productosMock);
  }, []);

  const handleGuardar = (producto) => {
    if (modoEdicion) {
      setProductos(productos.map(p => p.id === producto.id ? producto : p));
      setModoEdicion(false);
      setProductoActual(null);
    } else {
      const nuevoId = productos.length + 1;
      setProductos([...productos, { ...producto, id: nuevoId }]);
    }
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm('¿Eliminar este producto?');
    if (confirmacion) {
      setProductos(productos.filter(p => p.id !== id));
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
      <div className='header-container'>      
        <h2>Gestión de Productos</h2>
        <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
        </section>
      </div>
      
      
      <ProductForm
        onGuardar={handleGuardar}
        producto={productoActual}
        modoEdicion={modoEdicion}
      />

      <table className="productos-table">
        <thead>
          <tr>
            <th>Plu</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.plu}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.costo}</td>
              <td>{producto.venta}</td>
              <td>{producto.stock}</td>
              
              <td>
                <button onClick={() => handleEditar(producto)}>✏️</button>
                <button onClick={() => handleEliminar(producto.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;