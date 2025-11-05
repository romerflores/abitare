import './Visita.css';

import { useState, useEffect } from "react"
import Input from "../Componentes/Input/Input"
import Select from '../Componentes/Select/Select';

const Visita = ({set_page}) => {

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


    const [ci, setCi] = useState('');
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [dpto, setDpto] = useState('');
    const [asunto, setAsunto] = useState('');

    const registrarVisita = async (e) => {
        e.preventDefault();
        const datos = {
            ci,
            nombre,
            paterno,
            materno,
            dpto: dpto[0],
            asunto
        }
        try {
            const conexion = await fetch('https://abitare-back-production.up.railway.app/api/administrador/registrar-visita', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos),
                credentials:'include'
            });
            if (!conexion) throw new Error("Conexion fallida");
            const respuesta = await conexion.json();
            if (conexion.status == 201) {
                alert(respuesta.message);
                set_page("visitantes")
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="s_admin-registrar-visita">
            <h1>Registrar visita</h1>
            <form className="admin-registrar-visita-form" onSubmit={registrarVisita}>
                <div className="visita-form-campos">
                    <Input label={'Carnet de identidad'} value={ci} setValue={setCi} tipo="number" />
                    <Input label={'Nombre'} value={nombre} setValue={setNombre} />
                    <Input label={'Apellido paterno'} value={paterno} setValue={setPaterno} />
                    <Input label={'Apellido materno'} value={materno} setValue={setMaterno} />
                    <Select opciones={departamentos} opcion={dpto} setOpcion={setDpto} tipo_select={'Seleccione el departamento'}/>
                </div>
                <div className="visita-form-asunto">
                    <label htmlFor="asunto">Asunto de la visita:</label>
                    <textarea name="asunto" id="asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)}></textarea>
                </div>
                <button id='s_admin-visita-btn'>Registrar</button>
            </form>
        </div>
    )
}

export default Visita
