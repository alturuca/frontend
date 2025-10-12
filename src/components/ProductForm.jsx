// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ onGuardar, producto, modoEdicion }) => {
  const [plu, setPlu] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [venta, setVenta] = useState('');
  const [stock, setStock] = useState('');
  

  useEffect(() => {
    if (modoEdicion && producto) {
      setPlu(producto.plu);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setCosto(producto.costo);
      setVenta(producto.venta)
      setStock(producto.stock);
      
    } else {
      setPlu('');
      setNombre('');
      setDescripcion('');
      setCosto('');
      setVenta(''),
      setStock('');
      
    }
  }, [producto, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plu || !nombre || !descripcion || !costo  || !venta|| !stock) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const datosProducto = {
      id: producto?.id || null,
      plu: parseInt(plu),
      nombre,
      descripcion,
      costo: parseFloat(costo),
      venta: parseFloat(venta),
      stock: parseInt(stock),
      
    };

    onGuardar(datosProducto);
    setPlu('');
    setNombre('');
    setDescripcion('');
    setCosto('');
    setVenta('');
    setStock('');
    
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{modoEdicion ? 'Editar Producto' : 'Registrar Producto'}</h3>

      <div className="form-group">
        <label>Plu</label>
        <input
          type="number"
          value={plu}
          onChange={(e) => setPlu(e.target.value)}
          placeholder="Ej. 678901"
        />
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Jabón líquido"
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Para dama con piel delicada"
        />
      </div>

      <div className="form-group">
        <label>Costo</label>
        <input
          type="number"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          placeholder="Ej. 2500"
        />
      </div>

      <div className="form-group">
        <label>Venta</label>
        <input
          type="number"
          value={venta}
          onChange={(e) => setVenta(e.target.value)}
          placeholder="Ej. 2500"
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Ej. 100"
        />
      </div>

      <button type="submit">
        {modoEdicion ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
};

export default ProductForm;