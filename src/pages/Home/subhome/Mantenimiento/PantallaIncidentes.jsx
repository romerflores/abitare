import './pantallaIncidente.css';

import { useEffect, useState } from "react"
import { formatFecha, formatId, formatNombre } from "../../../../utils/format";
import { determinarColorPrioridad, determinarColorEstado } from "../../../../utils/funciones";
import { Link } from 'react-router';

const PantallaIncidentes = () => {
    const [incidentes, setIncidentes] = useState(null);

    useEffect(() => {
        const obtenerIncidentes = async () => {
            try {
                const conexion = await fetch('http://localhost:10000/api/administrador/obtener-incidentes');
                if (conexion.status == 404) return;
                const respuesta = await conexion.json();
                setIncidentes(respuesta.incidentes);
            } catch (e) {
                alert('No se pudo establecer conexion');
            }
        }
        obtenerIncidentes();
    }, []);


    return (
        <main className='s_admin-incidentes'>
            <h1 className='admin-incidentes-title'>Incidentes Registrados</h1>
            <div className='admin-incidentes-cards'>
                {incidentes ? incidentes.map((item, key) => (
                    <article key={key} className='admin-cards-card'>
                        <header className='admin-card-header'>
                            <h2>{item.titulo_out}</h2>
                            {/* <i className='pi pi-hammer'></i> */}
                        </header>
                        <section className='admin-card-opt'>
                            <h3>Ticket: {formatId(item.ticket_out, 3)}</h3>
                            <Link to={`incidentes/:${item.ticket_out}`}>
                                <button className='admin-opt-btn'>Ver más</button>
                            </Link>
                        </section>
                        <section className='admin-card-info'>
                            <h4>Registrado por: <span className='admin-info-span'>{formatNombre(item.nombre_residente_out, item.paterno_residente_out, item.materno_residente_out)}</span></h4>
                            <h5>Fecha registro: <span className='admin-info-span'>{formatFecha(item.fecha_creacion)}</span></h5>
                            {/* <h4>Tecnico asignado: {item.nombre_tecnico_out ?formatNombre(item.nombre_tecnico_out, item.paterno_tecnico_out, item.materno_tecnico_out): 'No asignado'}</h4> */}
                        </section>
                        <section className='admin-card-state'>
                            <span className={`${determinarColorPrioridad(item.prioridad_out)}`}>{item.prioridad_out.toLowerCase()}</span>
                            <span className={`${determinarColorEstado(item.estado_out)}`}>{item.estado_out.toLowerCase()}</span>
                        </section>
                    </article>
                )) :
                    <h3>No se encontraron incidentes registrados</h3>
                }
            </div>
        </main>
    )
}

export default PantallaIncidentes
