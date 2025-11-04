import { Link, Route, Routes } from "react-router"
import './main.css';

import Anuncios from "./Anuncios";
import AdminAnuncios from "./AdminAnuncios";
import AdminVotaciones from "./AdminVotaciones";
import Quejas from "./Quejas";
import Chat from "../../../PanelResidente/Comunicaciones/Chat";

const Main = () => {
    return (
        <div className="main-chat-admin">
            <nav className="admin-comunicacion-nav">
                <h2 className="logo">Comunicacion Interna Abitare</h2>
                <ul className="admin-comunicacion-list">
                    <li>
                        <Link to="/administrador/dashboard/admin-chat">Chat</Link>
                    </li>
                    <li className="admin-comunicacion-item">
                        <Link to="/administrador/dashboard/admin-anuncios">Anuncios</Link>
                    </li>
                    <li>
                        <Link to="/administrador/dashboard/admin-votaciones">Votaciones</Link>
                    </li>
                    <li>
                        <Link to="/administrador/dashboard/admin-quejas">Quejas</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<AdminAnuncios />} />
                <Route path="admin-anuncios" element={<AdminAnuncios />} />
                <Route path="admin-votaciones" element={<AdminVotaciones />} />
                <Route path="admin-quejas" element={<Quejas/>} />
                <Route path="admin-chat" element={<Chat/>} />
            </Routes>
        </div>
    )
}

export default Main
