
import React from 'react';
import './ReporteCard.css';

const ReporteCard = ({ titulo, valor, color }) => {
  return (
    <div className="reporte-card" style={{ borderLeft: `6px solid ${color}` }}>
      <h3>{titulo}</h3>
      <p>{valor}</p>
    </div>
  );
};

export default ReporteCard;