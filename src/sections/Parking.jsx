import React from 'react';
import { Bar } from 'react-chartjs-2';

const Parking = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ocupación por Zona y Tipo',
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
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Ocupación: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666666',
          font: {
            size: 10
          },
          maxRotation: 0
        },
        grid: {
          display: false
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#666666',
          font: {
            size: 12
          },
          callback: function(value) {
            return value + '%';
          }
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
    barThickness: 60,
    categoryPercentage: 0.8,
    barPercentage: 0.9
  };

  return (
    <div className="section-panel">
      <h3 className="section-title">Análisis de Estacionamiento</h3>
      
      <div className="chart-container-wide">
        <Bar data={data.chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Parking;