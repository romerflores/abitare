import React from 'react';
import { Line } from 'react-chartjs-2';

const Visitors = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Flujo de Visitantes Diario',
        font: {
          size: 14,
          weight: 'bold'
        },
        color: '#2D2D2D',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: '#2F5C57',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#2E7A78',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666666',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
          borderDash: [3, 3]
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666666',
          font: {
            size: 12
          },
          stepSize: 1
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
          borderDash: [3, 3]
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 6,
        radius: 4
      },
      line: {
        tension: 0.3
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="section-panel">
      <h3 className="section-title">Análisis de Visitantes</h3>
      
      <div className="chart-container-wide">
        <Line data={data.chartData} options={chartOptions} />
      </div>
      
      <div className="section-kpis">
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.total}</div>
          <div className="section-kpi-label">Total Visitas (período)</div>
        </div>
        
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.average}</div>
          <div className="section-kpi-label">Promedio Diario</div>
        </div>
        
        <div className="section-kpi">
          <div className="section-kpi-value">{data.stats.duration}h</div>
          <div className="section-kpi-label">Duración Promedio</div>
        </div>
      </div>
    </div>
  );
};

export default Visitors;