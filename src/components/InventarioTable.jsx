// src/components/InventarioTable.jsx
import React from 'react';

const InventarioTable = ({ productos }) => {
  
  
  return (
    <table className="inventario-table">
      <thead>
        <tr>
          <th>Sku</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio Compra</th>
          <th>Precio Venta</th>
          <th>Cantidad</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(productos) && productos.map((p) => {
         

          return (
            <tr key={p.sku} className={p.stock === 0 ? 'sin-stock' : p.stock < 10 ? 'stock-bajo' : ''}>
              <td>{p.sku}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio_compra}</td>
              <td>${p.precio_venta}</td>
              <td>{p.stock}</td>
              <td>
                {p.stock === 0
                  ? 'Sin stock'
                  : p.stock < 10
                  ? 'Stock bajo'
                  : 'Disponible'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InventarioTable;