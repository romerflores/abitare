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
import { formatFecha } from '../../../../utils/format';

function Dashboard() {

    const [registros, setRegistros] = useState();
    const [departamentos, setDepartamentos] = useState(null);
    const [filtro, setFiltro] = useState({
        departamento: departamentos && departamentos[0].id_departamento,
        servicio: 'agua',
        periodo: 'diario', // 'diario' o 'mensual'
    });

    useEffect(() => {
        const obtenerRegistros = async () => {
            try {
                const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/consumo/registros-diarios', {
                    method: 'GET',
                    credentials: 'include'
                });
                const respuesta = await conexion.json();
                if (!conexion.ok) throw new Error(respuesta.message);
                setRegistros(respuesta.consumos);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerRegistros();
    }, [])

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/obtener-departamentos');
                const respuesta = await conexion.json();
                if (!conexion.ok) throw new Error(respuesta.message);
                setDepartamentos(respuesta.departamentos);
            } catch (e) {
                alert(e.message);
            }
        }
        obtenerDepartamentos();
    }, [])

    useEffect(() => {
        // Solo se ejecuta si hay departamentos cargados y el filtro.departamento está vacío (primera carga)
        if (departamentos && departamentos.length > 0 && filtro.departamento === '') {
            setFiltro(prev => ({
                ...prev,
                // Usamos el ID del primer departamento como valor por defecto
                departamento: departamentos[0].id_departamento,
            }));
        }
    }, [departamentos]);


    const handleChange = (e) => {
        setFiltro(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Lógica de filtrado y agregación optimizada con useMemo
    const dataGrafico = useMemo(() => {

        if (!registros ) return [];

        // 1. Filtrar por Departamento y Servicio
        const registrosFiltrados = registros.filter(reg =>
            reg.departamento === filtro.departamento &&
            reg.servicio === filtro.servicio
        );

        if (registros && registrosFiltrados.length === 0) return [];

        const datosAgregados = {};

        registrosFiltrados.forEach(reg => {
            const fecha = formatFecha(reg.fecha_registro); // YYYY-MM-DD
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
            datosAgregados[clave].consumo += parseFloat(reg.medida_total);
        });
        return Object.values(datosAgregados).sort((a, b) => a.clave.localeCompare(b.clave));

    }, [registros, filtro]);


    return (
        (!registros || !departamentos)
            ?
            <p className="loading-data"></p>
            : <div className="dashboard-container">
                <div className="filtro-area">
                    {/* Filtro por Departamento */}
                    <div className="form-group-dash">
                        <label htmlFor="dep-filtro">Departamento:</label>
                        <select id="dep-filtro" name="departamento" value={filtro.departamento} onChange={handleChange}>
                            <option value="">Seleccione un departamento</option>
                            {departamentos && departamentos.map(dep => (
                                <option key={dep.id_departamento} value={dep.id_departamento}>{dep.id_departamento}</option>
                            ))}
                        </select>
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