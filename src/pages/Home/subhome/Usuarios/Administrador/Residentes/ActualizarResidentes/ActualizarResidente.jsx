import './Actualizar.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Input from '../../Componentes/Input/Input';

const ActualizarResidente = ({ id_usuario, set_page}) => {
    const id = useParams() && id_usuario;
    const [residente, setResidente] = useState(null);

    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [ci, setCi] = useState('');
    const [fecha, setFecha] = useState('');
    const [tipo, setTipo] = useState('');
    const [dpto, setDpto] = useState('');


    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/obtener-residente/:${id}`, {
                    method: 'GET',
                    credentials:'include'
                });
                const datos = await conexion.json();
                setResidente(datos.residente);
                setNombre(datos.residente["nombre"]);
                setPaterno(datos.residente["paterno"]);
                setMaterno(datos.residente["materno"]);
                setCorreo(datos.residente["correo"]);
                setCi(datos.residente["ci"]);
                setFecha(datos.residente["fecha_nacimiento"].slice(0,10));
                setTipo(datos.residente["tipo_residente"]);
                setDpto(datos.residente["id_departamento"]);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerDatosUsuario();
    }, [])

    const actualizarDatosResidente = async (e) => {
        e.preventDefault();
        const datos = {
            nombre,
            paterno,
            materno,
            correo,
            ci,
            fecha,
            tipo,
            dpto,
            usuario:id
        }
        try {
            const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/actualizar-usuario', {
                method: 'PUT',
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(datos),
                credentials:'include'
            })
            const respuesta = await conexion.json();
            if (!conexion.ok) throw new Error();
            alert(respuesta.message);
            set_page("residentes")
            window.location.reload();
        } catch (e) {
            console.error(e.message);
        }
    }
    
    return (
        <div className='s_admin-actualizar-usuario'>
            <h3>Actualizar datos del usuario</h3>
            {residente &&
                <form className='s_admin-actualizar-form' onSubmit={actualizarDatosResidente}>
                    <div className="s_admin-actualizar-campos">
                        <Input value={nombre} setValue={setNombre} label={'Nombre'} />
                        <Input value={paterno} setValue={setPaterno} label={'Apellido paterno'} />
                        <Input value={materno} setValue={setMaterno} label={'Apellido materno'} />
                        <Input value={correo} setValue={setCorreo} label={'Correo electrónico'}tipo='email' />
                        <Input value={ci} setValue={setCi} label={'Carnet de identidad'} />
                        <Input value={fecha} setValue={setFecha} label={'Fecha de nacimiento'} tipo='date'/>
                        <Input value={tipo} setValue={setTipo} label={'Tipo de usuario'} />
                    </div>
                    <button id='s_admin-actualizar-btn'>Actualizar Datos</button>
                </form>
            }
        </div>
    )
}

export default ActualizarResidente
