import React, { useState } from 'react';
import axios from 'axios';

const PRODUCTOS_API = 'http://127.0.0.1:8000/api/v1/productos/';
const INGRESO_API = 'http://127.0.0.1:8000/api/v1/ingreso/';

const CompraForm = ({ onGuardar }) => {
  const [sku, setSku] = useState('');
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [detalles, setDetalles] = useState([]);

  const buscarProducto = async () => {
    const cleanSku = sku.trim();
    if (!cleanSku) {
      alert('Debes ingresar un SKU válido');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('No estás autenticado. Inicia sesión primero.');
      return;
    }

    try {
      const res = await axios.get(`${PRODUCTOS_API}${cleanSku}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducto(res.data);
    } catch (error) {
      console.error('Error al buscar producto:', error);
      alert('Producto no encontrado o no autorizado');
      setProducto(null);
    }
  };

  const agregarProducto = () => {
    if (!producto || !cantidad || !precioCompra) {
      alert('Debes buscar un producto y completar todos los campos');
      return;
    }

    
    const precioFloat = parseFloat(precioCompra);
      if (isNaN(precioFloat) || precioFloat <= 0) {
        alert('El precio de compra debe ser un número mayor que cero');
        return;
      }

    const detalle = {
      sku: sku,
      cantidad: parseInt(cantidad),
      precio_compra: parseFloat(precioCompra),
    };

    setDetalles([...detalles, detalle]);

    // Limpiar campos
    setSku('');
    
    setPrecioCompra('');
    setProducto(null);
    setCantidad('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('No estás autenticado. Inicia sesión primero.');
      return;
    }

    if (!proveedor || detalles.length === 0) {
      alert('Debes ingresar proveedor y al menos un producto');
      return;
    }

    const ingreso = {
      proveedor,
      detalles,
    };

    try {
      const res = await axios.post(INGRESO_API, ingreso, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Ingreso registrado:', res.data);

      onGuardar(res.data);

      // Limpiar formulario
      setProveedor('');
      setDetalles([]);
    } catch (error) {
      console.error('Error al registrar la compra:', error.response?.data || error.message);
      alert(`Error del servidor: ${JSON.stringify(error.response?.data)}`);
    }
  };

  return (
    <form className="compra-form" onSubmit={handleSubmit}>
      <h3>Registrar nueva compra</h3>

      <input
        type="text"
        placeholder="SKU del producto"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        onBlur={buscarProducto}
      />
      <input
        type="text"
        placeholder="Proveedor"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio Comprra"
        value={precioCompra}
        onChange={(e) => setPrecioCompra(e.target.value)}
      />

      
      <button type="button" onClick={agregarProducto}>Agregar producto</button>
      <button type="submit" disabled={detalles.length === 0}>Guardar ingreso</button>

      {/* Mostrar productos agregados */}
      {detalles.length > 0 && (
        <ul>
          {detalles.map((item, index) => (
            <li key={index}>
              SKU: {item.sku}, Cantidad: {item.cantidad}, Precio compra: ${item.precio_compra}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default CompraForm;