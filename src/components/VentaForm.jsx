// src/components/VentaForm.jsx
import React, { useState } from 'react';

const VentaForm = ({ onGuardar }) => {
  const [producto, setProducto] = useState('');
  const [cliente, setCliente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto || !cliente || !cantidad || !precioUnitario || !fecha) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevaVenta = {
      producto,
      cliente,
      cantidad: parseInt(cantidad),
      precioUnitario: parseFloat(precioUnitario),
      fecha,
    };

    onGuardar(nuevaVenta);
    setProducto('');
    setCliente('');
    setCantidad('');
    setPrecioUnitario('');
    setFecha('');
  };

  return (
    <form className="venta-form" onSubmit={handleSubmit}>
      <h3>Registrar nueva venta</h3>

      <input
        type="text"
        placeholder="Producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
      />
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
        type="number"
        placeholder="Precio unitario"
        value={precioUnitario}
        onChange={(e) => setPrecioUnitario(e.target.value)}
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