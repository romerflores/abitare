import { useEffect, useState } from "react";
import { useParams } from "react-router";

const EliminarResidente = () => {
    const { id } = useParams();
    const [residente, setResidente] = useState(null);
    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const conexion = await fetch(`http://localhost:10000/api/administrador/obtener-residente/:${id}`);
                const datos = await conexion.json();
                setResidente(datos.residente);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerDatosUsuario();
    },[])
    
    const eliminarDefinitivamente = async () => {
        try {
            const conexion = await fetch(`http://localhost:10000/api/administrador/eliminar-residente/:${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!conexion.ok) throw new Error();
            const datos = await conexion.json();
            alert(datos.message);
            location.href = 'admin-residente';
        } catch (e) {
            console.log(e.message);
        }
    }
  return (
    <div>
          <h1>Hola eliminado</h1>
          <button type="button" onClick={eliminarDefinitivamente}>Elimiar</button>
    </div>
  )
}

export default EliminarResidente
