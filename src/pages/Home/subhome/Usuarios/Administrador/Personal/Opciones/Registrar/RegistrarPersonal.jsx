import './RegistrarPersonal.css';
import { useEffect, useState } from "react";
import Input from "../../../Componentes/Input/Input";
import Select from '../../../Componentes/Select/Select';

const RegistrarPersonal = ({set_page}) => {

    let mantenimientos = new Map();

    const [trabajos, setTrabajos] = useState(null);

    useEffect(() => {
        const obtenerMantenimientos = async () => {
            try {
                const conexion = await fetch('http://localhost:10000/api/mantenimiento/', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!conexion) throw new Error("No se pudo establecer la conexion");
                const datos = await conexion.json();
                datos["activos"].forEach(activo => {
                    mantenimientos.set(activo.tipo, activo.id_mantenimiento);
                })
                setTrabajos(mantenimientos);
            } catch (e) {
                console.error(e.message)
            }
        }
        obtenerMantenimientos();
    }, [])
    
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [ci, setCi] = useState('');
    const [celular, setCelular] = useState('');
    const [salario, setSalario] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [empleo, setEmpleo] = useState('');
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');

    const registrarPersonal = async (e) => {
        e.preventDefault();
        const datos = {
            nombre,
            paterno,
            materno,
            ci,
            celular,
            salario,
            email,
            empleo: trabajos.get(empleo[0]),
            estado: (estado == 'Activo') ? true : false,
            entrada,
            salida
        }
        try {
            const conexion = await fetch('http://localhost:10000/api/administrador/registrar-personal', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials: 'include'
            })
            const respuesta = await conexion.json();
            if (!conexion.ok) throw new Error(respuesta.message);
            alert(respuesta.message);
            window.location.reload();
            set_page("personal")
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className='s_admin-registrar-usuario'>
            <h1>Registrar nuevo personal</h1>
            <form className='s_admin-registrar-form' onSubmit={registrarPersonal}>
                <div className="s_admin-registrar-campos">
                    <Input value={nombre} setValue={setNombre} label={'Nombre'} />
                    <Input value={paterno} setValue={setPaterno} label={'Apellido paterno'} />
                    <Input value={materno} setValue={setMaterno} label={'Apellido materno'} />
                    <Input value={email} setValue={setEmail} label={'Correo electrónico'} tipo='email' />
                    <Input value={ci} setValue={setCi} label={'Carnet de identidad'} />
                    <Input value={celular} setValue={setCelular} label={'Celular'} tipo="number" />
                    <Input value={salario} setValue={setSalario} label={'Salario'} />
                    {trabajos && <Select opciones={Array.from(trabajos.keys())} opcion={empleo} setOpcion={setEmpleo} tipo_select={'Seleccione el área del personal'}/>}
                    <Input value={entrada} setValue={setEntrada} label={'Hora de entrada'} tipo="time" />
                    <Input value={salida} setValue={setSalida} label={'Hora de salida'} tipo="time" />
                </div>
                <button id='s_admin-actualizar-btn'>Registrar</button>
            </form>
        </div>
    )
}

export default RegistrarPersonal;