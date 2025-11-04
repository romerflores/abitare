import { useState, useEffect } from "react";
import API from "../../../api/api";

function Quejas() {
  const [quejas, setQuejas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [anonimo, setAnonimo] = useState(false);

  const cargarQuejas = async () => {
    const res = await API.get("/quejas");
    setQuejas(res.data);
  };

  const enviarQueja = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return alert("El mensaje no puede estar vacío");

    await API.post("/quejas", { usuario: anonimo ? "Anónimo" : nombre, mensaje });

    setMensaje("");
    setNombre("");
    setAnonimo(false);
    cargarQuejas();
  };

  useEffect(() => {
    cargarQuejas();
  }, []);

  return (
    <div style={{ padding: "2rem"}}>
      <h1 style={{ color: "#485F73" }}>📩Buzón de Quejas y Sugerencias</h1>

      <form
        onSubmit={enviarQueja}
        style={{
          background: "#AAC2A8",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        {!anonimo && (
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid #90A680",
              borderRadius: "5px",
            }}
          />
        )}

        <textarea
          placeholder="Escribe tu queja o sugerencia..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
            border: "1px solid #90A680",
            borderRadius: "5px",
          }}
        ></textarea>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={anonimo}
            onChange={(e) => setAnonimo(e.target.checked)}
          />
          Enviar de forma anónima
        </label>

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            background: "#498C86",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "0.7rem 1.5rem",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>

      <h2 style={{ color: "#485F73", marginBottom: "1rem" }}> Quejas Recientes</h2>
      {quejas.length === 0 ? (
        <p>No hay quejas registradas.</p>
      ) : (
        quejas.map((q) => (
          <div
            key={q.id}
            style={{
              background: "#E7EFE7",
              border: "1px solid #AAC2A8",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h4>{q.usuario}</h4>
            <p>{q.mensaje}</p>
            <small>
              📅 {new Date(q.fecha).toLocaleDateString("es-BO")}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Quejas;