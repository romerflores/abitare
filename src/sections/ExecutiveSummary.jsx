import React from 'react';

const ExecutiveSummary = ({ data }) => {
  return (
    <div className="executive-summary">
      <h3 className="section-title mb-lg">Resumen Ejecutivo – Próximas Acciones</h3>
      
      <div className="executive-grid">
        <div className="executive-column">
          <h4>Prioridad Alta (Esta Semana)</h4>
          <ul className="executive-list">
            {data.alta.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="executive-column">
          <h4>Prioridad Media (Este Mes)</h4>
          <ul className="executive-list">
            {data.media.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="executive-column">
          <h4>Mejoras Futuras (Próximos 3 Meses)</h4>
          <ul className="executive-list">
            {data.futura.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;