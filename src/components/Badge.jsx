import React from 'react';

const Badge = ({ text, type = 'normal', className = "" }) => {
  return (
    <span className={`badge ${type} ${className}`}>
      {text}
    </span>
  );
};

export default Badge;