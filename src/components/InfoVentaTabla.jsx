import React from 'react';
import './InfoVentaTabla.css';

const InfoVentasTabla = ({ infoventas }) => {

  const totalGeneral = infoventas.reduce((totalVenta, venta) => {
  const subtotal = venta.detalles.reduce(
    (acc, item) => acc + item.cantidad * item.precio_unitario,
    0
  );
  return totalVenta + subtotal;
}, 0);
  return (
    <div className='venta-container'>
      <label className='total-label'>
          <strong>Total vendido:</strong> ${totalGeneral.toLocaleString()}
      </label>

      <table className='table-infoventas'>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th># Venta</th>
          </tr>
        </thead>
        <tbody>
          {infoventas.flatMap((venta) =>
            venta.detalles.map((item, index) => (
              <tr key={`${venta.numero}-${index}`}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio_unitario.toLocaleString()}</td>
                <td>${(item.cantidad * item.precio_unitario).toLocaleString()}</td>
                <td>{venta.cliente}</td>
                <td>{venta.fecha}</td>
                <td>{venta.numero}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InfoVentasTabla;