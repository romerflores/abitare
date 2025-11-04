import './Residentes.css';

import { useState, useEffect } from 'react';

import Modal from '../../../Componentes/Modal/Modal'
import ActualizarResidente from '../../ActualizarResidentes/ActualizarResidente';
import CardUser from '../../../Componentes/Card/CardUser';

const Residentes = () => {

    const [residentes, setResidentes] = useState(null);
    let departamentos = new Set();


    useEffect(() => {
        const obtenerDatosResidentes = async () => {
            const conexion = await fetch('http://localhost:10000/api/administrador/obtener-residentes', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await conexion.json();
            setResidentes(data.residentes);
            console.log(data);
        }
        obtenerDatosResidentes();
    }, [])

    residentes && residentes.forEach(element => {
        departamentos.add(element.id_departamento)
    });

    return (
        <div className='panel-residentes'>
            <h1>Residentes</h1>
            {Array.from(departamentos).map(departamento => (
                <div className='panel-residentes-dpto'>
                    <h3>Residentes departamento: {departamento}</h3>
                    <div className='panel-residentes-residentes'>
                        {residentes && residentes.map(residente => (
                            residente.id_departamento == departamento &&
                            <CardUser usuario={residente}
                                opciones={[
                                    <Modal accion={'Editar'} accion_desc={''} id_usuario={residente.id_residente} contenido={<ActualizarResidente id_usuario={residente.id_residente} />} icon={'user-edit'} color={'contrast'} />,
                                    <Modal accion={'Eliminar'} accion_desc={'Eliminar usuario del edificio'} id_usuario={residente.id_residente} contenido={`Al realizar esta accion, usted está eliminando del registro al usuario ${residente.nombre} ${residente.paterno} ${residente.materno}`} usuario={residente.id_residente} color={'danger'} icon={'trash'} tipo={'residente'}/>
                                ]}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Residentes
