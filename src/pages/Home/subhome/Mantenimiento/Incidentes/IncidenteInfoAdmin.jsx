import './incidenteInfoAdmin.css';

import { useEffect, useState } from 'react'
import { formatFecha, formatId } from '../../../../../utils/format';
import { determinarColorEstado, determinarColorPrioridad } from '../../../../../utils/funciones';

const IncidenteInfoAdmin = () => {
    const idIncidente = window.location.href.split(':').reverse()[0];

    const [infoIncidente, setInfoIncidente] = useState(null);
    const [personal, setPersonal] = useState(null);

    useEffect(() => {
        const obtenerIncidente = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/obtener-incidente/:${idIncidente}`);
                if (!conexion.ok) {
                    alert('No hay informacion sobre este incidente')
                    return;
                }
                const respuesta = await conexion.json();
                setInfoIncidente(respuesta.incidente);
            } catch (e) {
                alert("Error en la conexion, intentelo más tarde")
            }
        }
        obtenerIncidente();
    }, [])

    useEffect(() => {
        if (infoIncidente && infoIncidente.estado_out == 'PENDIENTE') {
            const obtenerPersonal = async () => {
                try {
                    const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/personal-por-tipo/:${infoIncidente.mantenimiento_out}`);
                    const respuesta = await conexion.json();
                    setPersonal(respuesta.personal)
                } catch (e) {
                    console.error(e.message);
                }
            }
            obtenerPersonal();
        }
    }, [infoIncidente])

    const [imagenes, setImagenes] = useState(null);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/incidente/imagenes-ticket/:${idIncidente}`, {
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
    }, [])

    const asignarPersonal = async (e) => {
        e.preventDefault();
        const data = {
            ticket: infoIncidente.ticket_out,
            tecnico: parseInt(e.target.value),
            usuario: infoIncidente.correo_residente_out
        }
        try {
            const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/asignar-personal-incidente', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const respuesta = await conexion.json();
            if (conexion.status != 201) {
                alert(respuesta.message)
                return;
            }
            if (conexion.status == 201) {
                alert(respuesta.message);
                window.location.reload();
            }
        } catch (e) {
            console.error(e.message);
        }
    }


    return (
        <main className='s_admin-pantalla-incidente'>
            {infoIncidente && <>
                <section className='admin-incidente-info'>
                    <header className='admin-info-header'>
                        <h1>Reporte de Incidencia</h1>
                        <span className={`${determinarColorPrioridad(infoIncidente.nombre_out)}`}>{infoIncidente.nombre_out}</span>
                    </header>
                    <article className='admin-info-table'>
                        <h3>Información General</h3>
                        <div className='admin-table-box'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID del Reporte</td>
                                        <td>{formatId(infoIncidente.ticket_out, 5)}</td>
                                    </tr>
                                    <tr>
                                        <td>Titulo</td>
                                        <td>{infoIncidente.titulo_out}</td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion</td>
                                        <td>{infoIncidente.descripcion_out}</td>
                                    </tr>
                                    <tr>
                                        <td>Categoria</td>
                                        <td>{infoIncidente.mantenimiento_out}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de registro</td>
                                        <td>{formatFecha(infoIncidente.fecha_creacion_out)}</td>
                                    </tr>
                                    <tr>
                                        <td>Ubicacion</td>
                                        <td>{infoIncidente.ubicacion_out}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className='admin-info-images'>
                        <h3>Galería de Fotos</h3>
                        <div className='admin-images-box'>
                            {imagenes && imagenes.map(imagen => (
                                <div>
                                    {imagen.tipo_mime == "video/mp4"
                                        ?
                                        <video src={`https://lc82mg08-10000.brs.devtunnels.ms/public/images/${imagen.nombre_archivo}`} controls>
                                        </video>
                                        :
                                        <img src={`https://lc82mg08-10000.brs.devtunnels.ms/public/images/${imagen.nombre_archivo}`} alt="Foto 1" />}
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
                <section className='admin-incidente-more'>
                    <article className='admin-info-box admin-more-info'>
                        <h3>Información Residente</h3>
                        <div className="admin-info-residente">
                            <div>
                                <h4>Nombre</h4>
                                <p>{infoIncidente.nombre_residente_out} {infoIncidente.paterno_residente_out} {infoIncidente.materno_residente_out}</p>
                            </div>
                            <div>
                                <h4>Número de contacto</h4>
                                <p>{infoIncidente.celular_residente_out}</p>
                            </div>
                            <div>
                                <h4>Carnet de identidad</h4>
                                <p>{infoIncidente.ci_residente_out}</p>
                            </div>
                            <div>
                                <h4>Correo electrónico</h4>
                                <p>{infoIncidente.correo_residente_out}</p>
                            </div>
                        </div>
                    </article>
                    {/* <article className='admin-info-box'>
                        <h3>Información Adicional </h3>
                        <p>{infoIncidente.mantenimiento_out}</p>
                    </article> */}
                    {
                        infoIncidente.estado_out == "PENDIENTE"
                            ?
                            <section className='admin-info-box admin-info-box-section'>
                                <h1>Asignar Personal a Incidente</h1>
                                {
                                    personal && personal.map((item, index) => (
                                        <div className='admin-box-asignar'>
                                            <div className='admin-asignar-avatar'><img src="https://c.files.bbci.co.uk/15C01/production/_106598098_gettyi33758.jpg" alt="" /></div>
                                            <article key={index} className='admin-asignar-personal'>
                                                <div>
                                                    <h4>Nombre</h4>
                                                    <p>{item.nombre_out} {item.paterno_out} {item.materno_out}</p>
                                                </div>
                                                <div>
                                                    <h4>Número de contacto</h4>
                                                    <p>{item.celular_out}</p>
                                                </div>
                                                <div>
                                                    <h4>Correo electrónico</h4>
                                                    <p>{item.correo_out}</p>
                                                </div>
                                            </article>
                                            <button value={item.id_out} onClick={asignarPersonal}>Asignar</button>
                                        </div>
                                    ))
                                }
                            </section>
                            :
                            <>

                                <section>
                                    <article className='admin-info-box admin-more-info'>
                                        <h3>Información Personal Asignado</h3>
                                        <div className="admin-info-residente">
                                            <div>
                                                <h4>Nombre</h4>
                                                <p>{infoIncidente.nombre_personal_out} {infoIncidente.paterno_personal_out} {infoIncidente.materno_personal_out}</p>
                                            </div>
                                            <div>
                                                <h4>Número de contacto</h4>
                                                <p>{infoIncidente.celular_personal_out}</p>
                                            </div>
                                            <div>
                                                <h4>Carnet de identidad</h4>
                                                <p>{infoIncidente.ci_personal_out}</p>
                                            </div>
                                            <div>
                                                <h4>Correo electrónico</h4>
                                                <p>{infoIncidente.email_personal_out}</p>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                                <section>
                                    <article className='admin-info-box admin-more-info'>
                                        <h3>Linea Temporal</h3>
                                        <div className="admin-info-residente">
                                            <div>
                                                <h4>Fecha creacion</h4>
                                                <p>{formatFecha(infoIncidente.fecha_creacion_out)}</p>
                                            </div>
                                            <div>
                                                <h4>Fecha asignacion</h4>
                                                <p>{formatFecha(infoIncidente.fecha_asignacion_out)}</p>
                                            </div>
                                            <div>
                                                <h4>Fecha finalizacion</h4>
                                                <p>{infoIncidente.fecha_cierre_out ? formatFecha(infoIncidente.fecha_cierre_out) : '-'}</p>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                            </>
                    }
                </section>
            </>}
        </main>
    )
}

export default IncidenteInfoAdmin
