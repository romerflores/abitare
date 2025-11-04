import { useState } from "react"
import Button from "../../../components/Button/Button"
import Title from "../../../components/Title/Title"


export default function CambioContrasenia()
{   

    const [newPassword,setNewPassword]=useState("")

    const handleNewPassword=(e)=>{
        setNewPassword(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/usuario/actualizar-clave", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clave: newPassword,
                    tipo: localStorage.getItem("tipo").toLowerCase(),
                    usuario: localStorage.getItem("email")
                }),
                credentials: "include"
            })

            if (response.status === 201) {
                alert("Contrasenia actualizada correctamente, vuelva a iniciar session con su nueva contrasenia")
                console.log("Contraseña actualizada con éxito ✅")
                window.location.href = "/login";
                localStorage.removeItem("tipo");
                localStorage.removeItem("email");
            } else {
                const errorData = await response.json()
                alert(errorData.message)
            }
        } catch (err) {
            console.error("Mi error es:",err)
        }
    }

    return <form className="c_form" onSubmit={handleSubmit} style={{height:"200px"}}>
        <Title p_text="Ingrese su nueva contrasenia" p_sz={2}/>
        <input type="text" value={newPassword} onChange={handleNewPassword} />
        <Button p_texto="Confirmar" p_type="submit"/>

    </form>
}