import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Residents = ({ data }) => {
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#666666',
          font: {
            size: 12
          },
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: '#2F5C57',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#2E7A78',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true
      }
    }
  };

  return (
    <div className="section-panel section-full">
      <h3 className="section-title">Análisis de Residentes</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#2D2D2D' }}>
            Distribución por Piso
          </h4>
          <div style={{ height: '200px' }}>
            <Doughnut data={data.floorChart} options={doughnutOptions} />
          </div>
        </div>
        
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#2D2D2D' }}>
            Tipos de Residentes
          </h4>
          <div style={{ height: '200px' }}>
            <Doughnut data={data.typeChart} options={doughnutOptions} />
          </div>
        </div>
      </div>
      
      <div className="section-kpis">
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.total}</div>
          <div className="section-kpi-label">Total Residentes</div>
        </div>
        
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.occupancy}%</div>
          <div className="section-kpi-label">Ocupación</div>
        </div>
        
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.vehicleRatio}</div>
          <div className="section-kpi-label">Ratio Vehículos/Residentes</div>
        </div>
      </div>
    </div>
  );
};

export default Residents;