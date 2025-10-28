import React, { useState } from 'react';
import axios from 'axios';
import './VentaForm.css';

const PRODUCTOS_API = 'http://127.0.0.1:8000/api/v1/productos/';
const FACTURAS_API = 'http://127.0.0.1:8000/api/v1/facturas/';

const VentaForm = ({ onGuardar }) => {
  const [sku, setSku] = useState('');
  const [productoActual, setProductoActual] = useState(null);
  const [cliente, setCliente] = useState('');
  const [cantidad, setCantidad] = useState('');
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
      
      setProductoActual(res.data);
    } catch (error) {
      console.error('Error al buscar producto:', error);
      alert('Producto no encontrado o no autorizado');
      setProductoActual(null);
    }
  };

  const agregarProducto = () => {
    if (!productoActual || !cantidad) {
      alert('Debes buscar un producto y especificar la cantidad');
      return;
    }

    const cantidadInt = parseInt(cantidad);
    if (productoActual.stock < cantidadInt) {
      alert('Stock insuficiente');
      return;
    }

    const detalle = {
      producto: productoActual.sku,
      cantidad: cantidadInt,
      precio_unitario: parseFloat(productoActual.precio_venta),
    };

    setDetalles([...detalles, detalle]);

    // Actualizar stock en backend
    const nuevoStock = productoActual.stock - cantidadInt;
    const token = localStorage.getItem('access_token');
    axios.put(`${PRODUCTOS_API}${productoActual.sku}/`, {
      ...productoActual,
      stock: nuevoStock,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch((error) => {
      console.error('Error al actualizar stock:', error);
    });

    // Limpiar campos de producto
    setSku('');
    setProductoActual(null);
    setCantidad('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('No estás autenticado. Inicia sesión primero.');
      return;
    }

    if (!cliente || detalles.length === 0) {
      alert('Debes ingresar cliente y al menos un producto');
      return;
    }

    const factura = {
      cliente,
      detalles,
    };

    try {
      const res = await axios.post(FACTURAS_API, factura, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      onGuardar(res.data);

      // Limpiar formulario
      setCliente('');
      setDetalles([]);
    } catch (error) {
      console.error('Error al registrar la factura:', error.response?.data || error.message);
      alert(`Error del servidor: ${JSON.stringify(error.response?.data)}`);
    }
  };

  // ✅ Calcula el total localmente
  const totalVenta = detalles.reduce(
    (acc, item) => acc + item.cantidad * item.precio_unitario,
    0
  );

  const formatearCOP = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);


  return (
    <div className="venta-container">
      <form className="venta-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="SKU del producto"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          onBlur={buscarProducto}
        />

        {productoActual && (
          <div className="producto-form">
            <div className="form-group">
              <label><strong>Producto:</strong></label>
              <input type="text" value={productoActual.nombre} readOnly />
            </div>
            <div className="form-group">
              <label><strong>Precio unitario:</strong></label>
              <input type="text" value={`${formatearCOP(productoActual.precio_venta)}`} readOnly />
            </div>
            <div className="form-group">
              <label><strong>Stock disponible:</strong></label>
              <input type="text" value={productoActual.stock} readOnly />
            </div>
          </div>
        )}

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button type="button" onClick={agregarProducto}>Agregar producto</button>
        <button type="submit" disabled={detalles.length === 0}>Guardar Venta</button>
      </form>

      <div className="tabla-productos">
        {/* ✅ Total mostrado arriba de la tabla */}
        <label className="total-label">
          <strong>Total de la venta:</strong> {formatearCOP(totalVenta.toFixed(2))}
        </label>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {[...detalles].reverse().map((item, index) => (
              <tr key={index}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>{formatearCOP(item.precio_unitario)}</td>
                <td>{formatearCOP(item.cantidad * item.precio_unitario)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VentaForm;