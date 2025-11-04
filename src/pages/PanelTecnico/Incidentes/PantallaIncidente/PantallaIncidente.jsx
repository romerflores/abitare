import { useEffect, useState } from 'react';
import { formatFecha, formatId } from '../../../../utils/format';
import Modal from '../../../../components/modalAM/Modal';

/* Los estilos se encuentran en los estilos de  PanelResidente/Incidentes/TicketPage*/
import './pantallaIncidente.css';
import ConfirmacionFormulario from '../FormularioConfirmacion/ConfirmacionFormulario';


const PantallaIncidente = () => {
        const url = window.location.href;
    const idPage = url.split(':').reverse()[0];
        const [info, setInfo] = useState(null);
    
        useEffect(() => {
            const obtenerInfoIncidente = async () => {
                try {
                    const conexion = await fetch(`http://localhost:10000/api/tecnico/obtener-registro-info/${idPage}`);
                    if (!conexion) throw new Error("Error al establecer la conexion");
                    const incidente = await conexion.json();
                    setInfo(incidente.incidente);
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
                const conexion = await fetch(`http://localhost:10000/api/incidente/imagenes-ticket/:${idPage}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                console.log(conexion);
                const respuesta = await conexion.json();
                setImagenes(respuesta.imagenes);
                console.log(respuesta.imagenes)
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerImagenes();
    }, [])
    
    return (
        <main className='s_ticket-page'>
            {
                info && <>
                    <section className='s_ticket-page-details'>
                        <article className='s_ticket-details-info'>
                            <header className='s_ticket-details-header' style={{gap:'15px', justifyContent:'space-between'}}>
                                <h2>Detalle del Ticket {formatId(idPage)}</h2>
                                <div className="ticket-header-options">
                                    {
                                        (info.fecha_cierre_out)
                                            ?
                                            <span>Finalizado</span>
                                            :
                                            <Modal modal_content={<ConfirmacionFormulario tecnico={6} ticket={idPage} />} btn_label={"Finalizar trabajo"} />
                                    }
                                    <span className={` ticket-header-prioridad ${info.prioridad_nombre_out.toLowerCase() == "urgente" ? 'estado-rojo' : info.prioridad_nombre_out.toLowerCase() == "medio" ? 'estado-naranja' : 'estado-verde'}`}>
                                        {info.prioridad_nombre_out}
                                    </span>
                                </div>
                            </header>
                            <div className='ticket-info-c1' style={{flexWrap:'wrap'}}>
                                <div>
                                    <h4>Titulo</h4>
                                    <p>{info.titulo_out}</p>
                                </div>
                            </div>
                            <div className="ticket-info-c1">
                                <div>
                                    <h4>Descripcion</h4>
                                    <p>{info.descripcion_out}</p>
                                </div>
                            </div>
                            <div className="ticket-info-c1">
                                <div>
                                    <h4>Ubicacion</h4>
                                    <p>{info.ubicacion_out}</p>
                                </div>
                                <div>
                                    <h4>Fecha de registro</h4>
                                    <p>{formatFecha(info.fecha_creacion_out)}</p>
                                </div>
                            </div>
                            <div className='ticket-info-c3'>
                                <h3>Fotos adjuntas</h3>
                                <div className='ticket-info-c3-images'>
                                    {imagenes && imagenes.map(imagen => (
                                        <div className="ticket-info-image">
                                            {imagen.tipo_mime == "video/mp4"
                                                ?
                                                <video src={`http://localhost:10000/public/images/${imagen.nombre_archivo}`} controls>
                                                </video>
                                                :
                                                <img src={`http://localhost:10000/public/images/${imagen.nombre_archivo}`} alt="Foto 1" />}
                                        </div>
                                    ))}
                                </div>
                                {/* <Carrusel/> */}
                            </div>
                        </article>
                        <article className='s_ticket-details-resume' style={{gap:'10px'}}>
                            <h3>Datos del residente </h3>
                            <div className='ticket-info-c1'>
                                <div>
                                    <h4>Nombre completo</h4>
                                    <p>{info.nombres_out} {info.paterno_out} {info.materno_out}</p>
                                </div>
                            </div>
                            <div className="ticket-info-c1">
                                <div>
                                    <h4>Número de contacto</h4>
                                    <p>{info.celular_out} </p>
                                </div>
                                <div>
                                    <h4>Departamento</h4>
                                    <p>{info.departamento_out}</p>
                                </div>
                            </div>
                        </article>
                        <article className='s_ticket-details-validate'>
                            <h3>Validacion y Conformidad</h3>
                            <p></p>
                        </article>
                    </section>
                    {/* <section className='s_ticket-page-progression'>
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
                            <TimelineCmp creacion={formatFecha(info.fecha_creacion_out, '/')} />
                        </article>
                    </section> */}
                </>
            }
        </main>
    )
}

export default PantallaIncidente
