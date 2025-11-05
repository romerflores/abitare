import { useState } from "react";
import Button from "../../../components/Button/Button";
import CardModal from "../../../components/CardModal/CardModal";
import ColorText from "../../../components/ColorText/ColorText";
import Title from "../../../components/Title/Title";
import { imgRoutes } from "../../../utils/assetRoutes";

export default function PagarQR({ p_close = () => { }, p_idReserva }) {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async () => {

        if (!file) return setMsg("Selecciona un comprobante antes de continuar.");

        setLoading(true);
        setMsg("");
        try {
            const formData = new FormData();
            formData.append("id_reserva", p_idReserva);
            formData.append("fotografia", file);

            const res = await fetch("https://abitare-back-production.up.railway.app/api/area-comun/residente/pagar", {
                method: "PUT",
                credentials: "include", // mantiene cookies / sesión
                body: formData, // multer lo interpreta como multipart/form-data
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Error al procesar el pago");

            setMsg("✅ Pago registrado correctamente");
            setTimeout(() => p_close(), 1500);
        } catch (err) {
            setMsg("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardModal p_close={p_close} p_closeText="Cerrar">
            <Title p_text="Proceder con el pagos" p_sz={2} />
            <img src={imgRoutes.QR} alt="QR de pago" className="mx-auto my-2 w-48" />
            <ColorText p_text="Subir comprobante" p_type="warning" />
            <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
            />
            <Button
                p_texto={loading ? "Subiendo..." : "Confirmar"}
                p_onClick={handleSubmit}
            />
            {msg && (
                <p style={{ marginTop: "10px", color: msg.startsWith("❌") ? "red" : "green" }}>
                    {msg}
                </p>
            )}
        </CardModal>
    );
}
