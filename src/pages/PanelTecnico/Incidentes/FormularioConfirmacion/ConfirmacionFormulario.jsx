import { useState } from 'react';
import './confirmacionFormulario.css';

const ConfirmacionFormulario = ({ ticket, tecnico }) => {

    const [resumen, setResumen] = useState(null);
    const [antes, setAntes] = useState(null);
    const [extra, setExtra] = useState('');

    const registrarTrabajo = async (e) => {
        e.preventDefault();

        const data = {
            ticket: parseInt(ticket),
            tecnico: tecnico,
            resumen,
            anterior: antes,
            extra
        }
        try {
            const conexion = await fetch('https://abitare-back-production.up.railway.app/api/tecnico/registrar-informe', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            console.log(conexion);
            const respuesta = await conexion.json();
            console.log(respuesta);
            alert(respuesta.message);
            document.location.reload();
        } catch (e) {
            console.error(e.message);   
        }
    }


    return (
        <main className="formulario-tecnico">
            <form className="formulario-confirmar-tecnico">
                <legend>Finalizar trabajo</legend>
                {/* <InputForm className={'formulario-tecnico-campo'} label_text={''}/>
                <InputForm className={'formulario-tecnico-campo'}/> */}
                <div className="formulario-tecnico-campo"> 
                    <label htmlFor="formulario-campo-resumen">Escriba un resumen de su trabajo</label>
                    <textarea name="formulario-campo-resumen" id="formulario-campo-resumen" onChange={(e)=>setResumen(e.target.value)}>
                    </textarea>
                </div>
                <div className="formulario-tecnico-campo">
                    <label htmlFor="formulario-campo-materiales">Escriba cómo recibió el incidente</label>
                    <textarea name="formulario-campo-materiales" id="formulario-campo-materiales" onChange={(e) => setAntes(e.target.value)}>
                    </textarea>
                </div>
                <div className="formulario-tecnico-campo">
                    <label htmlFor="formulario-campo-materiales">Escriba alguna sugerencia o información extra que vea necesario</label>
                    <textarea name="formulario-campo-materiales" id="formulario-campo-materiales" onChange={(e) => setExtra(e.target.value)}>
                    </textarea>
                </div>
                <button className="formulario-tecnico-btn" onClick={registrarTrabajo}>Finalizar</button>
            </form>
        </main>
    )
}
export default ConfirmacionFormulario;
