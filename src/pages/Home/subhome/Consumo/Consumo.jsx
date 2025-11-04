import RegistroConsumo from './RegistroConsumo';
import Dashboard from './Dashboard';
import './consumo.css';

/* const INITIAL_REGISTROS = [
    // --- DEP-A101 - Agua (Febrero 2024) ---
    { departamento: 'DEP-A101', fechaRegistro: '2024-02-01', servicio: 'agua', medidaRegistro: 15.5, costoPorMedida: 1.5, totalConsumo: 23.25 },
    { departamento: 'DEP-A101', fechaRegistro: '2024-02-15', servicio: 'agua', medidaRegistro: 20.0, costoPorMedida: 1.5, totalConsumo: 30.00 },
    { departamento: 'DEP-A101', fechaRegistro: '2024-02-28', servicio: 'agua', medidaRegistro: 18.2, costoPorMedida: 1.5, totalConsumo: 27.30 },

    // --- DEP-A101 - Luz (Marzo 2024) ---
    { departamento: 'DEP-A101', fechaRegistro: '2024-03-05', servicio: 'luz', medidaRegistro: 55.0, costoPorMedida: 0.8, totalConsumo: 44.00 },
    { departamento: 'DEP-A101', fechaRegistro: '2024-03-20', servicio: 'luz', medidaRegistro: 65.5, costoPorMedida: 0.8, totalConsumo: 52.40 },

    // --- Santa Cruz - Gas (Marzo 2024) ---
    { departamento: 'Santa Cruz', fechaRegistro: '2024-03-01', servicio: 'gas', medidaRegistro: 12.0, costoPorMedida: 2.2, totalConsumo: 26.40 },
    { departamento: 'Santa Cruz', fechaRegistro: '2024-03-10', servicio: 'gas', medidaRegistro: 15.0, costoPorMedida: 2.2, totalConsumo: 33.00 },
    { departamento: 'Santa Cruz', fechaRegistro: '2024-03-10', servicio: 'gas', medidaRegistro: 5.0, costoPorMedida: 2.2, totalConsumo: 11.00 }, // Dos registros el mismo día para probar la suma

    // --- Cochabamba - Agua (Febrero y Marzo 2024 - Para vista mensual) ---
    { departamento: 'Cochabamba', fechaRegistro: '2024-02-10', servicio: 'agua', medidaRegistro: 30.0, costoPorMedida: 1.5, totalConsumo: 45.00 },
    { departamento: 'Cochabamba', fechaRegistro: '2024-03-10', servicio: 'agua', medidaRegistro: 35.0, costoPorMedida: 1.5, totalConsumo: 52.50 },
];
 */

function Consumo() {

    return (
        <div className="app-container">
            <h1>Registro y Dashboard de Consumo de Servicios</h1>

            <section className="registro-section">
                <h2>Nuevo Registro de Consumo</h2>
                <RegistroConsumo/>
            </section>

            <hr className="divider" />

            <section className="dashboard-section">
                <h2>📊 Dashboard de Consumo Histórico</h2>
                {/* Pasamos todos los registros al Dashboard */}
                <Dashboard /* registros={INITIAL_REGISTROS} */ />
            </section>

        </div>
    );
}

export default Consumo;