import { useState, useEffect } from "react";
import Input from "../../../Componentes/Input/Input";
import Select from "../../../Componentes/Select/Select";

const Actualizar = ({ id_personal, set_page}) => {
    const id = id_personal;
    const [usuario, setUsuario] = useState(null);

    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [ci, setCi] = useState('');
    const [celular, setCelular] = useState('');
    const [salario, setSalario] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');

    useEffect(() => {
        const obtenerDatosPersonal = async () => {
            try {
                const conexion = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/obtener-personal/:${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const datos = await conexion.json();
                setUsuario(datos.personal);
                setNombre(datos.personal["nombres"]);
                setPaterno(datos.personal["paterno"]);
                setMaterno(datos.personal["materno"]);
                setEmail(datos.personal["email"]);
                setCi(datos.personal["ci"]);
                setCelular(datos.personal["celular"]);
                setSalario(datos.personal["salario"]);
                setEstado(datos.personal["estado_disponible"]);
                setEntrada(datos.personal["hora_entrada"]);
                setSalida(datos.personal["hora_salida"]);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerDatosPersonal();
    }, [])

    const actualizarDatosPersonal = async (e) => {
        e.preventDefault();
        const datos = {
            usuario:id,
            nombre,
            paterno,
            materno,
            ci,
            celular,
            salario,
            email,
            estado: (estado=='Activo')?true:false,
            entrada,
            salida
        }
        try {
            const conexion = await fetch('https://lc82mg08-10000.brs.devtunnels.ms/api/administrador/actualizar-personal', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials: 'include'
            })
            const respuesta = await conexion.json();
            if (!conexion.ok) throw new Error();
            alert(respuesta.message);
            set_page("personal")
            window.location.reload();
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className='s_admin-actualizar-usuario'>
            <h3>Actualizar datos del personal</h3>
            {usuario &&
                <form className='s_admin-actualizar-form' onSubmit={actualizarDatosPersonal}>
                    <div className="s_admin-actualizar-campos">
                        <Input value={nombre} setValue={setNombre} label={'Nombre'} />
                        <Input value={paterno} setValue={setPaterno} label={'Apellido paterno'} />
                        <Input value={materno} setValue={setMaterno} label={'Apellido materno'} />
                        <Input value={email} setValue={setEmail} label={'Correo electrónico'} tipo='email' />
                        <Input value={ci} setValue={setCi} label={'Carnet de identidad'} />
                        <Input value={celular} setValue={setCelular} label={'Celular'}  tipo="number"/>
                        <Input value={salario} setValue={setSalario} label={'Salario'} />
                        <label>Disponibilidad actual: {estado?'Activo':'Inactivo'}</label>
                        <Select opciones={['Activo', 'Inactivo']} opcion={''} setOpcion={setEstado} tipo_select={'Disponibilidad del personal'} />
                        <Input value={entrada} setValue={setEntrada} label={'Hora de entrada'} tipo="time" />
                        <Input value={salida} setValue={setSalida} label={'Hora de salida'} tipo="time"/>
                    </div>
                    <button id='s_admin-actualizar-btn'>Actualizar</button>
                </form>
            }
        </div>
    )
}

export default Actualizar
