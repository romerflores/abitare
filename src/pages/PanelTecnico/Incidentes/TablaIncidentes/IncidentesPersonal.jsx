import { useState, useEffect } from "react";
import { formatFecha, formatId, formatNombreTecnico } from '../../../../utils/format';
import { Link } from 'react-router';
import InputForm from '../../../../components/inputAF/InputForm'
import Select from '../../../../components/select/Select';

const IncidentesPersonal = () => {
    const [search, setSearch] = useState('');
    const [prioridad, setPrioridad] = useState('')
    const [estado, setEstado] = useState('');
    const [filas, setFilas] = useState(null);

    /* Se obtienen del localstorage o simplemente de descomponer la cookie */
    const idTecnico = localStorage.getItem('id') || 5;

    useEffect(() => {
        const obtenerIncidentes = async () => {
            try {
                const conexion = await fetch(`https://abitare-back-production.up.railway.app/api/tecnico/obtener-registros/${idTecnico}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!conexion) throw new Error("Error al realizar la conexion con el servidor");
                const respuesta = await conexion.json();
                setFilas(respuesta.incidentes);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerIncidentes();
    },[])

    const titulosTabla = ['ID', 'TITULO', 'FECHA', 'PRIORIDAD', 'ESTADO', 'RESIDENTE'];

    return (
        <main className='s_tickets'>
            {filas ? <div className="s_tickets-container">
                <header className='tickets-header'>
                    <h1>Incidentes asignados</h1>
                </header>
                <section className="tickets-tickets">
                    <div className="tickets-tickets-options">
                        <div className="tickets-options-search">
                            <InputForm input_id={'search'} input_name={'search'} input_placeholder={'Buscar por ID, Titulo ...'} input_type={'text'} input_value={search} set_input_value={setSearch} className={'search-input'} />
                        </div>
                        <div className="tickets-options-order">
                            <Select default_option={'Prioridad'} options={['Urgente', 'Alto', 'Medio', 'Bajo']} select_id={'prioridad'} select_name={'prioridad'} select_set_value={setPrioridad} select_value={prioridad} className={'select-search'} />
                            <Select default_option={'Estado'} options={['Pendiente', 'En proceso', 'Resuelto']} select_id={'estado'} select_name={'estado'} select_set_value={setEstado} select_value={estado} className={'select-search'} />
                        </div>
                    </div>
                    <div className="tabla-container">
                        <table className='tickets-tickets-info'>
                            <thead className='tickets-info-header'>
                                <tr>
                                    {titulosTabla.map(e => (
                                        <th className='tickets-header-head'>{e}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='tickets-info-body'>
                                {filas.map(fila => (
                                    <tr>
                                        <td>
                                            <Link to={`reporte-info/:${fila.ticket_out}`} style={{ textDecoration: 'none' }}>
                                                <span className='tickets-body-id'>{formatId(fila.ticket_out)}</span>
                                            </Link>
                                        </td>
                                        <td>{fila.titulo_out}</td>
                                        <td>{formatFecha(fila.fecha_creacion_out)}</td>
                                        <td><span className={`tickets-body-field ${fila.prioridad_nombre_out.toLowerCase() == "urgente" ? 'estado-rojo' : fila.prioridad_nombre_out.toLowerCase() == "medio" ? 'estado-naranja' : 'estado-verde'}`}>{fila.prioridad_nombre_out}</span></td>
                                        <td><span className={`tickets-body-field ${fila.estado_out == "PENDIENTE" ? 'estado-pendiente' : fila.estado_out == "EN PROCESO" ? 'estado-naranja' : 'estado-verde'}`}>{fila.estado_out}</span></td>
                                        <td>{!fila.nombres_out ? 'No asignado' : formatNombreTecnico(fila.nombres_out, fila.paterno_out, fila.materno_out)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
                :
                <>
                    <div className="s_tickets-container">
                        <header className='tickets-header'>
                            <h1>Incidentes asignados</h1>
                        </header>
                        <section className="tickets-tickets" style={{ padding: '20px' }}>
                            <h2>No hay incidentes asignados para usted</h2>
                        </section>
                    </div>
                </>}
        </main> 
  )
}

export default IncidentesPersonal
