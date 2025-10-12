import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/productos/';

const VentaForm = ({ onGuardar }) => {
  const [sku, setSku] = useState('');
  const [producto, setProducto] = useState(null);
  const [cliente, setCliente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');

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
    const res = await axios.get(`${API_URL}${cleanSku}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducto(res.data);
  } catch (error) {
    console.error('Error al buscar producto:', error);
    alert('Producto no encontrado o no autorizado');
    setProducto(null);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('No estás autenticado. Inicia sesión primero.');
      return;
    }

    if (!producto || !cliente || !cantidad || !fecha) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevaCantidad = parseInt(cantidad);
    if (producto.stock < nuevaCantidad) {
      alert('Stock insuficiente');
      return;
    }

    const nuevaVenta = {
      producto: producto.nombre,
      cliente,
      cantidad: nuevaCantidad,
      precioUnitario: parseFloat(producto.precio_venta),
      fecha,
    };

    onGuardar(nuevaVenta);

    // Reducir stock en el backend
    const nuevoStock = producto.stock - nuevaCantidad;
    try {
      await axios.put(`${API_URL}${sku}/`, {
        ...producto,
        stock: nuevoStock,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      alert('No se pudo actualizar el stock');
      return;
    }

    // Limpiar formulario
    setSku('');
    setProducto(null);
    setCliente('');
    setCantidad('');
    setFecha('');
  };

  return (
    <form className="venta-form" onSubmit={handleSubmit}>
      <h3>Registrar nueva venta</h3>

      <input
        type="text"
        placeholder="SKU del producto"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        onBlur={buscarProducto}
      />

      {producto && (
        <div className="producto-info">
          <p><strong>Producto:</strong> {producto.nombre}</p>
          <p><strong>Precio unitario:</strong> ${producto.precio_venta}</p>
          <p><strong>Stock disponible:</strong> {producto.stock}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <button type="submit">Guardar venta</button>
    </form>
  );
};

export default VentaForm;