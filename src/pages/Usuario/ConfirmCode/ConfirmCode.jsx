import Button from '../../../components/Button/Button';
import InputOtpConfirm from '../../../components/InputOtp/InputOtp';
import './confirmCode.css';

import { useNavigate } from 'react-router-dom';
import { useState } from "react"

const ConfirmCode = () => {
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState('');

    const verificarCodigo = async (e) => {
        e.preventDefault();
        const data = {
            codigo,
            tipo: localStorage.getItem("tipo")
        }
        const response = await fetch('https://abitare-back-production.up.railway.app/api/usuario/verificar', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const datos = await response.json();

        if (response.status == 401) {
            alert(datos.message);
        }

        if (response.ok) {
            const userRole = localStorage.getItem('tipo');
            navigate(`/${userRole}/dashboard`, { replace: true });
        }

    }

    return (
        <div id='codigo-container'>
            <div id="container-title">
                <h2>Código de confirmación</h2>
                <h3>Ingrese el código enviado a su correo electrónico</h3>
            </div>
            <form id='container-form' onSubmit={verificarCodigo}>
                <InputOtpConfirm code={codigo} setCode={setCodigo}/>
                <Button p_texto='Enviar' p_type='submit'/>
            </form>
        </div>
    )
}

export default ConfirmCode
