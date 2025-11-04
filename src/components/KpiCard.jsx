import React from 'react';

const KpiCard = ({ value, label, className = "" }) => {
  return (
    <div className={`kpi-card ${className}`}>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
};

export default KpiCard;