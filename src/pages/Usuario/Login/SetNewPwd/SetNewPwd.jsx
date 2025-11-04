import './SetNewPwd.css';

import { useState } from 'react'
import InputPwd from '../../../components/InputPwd/InputPwd'
import Button from '../../../components/Button/Button';

const SetNewPwd = () => {
    const [pwd, setPwd] = useState("");
    const [pwdConf, setPwdConf] = useState("");
    const id_usuario = localStorage.getItem("id");

    const cambiarPwd = async (e) => {
        e.preventDefault();
        try {
            if (pwd !== pwdConf) {
                alert('Ambas contraseñas deben ser iguales');
                throw new Error('Ambas contraseñas deben ser iguales');
            };
            const data = {
                id_usuario,
                clave: pwd
            }
            console.log(data);
            const conexion = await fetch('http://localhost:10000/api/usuario/actualizar-primera-vez', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const respuesta = await conexion.json();
            if (conexion.status == 201) {
                alert(respuesta.message);
                window.location.href = 'login'
                return;
            } else {
                alert(respuesta.message);
                throw new Error(respuesta.message);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

  return (
      <div className='cambiar-clave-screen'>
          <div className='cambiar-clave-titulo'>
              <h2>Bienvenido</h2>
              <h3>Antes de continuar, actualice su contraseña</h3>
              <h5>La contraseña debe tener al menos: una mayúscula, un símbolo y un número</h5>
          </div>
          <form className='cambiar-clave-form' onSubmit={cambiarPwd}>
              <InputPwd value={pwd} setValue={setPwd} texto={'Ingrese su nueva contraseña'} id={'pwd'}/>
              <InputPwd value={pwdConf} setValue={setPwdConf} texto={'Repita su contraseña'} id={'pwd-repeat'}/>
              <Button p_texto='Actualizar'/>
          </form>
    </div>
  )
}

export default SetNewPwd
