import { useEffect, useState } from 'react';
import { formatFecha } from '../../../../utils/format';
import TimelineCmp from '../../../../components/timeline/Timeline';
import './ticketPage.css';

const TicketPage = () => {

    const url = window.location.href;
    const idPage = url.split(':').reverse()[0].toString().padStart(5, '0');
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const obtenerInfoIncidente = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/incidente/informacion-incidente/${idPage}`);
                const incidente = await conexion.json();
                setInfo(incidente.incidente)
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerInfoIncidente();
    }, [])

    const [imagenes, setImagenes] = useState(null);
    
    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/incidente/imagenes-ticket/:${idPage}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const respuesta = await conexion.json();
                setImagenes(respuesta.imagenes);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerImagenes();
    },[])


    const [check, setCheck] = useState(false);

    const handleValidacion = () => {
        if (!check) setCheck(true)
        else setCheck(false)
    }

    const validarTrabajo = async (e) => {
        e.preventDefault();
        const data = {
            ticket: parseInt(idPage)
        }
        if (check) {
            try {
                const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/residente/validar-trabajo', {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                const respuesta = await conexion.json();
                alert(respuesta.message);
                document.location.reload();
            } catch (e) {
                console.error(e.message)
            }
        } else {
            alert('Debe aceptar la validacion')
        }
    }


    return (
        <main className='s_ticket-page'>
            {
                info && <>
                    <section className='s_ticket-page-details'>
                        <article className='s_ticket-details-info'>
                            <header className='s_ticket-details-header'>
                                <h2>Detalle del Ticket #{idPage}</h2>
                                <span className={` ticket-header-prioridad ${info.prioridad_nombre_out.toLowerCase() == "urgente" ? 'estado-rojo' : info.prioridad_nombre_out.toLowerCase() == "medio" ? 'estado-naranja' : 'estado-verde'}`}>
                                    {info.prioridad_nombre_out}
                                </span>
                            </header>
                            <div className='ticket-info-c1'>
                                <div>
                                    <h4>ID del ticket</h4>
                                    <p>{idPage}</p>
                                </div>
                                <div>
                                    <h4>Ubicacion</h4>
                                    <p>{info.ubicacion_out}</p>
                                </div>
                            </div>
                            <div className="ticket-info-c1">
                                <div className='ticket-info-c2'>
                                    <h4>Descripcion</h4>
                                    <p>{info.descripcion_out}</p>
                                </div>
                                <div className='ticket-info-c2'>
                                    <h4>Técnico asignado</h4>
                                    <p>{info.nombres_out ? `${info.nombres_out} ${info.paterno_out} ${info.materno_out}` : 'No tiene un tecnico asignado'}</p>
                                </div>
                            </div>
                            <div className='ticket-info-c3'>
                                <h3>Fotos adjuntas</h3>
                                <div className='ticket-info-c3-images'>
                                    {
                                        imagenes && imagenes.map(imagen => (
                                            <div className="ticket-info-image">
                                                {imagen.tipo_mime == "video/mp4"
                                                    ?
                                                    <video src={`https://lc82mg08-10000.brs.devtunnels.ms/public/images/${imagen.nombre_archivo}`} controls>
                                                    </video>
                                                    :
                                                    <img src={`https://lc82mg08-10000.brs.devtunnels.ms/public/images/${imagen.nombre_archivo}`} alt="Foto 1" />}
                                            </div>
                                        ))
                                    }
                                    {/* <div className="ticket-info-image">

                                        <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrEilm311fNJO_QotjhwgUZmT6oB37xYoYh9ogGU8oczW7zTTzLO2CfjF7j9l0zv1E2sE0R26k3bpbGsmjx5jUByRPw62CskSfB6iNmQc" alt="Foto 1" />
                                    </div>
                                    <div className="ticket-info-image">
                                        <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrEilm311fNJO_QotjhwgUZmT6oB37xYoYh9ogGU8oczW7zTTzLO2CfjF7j9l0zv1E2sE0R26k3bpbGsmjx5jUByRPw62CskSfB6iNmQc" alt="Foto 1" />
                                    </div> */}
                                </div>
                                {/* <Carrusel/> */}
                            </div>
                        </article>
                        <article className='s_ticket-details-resume'>
                            <h3>Resumen del trabajo realizado</h3>
                            <p>{info.resumen_out}</p>
                        </article>
                        <article className='s_ticket-details-validate'>
                            <h3>Validacion y Conformidad</h3>
                            {
                                info.estado_out == 'RESUELTO'
                                    ?
                                    info.firma_valida_out
                                        ?
                                        <p>Se registró su respuesta</p>
                                        :
                                        <>
                                            <div className="ticket-validate-check">
                                                <input type="checkbox" name="validate-incidente" id="validate-incidente" onClick={handleValidacion} />
                                                <p>Usted confirma que el incidente reportado por su persona fue concluido con éxito, lo que hace que el edificio no acepte reclamos futuros con respecto a alguna falla o desperfecto encontrado</p>
                                            </div>
                                            <button onClick={validarTrabajo}>Validar</button>
                                        </>
                                    :
                                    <p>
                                        Podrá validar el trabajo realizado cuando este sea finalizado por el tecnico asignado
                                    </p>
                            }
                        </article>
                    </section>
                    <section className='s_ticket-page-progression'>
                        <article className='s_ticket-progression-state'>
                            <h3>Estado del Ticket</h3>
                            <div className={`ticket-state-c1 ${info.estado_out == "PENDIENTE" ? 'estado-pendiente' : info.estado_out == "EN PROCESO" ? 'estado-naranja' : 'estado-verde'}`}>
                                <div className='ticket-state-c1-c1'>
                                    <h4>{info.estado_out}</h4>
                                    <p>No hay nada</p>
                                </div>
                                <i className={`pi ${info.estado_out == "PENDIENTE" ? 'pi-clock' : info.estado_out == "EN PROCESO" ? 'pi-hammer' : 'pi-check-circle'} ticket-state-icon ${info.estado_out == "PENDIENTE" ? 'estado-pendiente' : info.estado_out == "EN PROCESO" ? 'estado-naranja' : 'estado-verde'}`}></i>
                            </div>
                        </article>
                        <article className='s_ticket-progression-progress'>
                            <h3>Seguimiento del Ticket</h3>
                            <TimelineCmp creacion={formatFecha(info.fecha_creacion_out, '/')}
                                proceso={info.fecha_asignacion_out ? formatFecha(info.fecha_asignacion_out, '/') : '-'}
                                cerrado={info.fecha_cierre_out ? formatFecha(info.fecha_cierre_out, '/') : '-'} />
                        </article>
                    </section>
                </>
            }
        </main>
    )
}

export default TicketPage
