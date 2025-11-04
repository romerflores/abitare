import './RegistroVisitas.css';
import qrVisitante from "../../../../../../../assets/img/qrCodeAlex.png";

import { useEffect, useState } from 'react'

const RegistroVisitas = () => {

    const [visitasActivas, setVisitasActivas] = useState(null);
    const [visitasInactivas, setVisitasInactivas] = useState(null);

    useEffect(() => {
        const obtenerVisitas = async () => {
            try {
                const conexion = await fetch('http://localhost:10000/api/administrador/obtener-registro-visitas', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!conexion) throw new Error("Error en la conexion");
                const respuesta = await conexion.json();
                setVisitasActivas(respuesta["activos"]);
                setVisitasInactivas(respuesta["inactivos"]);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerVisitas();
    }, [])

    return (
        <main className='admin-registro-visitas'>
            <h1>Registro de visitas al edificio</h1>
            {
                visitasActivas
                &&
                visitasInactivas
                &&
                <div className='container-registro-visitas'>
                    <div className="registro-visitas-activas">
                        {visitasActivas.map(visita => (
                            <>
                                <div className='registro-visitas-card'>
                                    <div className='card-visita-info'>
                                        <h3>Credencial de visita</h3>
                                        <div className="visita-visitante">
                                            <h4>Visitante</h4>
                                            <p>Nombre: {visita.nombre} {visita.paterno} {visita.materno}</p>
                                            <p>CI: {visita.ci_visitante}</p>
                                        </div>
                                        <div className="visita-datos">
                                            <h4>Datos generales</h4>
                                            <p>Departamento: {visita.departamento}</p>
                                            <p>Fecha ingreso: {visita.fecha_entrada.slice(0, 10).split('-').reverse().join('-')} |  {visita.fecha_entrada.slice(11, 19)} </p>
                                        </div>
                                    </div>
                                    <div className='card-visita-qr'>
                                        <img src={qrVisitante} alt="qr visitante" />
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    {/* <div className="registro-visitas-inactivas">
                        {!visitasInactivas ? <h1>Hola</h1>:<h1>No hay hay visitas pasadas</h1>}

                    </div> */}
                </div>
            }
        </main>
    )
}

export default RegistroVisitas
