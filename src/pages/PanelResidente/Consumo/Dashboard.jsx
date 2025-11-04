import { useState, useMemo, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { formatFecha } from '../../../utils/format';

function Dashboard({ id }) {

    const [registros, setRegistros] = useState(null);
    /* const [departamentos, setDepartamentos] = useState(null); */
    const [filtro, setFiltro] = useState({
        departamento: id,
        servicio: 'agua',
        periodo: 'diario', // 'diario' o 'mensual'
    });

    useEffect(() => {
        const obtenerRegistros = async () => {
            try {
                const conexion = await fetch(`http://localhost:10000/api/consumo/registros-diarios/:${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const respuesta = await conexion.json();
                if (!conexion.ok) throw new Error(respuesta.message);
                setRegistros(respuesta.consumo);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerRegistros();
    }, [])

    const handleChange = (e) => {
        setFiltro(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Lógica de filtrado y agregación optimizada con useMemo
    const dataGrafico = useMemo(() => {

        if (!registros) return [];

        // 1. Filtrar por Departamento y Servicio
        const registrosFiltrados = registros.filter(reg => 
            reg.nombre_out === filtro.servicio
        );

        if (registrosFiltrados.length === 0) return [];

        const datosAgregados = {};

        registrosFiltrados.forEach(reg => {
            const fecha = formatFecha(reg.fecha_out); // YYYY-MM-DD
            let clave;

            if (filtro.periodo === 'diario') {
                // Eje X: Fecha
                clave = fecha;
            } else {
                // Eje X: Mes (YYYY-MM)
                clave = fecha.substring(0, 7);
            }

            // Sumar la medida consumida (Eje Y)
            if (!datosAgregados[clave]) {
                datosAgregados[clave] = {
                    clave: clave,
                    consumo: 0
                };
            }
            datosAgregados[clave].consumo += parseFloat(reg.medida_out);
        });
        return Object.values(datosAgregados).sort((a, b) => a.clave.localeCompare(b.clave));

    }, [registros, filtro]);


    return (
        (!registros)
            ?
            <p className="loading-data"></p>
            : <div className="dashboard-container">
                <div className="filtro-area">
                    <div className="form-group">
                        <label htmlFor="departamento">Departamento:</label>
                        <input type="text" id='departamento' disabled value={id} />
                    </div>
                    {/* Filtro por Servicio */}
                    <div className="form-group-dash">
                        <label htmlFor="serv-filtro">Servicio:</label>
                        <select id="serv-filtro" name="servicio" value={filtro.servicio} onChange={handleChange}>
                            <option value="agua">Agua 💧</option>
                            <option value="luz">Luz 💡</option>
                            <option value="gas">Gas 🔥</option>
                        </select>
                    </div>

                    {/* Filtro por Periodo (Diario/Mensual) */}
                    <div className="form-group-dash">
                        <label htmlFor="periodo-filtro">Periodo:</label>
                        <select id="periodo-filtro" name="periodo" value={filtro.periodo} onChange={handleChange}>
                            <option value="diario">Diario (Fecha)</option>
                            <option value="mensual">Mensual (Mes)</option>
                        </select>
                    </div>
                </div>

                <div className="grafico-area">
                    <h3>
                        Consumo {filtro.periodo === 'diario' ? 'Diario' : 'Mensual'} de {filtro.servicio.toUpperCase()} en {filtro.departamento}
                    </h3>

                    {dataGrafico.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={dataGrafico}
                                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* Eje X: Clave (Fecha o Mes) */}
                                <XAxis dataKey="clave" />
                                {/* Eje Y: Cantidad Consumida */}
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [value, 'Consumo Total']} //`${value.toFixed(2)}`
                                    labelFormatter={(label) => filtro.periodo === 'diario' ? `Día: ${label}` : `Mes: ${label}`}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="consumo"
                                    stroke="#007bff"
                                    activeDot={{ r: 8 }}
                                    name={`Consumo de ${filtro.servicio}`}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="no-data">
                            Aún no hay datos registrados para el departamento seleccionado.
                        </p>
                    )}
                </div>
            </div>
    );
}

export default Dashboard;