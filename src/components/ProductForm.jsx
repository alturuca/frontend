import React, { useState, useEffect } from 'react';

const ProductForm = ({ onGuardar, producto, modoEdicion }) => {
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (modoEdicion && producto) {
      setSku(producto.sku);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecioCompra(producto.precio_compra);
      setPrecioVenta(producto.precio_venta);
      setStock(producto.stock);
    } else {
      setSku('');
      setNombre('');
      setDescripcion('');
      setPrecioCompra('');
      setPrecioVenta('');
      setStock('');
    }
  }, [producto, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sku || !nombre || !descripcion || !precioCompra || !precioVenta || !stock) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const datosProducto = {
      sku: sku.trim(),
      nombre,
      descripcion,
      precio_compra: parseFloat(precioCompra),
      precio_venta: parseFloat(precioVenta),
      stock: parseInt(stock),
    };

    onGuardar(datosProducto);

    setSku('');
    setNombre('');
    setDescripcion('');
    setPrecioCompra('');
    setPrecioVenta('');
    setStock('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{modoEdicion ? 'Editar Producto' : 'Registrar Producto'}</h3>

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

      <div className="form-group">
        <label>Precio Compra</label>
        <input
          type="number"
          value={precioCompra}
          onChange={(e) => setPrecioCompra(e.target.value)}
          placeholder="Ej. 2500"
        />
      </div>

      <div className="form-group">
        <label>Precio Venta</label>
        <input
          type="number"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(e.target.value)}
          placeholder="Ej. 3000"
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