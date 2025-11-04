import { useState, useEffect } from "react";
import API from "../../../../api/api";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import "./AdminAnuncios.css";

function AdminAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [rol, setRol] = useState("Todos");
  const [ubicacion, setUbicacion] = useState("General");

  // Cargar anuncios existentes
  useEffect(() => {
    cargarAnuncios();
  }, []);

  const cargarAnuncios = async () => {
    try {
      const res = await API.get("/anuncios");
      setAnuncios(res.data);
    } catch (err) {
      console.error("Error al obtener anuncios", err);
    }
  };

  const crearAnuncio = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return alert("Completa todos los campos");

    try {
      await API.post("/anuncios", { titulo, contenido, rol, ubicacion });
      setTitulo("");
      setContenido("");
      setRol("Todos");
      setUbicacion("General");
      cargarAnuncios();
    } catch (err) {
      console.error("Error al crear anuncio", err);
    }
  };

  const eliminarAnuncio = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este anuncio?")) return;
    try {
      await API.delete(`/anuncios/${id}`);
      cargarAnuncios();
    } catch (err) {
      console.error("Error al eliminar anuncio", err);
    }
  };

  return (
    <div className="admin-anuncios-container">
      <h2>📢 Administración de Anuncios</h2>

      {/* Formulario para crear nuevo anuncio */}
      <form className="form-anuncio" onSubmit={crearAnuncio}>
        <Input
          p_value={titulo}
          p_onChange={setTitulo}
          p_text="Anuncio"
          p_placeHolder="Ej: Corte de agua en Bloque A"
        />

        <Input
          p_value={contenido}
          p_onChange={setContenido}
          p_text="Contenido"
          p_placeHolder="Ej: Corte de agua desde las 10am hasta las 2pm"
        />

        <Button type="submit" p_texto="Crear anuncio"></Button>
      </form>

      {/* Lista de anuncios */}
      <div className="anuncio-card">
        {!anuncios ?
          <p>No hay anuncios</p>
          :
          anuncios.map((a) => (
            <div key={a.id} className="anuncio-card">
              <div className="anuncio-info">
                <h3>{a.titulo}</h3>
                <p>{a.contenido}</p>
                <small>
                  🎯 Rol: {a.rol} | 📍 Ubicación: {a.ubicacion}
                </small>
              </div>
              <Button p_onClick={() => eliminarAnuncio(a.id)} p_texto="Eliminar"></Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminAnuncios;
