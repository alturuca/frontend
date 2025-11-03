
import React from 'react';
import './ReporteCard.css';

const ReporteCard = ({ titulo, valor, color, onClick }) => {
  return (
    <div className="reporte-card" style={{ borderLeft: `6px solid ${color}` }} onClick={onClick}>
      <h3>{titulo}</h3>
      <p>{valor}</p>
    </div>
  );
};

export default ReporteCard;