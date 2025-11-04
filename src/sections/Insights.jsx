import React from 'react';
import Badge from '../components/Badge';

const Insights = ({ data }) => {
  const getBadgeType = (badge) => {
    switch(badge) {
      case 'normal': return 'normal';
      case 'bajo': return 'bajo';
      case 'oportunidad': return 'oportunidad';
      default: return 'normal';
    }
  };

  return (
    <div>
      <h3 className="section-title mb-lg">Análisis Inteligente y Recomendaciones</h3>
      
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-header">
            <h4 className="insight-title">{data.parking.title}</h4>
            <Badge text={data.parking.badge.toUpperCase()} type={getBadgeType(data.parking.badge)} />
          </div>
          <div className="insight-content">
            {data.parking.content.map((text, index) => (
              <p key={index} className={index > 0 ? 'mb-sm' : ''}>{text}</p>
            ))}
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h4 className="insight-title">{data.visitors.title}</h4>
            <Badge text={data.visitors.badge.toUpperCase()} type={getBadgeType(data.visitors.badge)} />
          </div>
          <div className="insight-content">
            {data.visitors.content.map((text, index) => (
              <p key={index} className={index > 0 ? 'mb-sm' : ''}>{text}</p>
            ))}
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h4 className="insight-title">{data.residential.title}</h4>
            <Badge text={data.residential.badge.toUpperCase()} type={getBadgeType(data.residential.badge)} />
          </div>
          <div className="insight-content">
            {data.residential.content.map((text, index) => (
              <p key={index} className={index > 0 ? 'mb-sm' : ''}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;