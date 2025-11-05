import './Crear.css';
import { useEffect, useState } from "react";
import Input from "../../Componentes/Input/Input";
import Select from '../../Componentes/Select/Select';

const CrearUsuario = ({set_page}) => {

    let dptoArray = new Set();
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const conexion = await fetch('https://abitare-back-production.up.railway.app/api/administrador/obtener-departamentos', {
                    method: 'GET',
                    credentials: 'include'
                });
                const datos = await conexion.json();
                datos.departamentos.forEach(departamento => {
                    dptoArray.add(departamento.id_departamento)
                })
                setDepartamentos(Array.from(dptoArray));
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerDepartamentos();
    }, [])

    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [ci, setCi] = useState('');
    const [clave, setClave] = useState('');
    const [fecha, setFecha] = useState('');
    const [tipo, setTipo] = useState('');
    const [dpto, setDpto] = useState('');

    const crearUsuario = async (e) => {
        e.preventDefault();
        if (dpto.length > 1) throw new Error("Solo puede seleccionar un departamento");
        const datos = {
            nombre,
            paterno,
            materno,
            correo,
            ci,
            fecha,
            clave,
            tipo: tipo[0],
            departamento: dpto[0] || 'hola'
        }
        console.log(datos);
        try {
            const conexion = await fetch('https://abitare-back-production.up.railway.app/api/administrador/registrar-usuario', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials: 'include'
            })
            const respuesta = await conexion.json();
            if (!conexion.ok) {
                alert(respuesta.message);
                throw new Error();
            }
            else {
                alert(respuesta.message);
                set_page("residentes")
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className='s_admin-registrar-usuario'>
            <h1>Registrar usuario</h1>
            <form className='s_admin-registrar-form' onSubmit={crearUsuario}>
                <div className="s_admin-registrar-campos">
                    <Input value={nombre} setValue={setNombre} label={'Nombre:'} />
                    <Input value={paterno} setValue={setPaterno} label={'Apellido paterno:'} />
                    <Input value={materno} setValue={setMaterno} label={'Apellido materno:'} />
                    <Input value={correo} setValue={setCorreo} label={'Correo electrónico:'} tipo="email" />
                    <Input value={ci} setValue={setCi} label={'Carnet de identidad:'} />
                    <Input value={clave} setValue={setClave} label={'Contraseña (Debe ser el CI):'} tipo="password"/>
                    <Input value={fecha} setValue={setFecha} label={'Fecha de nacimiento:'} tipo="date"/>
                    <Select opciones={['Administrador', 'Residente']} opcion={tipo} setOpcion={setTipo} tipo_select={'Seleccionar usuario'} />
                    {tipo =='Residente' &&
                        departamentos &&
                        <Select opciones={[...departamentos]} opcion={dpto} setOpcion={setDpto} tipo_select={'Seleccionar departamento'} />
                    }
                </div>
                <button id='s_admin-actualizar-btn'>Registrar</button>
            </form>
        </div>
    )
}

export default CrearUsuario;