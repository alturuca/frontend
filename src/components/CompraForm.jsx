
import React, { useState } from 'react';

const CompraForm = ({ onGuardar }) => {
  const [producto, setProducto] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto || !proveedor || !cantidad || !precioUnitario || !fecha) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevaCompra = {
      producto,
      proveedor,
      cantidad: parseInt(cantidad),
      precioUnitario: parseFloat(precioUnitario),
      fecha,
    };

    onGuardar(nuevaCompra);
    setProducto('');
    setProveedor('');
    setCantidad('');
    setPrecioUnitario('');
    setFecha('');
  };

  return (
    <form className="compra-form" onSubmit={handleSubmit}>
      <h3>Registrar nueva compra</h3>

      <input
        type="text"
        placeholder="Producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
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
        placeholder="Precio unitario"
        value={precioUnitario}
        onChange={(e) => setPrecioUnitario(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <button type="submit">Guardar compra</button>
    </form>
  );
};

export default CompraForm;