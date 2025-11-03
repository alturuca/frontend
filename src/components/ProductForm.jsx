import React, { useState, useEffect } from 'react';

const ProductForm = ({ onGuardar, producto, modoEdicion }) => {
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  

  useEffect(() => {
    if (modoEdicion && producto) {
      setSku(producto.sku);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      
      
    } else {
      setSku('');
      setNombre('');
      setDescripcion('');
      
    }
  }, [producto, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sku || !nombre || !descripcion ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const datosProducto = {
      sku: sku.trim(),
      nombre,
      descripcion,
      
    };

    onGuardar(datosProducto);

    setSku('');
    setNombre('');
    setDescripcion('');
    
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3> {modoEdicion ? 'Editar Producto' : 'Registrar Producto'} </h3>

      <div className="form-group">
        <label>SKU</label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Ej. ABC123"
          disabled={modoEdicion} // evitar cambiar SKU en edición
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
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej. Para dama con piel delicada"
        />
      </div>

      

     

      

      <button type="submit">
        {modoEdicion ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
};

export default ProductForm;