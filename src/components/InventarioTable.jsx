// src/components/InventarioTable.jsx
import React from 'react';

const InventarioTable = ({ productos }) => {
  return (
    <table className="inventario-table">
      <thead>
        <tr>
          <th>Sku</th>
          <th>nombre</th>
          <th>descripcion</th>
          <th>Precio Venta</th>
          <th>Precio Compra</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id} className={p.stock === 0 ? 'sin-stock' : p.stock < 10 ? 'stock-bajo' : ''}>
            <td>{p.sku}</td>
            <td>{p.nombre}</td>
            <td>{p.descripcion}</td>
            <td>${p.precioVenta}</td>
            <td>${p.precioCompra}</td>
            <td>
              {p.stock === 0
                ? 'Sin stock'
                : p.stock < 10
                ? 'Stock bajo'
                : 'Disponible'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventarioTable;