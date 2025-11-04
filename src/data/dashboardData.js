// Mock data generators para el dashboard

export const PERIODS = {
  '7d': '7 días',
  '30d': '30 días', 
  '90d': '90 días',
  '1y': '1 año'
};

// Generadores de datos por período
const generateVisitorsData = (period) => {
  const days = {
    '7d': 7,
    '30d': 8, // Solo mostramos 8 puntos para no saturar
    '90d': 10,
    '1y': 12
  };

  const numDays = days[period] || 8;
  const labels = [];
  const data = [];
  
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    if (period === '1y') {
      labels.push(date.toLocaleDateString('es-ES', { month: 'short' }));
      data.push(Math.floor(Math.random() * 15) + 5); // 5-20 visitantes/mes
    } else {
      labels.push(date.toLocaleDateString('es-ES', { weekday: 'short' }));
      data.push(Math.floor(Math.random() * 4) + 0); // 0-4 visitantes/día
    }
  }

  const total = data.reduce((sum, val) => sum + val, 0);
  const average = total / numDays;

  return {
    labels,
    data,
    total,
    average: parseFloat(average.toFixed(1))
  };
};

const generateParkingData = () => {
  return {
    labels: ['ZONA A - AUTOMOVIL', 'ZONA A - MOTOCICLETA', 'ZONA B - AUTOMOVIL'],
    data: [
      Math.floor(Math.random() * 30) + 20, // 20-50%
      Math.floor(Math.random() * 15) + 5,  // 5-20%
      Math.floor(Math.random() * 40) + 10  // 10-50%
    ]
  };
};

const generateResidentsData = () => {
  // Por piso
  const byFloor = [
    Math.floor(Math.random() * 5) + 2, // Piso 1: 2-6
    Math.floor(Math.random() * 4) + 1, // Piso 2: 1-4  
    Math.floor(Math.random() * 3) + 1, // Piso 3: 1-3
    Math.floor(Math.random() * 2) + 1  // Piso 4: 1-2
  ];

  const total = byFloor.reduce((sum, val) => sum + val, 0);

  // Por tipo (propietario vs inquilino)
  const propietarios = Math.floor(total * 0.6); // 60% propietarios
  const inquilinos = total - propietarios;

  return {
    byFloor: {
      labels: ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4'],
      data: byFloor
    },
    byType: {
      labels: ['Propietario', 'Inquilino'],
      data: [propietarios, inquilinos]
    },
    total,
    occupancy: parseFloat(((total / 16) * 100).toFixed(2)), // Asumiendo 16 unidades
    vehicleRatio: parseFloat((0.7 + (Math.random() * 0.3)).toFixed(2)) // 0.7-1.0
  };
};

// Función principal para obtener todos los datos
export const getDashboardData = (period = '7d') => {
  const visitors = generateVisitorsData(period);
  const parking = generateParkingData();
  const residents = generateResidentsData();
  
  // KPIs principales
  const kpis = {
    parkingOccupancy: parseFloat((parking.data.reduce((sum, val) => sum + val, 0) / 3).toFixed(1)),
    visitorsToday: Math.floor(Math.random() * 5) + 1, // 1-5
    currentVisitors: Math.floor(Math.random() * 3) + 1, // 1-3
    upcomingReservations: Math.floor(Math.random() * 5) + 1 // 1-5
  };

  return {
    period,
    kpis,
    visitors: {
      chartData: {
        labels: visitors.labels,
        datasets: [{
          label: 'Visitantes',
          data: visitors.data,
          borderColor: '#2E7A78',
          backgroundColor: 'rgba(46,122,120,0.25)',
          tension: 0.3,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#2E7A78',
          pointBorderColor: '#2E7A78'
        }]
      },
      stats: {
        total: visitors.total,
        average: visitors.average,
        duration: parseFloat((1.0 + Math.random() * 0.5).toFixed(2)) // 1.0-1.5h
      }
    },
    parking: {
      chartData: {
        labels: parking.labels,
        datasets: [{
          label: 'Ocupación %',
          data: parking.data,
          backgroundColor: ['#4A928E', '#365F5D', '#4A928E'],
          borderWidth: 0
        }]
      }
    },
    residents: {
      floorChart: {
        labels: residents.byFloor.labels,
        datasets: [{
          data: residents.byFloor.data,
          backgroundColor: ['#4A928E', '#527A84', '#89A09C', '#A9BBAF'],
          borderWidth: 0
        }]
      },
      typeChart: {
        labels: residents.byType.labels,
        datasets: [{
          data: residents.byType.data,
          backgroundColor: ['#4A928E', '#89A09C'],
          borderWidth: 0
        }]
      },
      stats: {
        total: residents.total,
        occupancy: residents.occupancy,
        vehicleRatio: residents.vehicleRatio
      }
    }
  };
};

// Función para regenerar datos (simula refresh)
export const refreshDashboardData = (currentPeriod) => {
  return getDashboardData(currentPeriod);
};

// Datos para insights y recomendaciones
export const getInsightsData = () => {
  return {
    parking: {
      title: 'Optimización de Estacionamiento',
      badge: 'normal',
      content: [
        'Ocupación promedio del 25% indica disponibilidad adecuada',
        'No se requieren acciones inmediatas'
      ]
    },
    visitors: {
      title: 'Gestión de Flujo de Visitantes', 
      badge: 'bajo',
      content: [
        'Flujo bajo pero constante de visitantes',
        'Considerar implementar sistema de pre-registro'
      ]
    },
    residential: {
      title: 'Optimización Residencial',
      badge: 'oportunidad',
      content: [
        'Ratio vehículos/residentes sugiere potencial crecimiento',
        'Evaluar disponibilidad de espacios adicionales'
      ]
    }
  };
};

// Datos para resumen ejecutivo
export const getExecutiveSummary = () => {
  return {
    alta: [
      'Revisar sistema de acceso de visitantes',
      'Actualizar directorio de residentes',
      'Verificar funcionamiento de cámaras zona A',
      'Programar mantenimiento preventivo puertas'
    ],
    media: [
      'Evaluar ampliación zona estacionamiento B',
      'Implementar app móvil para reservas',
      'Capacitación personal de seguridad',
      'Optimizar horarios de limpieza común'
    ],
    futura: [
      'Sistema de domótica para áreas comunes',
      'Instalación de cargadores eléctricos',
      'Renovación sistema de intercomunicación',
      'Mejoras en jardín y áreas verdes'
    ]
  };
};

export default {
  PERIODS,
  getDashboardData,
  refreshDashboardData,
  getInsightsData,
  getExecutiveSummary
};