import { useEffect, useState } from "react";
import API from "../../../api/api";
import CardMessage from "../../../components/CardMessage/CardMessage";
import Button from "../../../components/Button/Button";

function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const res = await API.get("/anuncios");
        setAnuncios(res.data);
      } catch (err) {
        console.error("Error al cargar los anuncios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnuncios();
  }, []);

  if (loading) return <p>Cargando anuncios...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#485F73", fontSize: "2rem", marginBottom: "1rem" }}>
        📢 Anuncios del Edificio
      </h1>

      {anuncios.length === 0 ? (
        <p>No hay comunicados disponibles.</p>
      ) : (
        anuncios.map((anuncio) => (
          <div
            key={anuncio.id}
            style={{
              background: "#ffffffff",
              color: "#485F73",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{anuncio.titulo}</h3>
            <p>{anuncio.contenido}</p>
            <small>
              📅 {new Date(anuncio.fecha).toLocaleDateString("es-BO")}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Anuncios;