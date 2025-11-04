import { useState, useEffect } from "react";
import API from "../../../../api/api";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import "./AdminVotaciones.css";

function AdminVotaciones() {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", ""]);
  const [votaciones, setVotaciones] = useState([]);

  useEffect(() => {
    cargarVotaciones();
  }, []);

  const cargarVotaciones = async () => {
    try {
      const res = await API.get("/votaciones");
      setVotaciones(res.data);
    } catch (error) {
      console.error("Error al cargar votaciones:", error);
    }
  };

  const agregarOpcion = (e) => {
    e.preventDefault();
    setOpciones([...opciones, ""]);
  };

  const cambiarOpcion = (index, valor) => {
    const nuevas = [...opciones];
    nuevas[index] = valor;
    setOpciones(nuevas);
  };

  const crearVotacion = async () => {
    if (!pregunta.trim() || opciones.some((o) => !o.trim())) {
      alert("Completa la pregunta y todas las opciones.");
      return;
    }
    try {
      await API.post("/votaciones", { pregunta, opciones });
      setPregunta("");
      setOpciones(["", ""]);
      cargarVotaciones();
    } catch (error) {
      console.error("Error al crear votación:", error);
    }
  };

  const eliminarVotacion = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta votación?")) return;
    try {
      await API.delete(`/votaciones/${id}`);
      cargarVotaciones();
    } catch (error) {
      console.error("Error al eliminar votación:", error);
    }
  };

  return (
    <div className="admin-votaciones-container">
      <h2>Administración de Votaciones</h2>

      <div className="form-section">
        <h3>Crear nueva votación</h3>
        <Input
          p_value={pregunta}
          p_placeHolder="Escribe la pregunta..."
          p_onChange={setPregunta}
          p_text="Pregunta"
        />

        {opciones.map((op, i) => (
          <Input
            key={i}
            p_value={op}
            p_placeHolder={`Opción ${i + 1}`}
            p_onChange={(v) => cambiarOpcion(i, v)}
            p_text={`Opción ${i + 1}`}
          />
        ))}

        <div className="buttons">
          <Button p_onClick={agregarOpcion} p_texto="Agregar opción" p_type="submit"></Button>
          <Button p_onClick={crearVotacion} p_texto="Crear Votación" p_type="submit"></Button>
        </div>
      </div>

      <hr />

      <div className="list-section">
        <h3>Votaciones creadas</h3>
        {votaciones.length === 0 ? (
          <p>No hay votaciones registradas.</p>
        ) : (
          votaciones.map((v) => (
            <div key={v.id} className="votacion-item">
              <h4>{v.pregunta}</h4>
              <ul>
                {v.opciones.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
              <Button p_onClick={() => eliminarVotacion(v.id)} p_texto="Eliminar"></Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminVotaciones;
