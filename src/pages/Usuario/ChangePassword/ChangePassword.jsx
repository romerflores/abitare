import { useState } from "react"

const ChangePassword = () => {
    const [clave, setClave] = useState(null);
    const enviarClave = async (e) => {
        e.preventDefault();
        const data = {
            codigo: clave
        };
        try {
            const conexion = await fetch('http://localhost:10000/api/usuario/validar-codigo', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            const respuesta = await conexion.json();
            alert(respuesta.message);
            if (conexion.ok) window.location.href ="cambiar-clave"
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <main style={{display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100dvh', justifyContent:'center', gap:'10px'}}>
            <h1>Código de confirmación</h1>
            <form onSubmit={enviarClave} style={{ width: '60%', maxWidth: '400px', background: '#fff', padding: '30px', display: 'flex', flexDirection: 'column', gap: '10px', borderRadius:'10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap:'10px'}} >
                    <label htmlFor="clave">Digite el codigo enviado a su correo</label>
                    <input type="number" id='clave' onChange={(e) => setClave(e.target.value)} style={{padding:'10px', fontSize:'14px'}} maxLength={10}/>
                </div>
                <button style={{display:'block', width:'100%', padding:'5px 10px', cursor:'pointer'}}>Enviar</button>
            </form>
        </main>
    )
}

export default ChangePassword
