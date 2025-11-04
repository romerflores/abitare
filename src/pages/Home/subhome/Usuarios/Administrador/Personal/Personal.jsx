import './Personal.css';

import { useEffect, useState } from 'react'

import Modal from '../Componentes/Modal/Modal'
import CardUser from '../Componentes/Card/CardUser';
import VerPersonal from './Opciones/Ver/VerPersonal';
import Actualizar from './Opciones/Actualizar/Actualizar';

const Personal = () => {
    let tipos = new Set();
    const [personal, setPersonal] = useState(null);

    useEffect(() => {
        const obtenerPersonal = async () => {
            try {
                const conexion = await fetch('http://localhost:10000/api/administrador/obtener-personal', {
                    method: 'GET',
                    credentials: 'include'
                })
                const datos = await conexion.json();
                setPersonal(datos.personal);
            } catch (e) {
                console.error(e);
            }
        }
        obtenerPersonal();
    }, [])

    {
        personal && personal.forEach(element => {
            tipos.add(element.tipo);
        });
    }

    return (
        <div className='panel-personal'>
            <h1>Personal</h1>
            {Array.from(tipos).map(tipo => (
                <div className='panel-personal-area'>
                    <h3>Área: {tipo}</h3>
                    <div className='panel-personal-personal'>
                        {personal && personal.map(persona => (
                            persona.tipo == tipo &&
                            <CardUser usuario={persona}
                                opciones={[
                                    <Modal accion={'Datos'} accion_desc={''} id_usuario={persona.id_personal} contenido={<VerPersonal id={persona.id_personal}/>} icon={'eye'} color={'info'} />,
                                    <Modal accion={'Editar'} accion_desc={''} id_usuario={persona.id_personal} contenido={<Actualizar id_personal={persona.id_personal}/>}  icon={'user-edit'} color={'contrast'} />,
                                    <Modal accion={'Eliminar'} accion_desc={'Eliminar usuario del edificio'} id_usuario={persona.id_personal} contenido={`Al realizar esta accion, usted está eliminando para siempre del registro al usuario ${persona.nombres} ${persona.paterno} ${persona.materno}`} usuario={persona.id_personal} color={'danger'} icon={'trash'} tipo={'personal'}/>
                                ]}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Personal
