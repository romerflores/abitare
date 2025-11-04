import { useEffect, useState } from "react";
import API from "../../../api/api";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { FaVoteYea } from "react-icons/fa";
import "./Votaciones.css";

function Votaciones() {
  const [votaciones, setVotaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votado, setVotado] = useState({}); // para evitar múltiples votos

  useEffect(() => {
    API.get("/votaciones")
      .then((res) => setVotaciones(res.data))
      .finally(() => setLoading(false));
  }, []);

  const votar = async (id, opcion) => {
    if (votado[id]) return alert("Ya votaste en esta encuesta 🛑");

    try {
      const res = await API.patch(`/votaciones/${id}/votar`, { opcion });
      const actualizadas = votaciones.map((v) =>
      v.id === id ? { ...v, votos: res.data.votos } : v
      );

      setVotaciones(actualizadas);
      setVotado({ ...votado, [id]: true });
        alert("✅ Voto registrado");
    } catch (err) {
      alert("❌ Error al votar");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando encuestas...</p>;

return (
  <div className="votaciones-container">
    <h2 className="votaciones-titulo">
      <FaVoteYea /> Encuestas y Votaciones
    </h2>

    {loading ? (
      <p className="votaciones-cargando">Cargando encuestas...</p>
    ) : votaciones.length === 0 ? (
      <p className="votaciones-vacio">No hay votaciones activas en este momento.</p>
    ) : (
      <div className="votaciones-lista">
        {votaciones.map((v) => (
          <div key={v.id} className="votacion-card">
            <h3 className="votacion-pregunta">{v.pregunta}</h3>

            <div className="votacion-opciones">
              {v.opciones.map((op, i) => (
                <button
                  key={i}
                  onClick={() => votar(v.id, op)}
                  disabled={votado[v.id]}
                  className={`votacion-boton ${votado[v.id] ? "votacion-boton-disabled" : ""}`}
                >
                  {op}
                </button>
              ))}
            </div>

            {v.votos && (
              <div className="votacion-resultados">
                <p><strong>Resultados:</strong></p>
                <ul>
                  {Object.entries(v.votos).map(([op, count]) => (
                    <li key={op}>
                      {op}: {count} voto{count !== 1 ? "s" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Votaciones;
