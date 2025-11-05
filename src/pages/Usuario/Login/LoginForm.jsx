import ReCAPTCHA from 'react-google-recaptcha';

import { useState, useRef } from "react";
import { validateNoSpace } from "../../../utils/validators";
import Input from "../../../components/InputCp/Input";
import Button from "../../../components/Button/Button";

import './LoginForm.css';
import Select from '../../../components/SelectCmp/Select';

export function LoginForm() {
    const [userValue, setUserValue] = useState("");
    const [captchaValido, setCaptchaValido] = useState(false);


    const handleChangeUserValue = (newVal) => {
        if (validateNoSpace(newVal)) setUserValue(newVal);
    }

    const [userPass, setUserPass] = useState("");
    const handleChangeUserPass = (newVal) => {
        setUserPass(newVal)
    }

    const [userType, setUserType] = useState("");



    const handleSubmit = async (element) => {
        element.preventDefault();

        try {
            /* if (!captchaValido) throw new Error('Debe completar el captcha');  */
            if (!userType[0]) {
                alert('Debe seleccionar el tipo de usuario')
                return;
            }
            const response = await fetch("https://abitare-back-production.up.railway.app/api/usuario/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            usuario: userValue,
                            clave: userPass,
                            tipo: userType[0].toLowerCase()
                        }
                    ),
                    credentials: "include"
                }
            );

            if (response.status == 429) {
                alert('Demasiados intentos de login. Por favor, inténtalo de nuevo después de 5 minutos.')
                return;
            }

            const data = await response.json();

            if (response.status == 401) {
                alert(data.message)
                return;
            }
            if (response.status == 500) {
                alert(data.message)
                return;
            };
            // console.log(DataTransfer)

            /*
                        console.log(DataTransfer)

                        console.log("SIUUUUUUU",data);
             */
            // Aca viene el token, si lo usaremos
            // alert("Siu, se recibio la respuesta")


            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("tipo", data.tipo);
            /* window.location.href = "/home"; */

            // if (data.change) {
            //     alert('Debe cambiar su contraseña');
            //     window.location.href = 'cambio-primera-vez';
            // } else {
            //     window.location.href = 'verificar';
            // }
            window.location.href="/dashboard";
        }
        catch (error) {
            alert(error.message);
            console.error("F-no funciono", error.message);
        }
    }

    const cambiarContrasenia = async (e) => {
        e.preventDefault();
        if (!userType[0]) {
            alert('Debe seleccionar el tipo de usuario')
            return;
        }
        if (!userValue) {
            alert('Debe escribir su usuario');
            return;
        }
        const data = {
            usuario: userValue,
            tipo: userType[0].toLowerCase()
        }
        try {
            const conexion = await fetch('https://abitare-back-production.up.railway.app/api/usuario/cambio-clave', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            console.log(conexion);
            if (!conexion) throw new Error("No fue posible realizar la conexion");
            const respuesta = await conexion.json();
            if (conexion.status == 400) {
                alert(respuesta.message);
                return;
            }
            window.location.href = 'validar-clave';
            localStorage.setItem("tipo", userType);
            localStorage.setItem("email", userValue);
        } catch (e) {
            console.error(e.message);
        }
    }
    const captcha = useRef(null);
    const onChange = () => {
        if (captcha.current.getValue()) setCaptchaValido(true);
    }

    return (
        <form onSubmit={handleSubmit} className="c_form">
            <Input
                p_placeHolder='romer@gmail.com'
                p_text='Email'
                p_value={userValue}
                p_onChange={handleChangeUserValue}
                p_type='username'
            />

            <Input
                p_placeHolder='••••••••'
                p_text='Contraseña'
                p_value={userPass}
                p_onChange={handleChangeUserPass}
                p_type='password'
            />

            <Select opciones={['Administrador', 'Residente', 'Personal']} setOpcion={setUserType} tipo_select={'Seleccione el tipo de usuario'} opcion={userType} />

            <div className="recaptcha">
                <ReCAPTCHA
                    ref={captcha}
                    sitekey='6Lez-csrAAAAAKPXZiczvEYVN75AYGtCW8CoZznF'
                    onChange={onChange} />
            </div>

            <a style={{cursor:'pointer', textDecoration:'underline'}} onClick={cambiarContrasenia}>¿Olvidaste tu contraseña?</a>


            <Button
                p_class='okay'
                p_texto='Ingresar'
                p_type='submit'
            />
        </form>
    )

}

export default LoginForm