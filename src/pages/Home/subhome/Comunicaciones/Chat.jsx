import { useState, useEffect } from "react";
import API from "../../../../api/api";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import "./Chat.css"; // 👈 asegúrate de tener este archivo para el estilo

function Chat() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      const res = await API.get("/chat");
      setMensajes(res.data);
    } catch (error) {
      console.error("Error al cargar mensajes", error);
    }
  };

  const usuario = localStorage.getItem("id") || "Anónimo";

  const enviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    try {
      await API.post("/chat", {
        usuario: usuario, // puedes reemplazar con el usuario real
        mensaje: texto,
      });

      setTexto("");
      cargarMensajes();
    } catch (error) {
      console.error("Error al enviar mensaje", error);
    }
  };

  // 👇 este useEffect va DENTRO del componente
  useEffect(() => {
    const input = document.getElementById("chat-input");

    const handleEnter = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    };

    if (input) input.addEventListener("keydown", handleEnter);

    return () => {
      if (input) input.removeEventListener("keydown", handleEnter);
    };
  }, [texto]);

  return (
    <div className="chat-container">
      <h2>💬 Chat Comunitario</h2>

      <div className="chat-box">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`chat-message ${
              m.usuario === usuario ? "chat-right" : "chat-left"
            }`}
          >
            <div className="chat-username">{m.usuario}</div>
            <div className="chat-bubble">{m.mensaje}</div>
          </div> 
        ))}
      </div>

      <form
        className="chat-input-area"
        onSubmit={enviar}
      >
        <Input
          p_value={texto}
          p_placeHolder="Escribe un mensaje..."
          p_onChange={setTexto}
          p_text=""
          p_id="chat-input"
        />
        <Button type="submit" p_texto="Enviar"></Button>
      </form>
    </div>
  );
}

export default Chat;
