import './main.css';

import { Routes, Route, Link } from 'react-router';

import Chat from './Chat';
import Anuncios from './Anuncios';
import Quejas from './Quejas';
import Votaciones from './Votaciones';

const Main = () => {
    return (
        <div style={{width:'100%', maxWidth:'800px', margin:'0 auto'}}>
            <h2 className="logo">Comunicacion Interna Abitare</h2>
            <nav className='residente-nav-chat'>
                <ul className='residente-nav-chat-list'>
                    <li className='residente-chat-list-item'>
                        <Link to="/residente/dashboard/chat">Chat</Link></li>
                    <li className='residente-chat-list-item'>
                        <Link to="/residente/dashboard/chat/anuncios">Anuncios</Link>
                    </li>
                    <li className='residente-chat-list-item'>
                        <Link to="/residente/dashboard/chat/quejas">Quejas</Link>
                    </li>
                    <li className='residente-chat-list-item'>
                        <Link to="/residente/dashboard/chat/votaciones">Votaciones</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Chat />} />
                <Route path='anuncios' element={<Anuncios />} />
                <Route path='quejas' element={<Quejas />} />
                <Route path='votaciones' element={<Votaciones />} />
            </Routes>
        </div>
    )
}

export default Main
