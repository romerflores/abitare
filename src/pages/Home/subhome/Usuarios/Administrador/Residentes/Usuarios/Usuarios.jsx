import './Usuarios.css';

import { useState } from "react"
import NavOpciones from '../../Componentes/NavOpciones/NavOpciones';
import Residentes from './Residentes/Residentes';

/* import AreaComun from '../../../Home/subhome/AreaComun/AreaComun';
import Parqueo from '../../../Home/subhome/Parqueo/Parqueo'; */
import CrearUsuario from '../CrearUsuario/CrearUsuario';
import Personal from '../../Personal/Personal';
import RegistrarPersonal from '../../Personal/Opciones/Registrar/RegistrarPersonal';
import Visita from '../../Visitante/Visita';
import RegistroVisitas from '../../Visitante/RegistroVisitas/RegistroVisitas';

const Usuarios = () => {

  const [pageSelected, setPageSelected] = useState("residentes")

  const renderPage = () => {
    switch (pageSelected) {
      case "registrar-usuario":
        return <CrearUsuario />
      case "registrar-personal":
        return <RegistrarPersonal />
      case "registrar-visita":
        return <Visita/>
      case "residentes":
        return <Residentes />
      case "visitantes":
        return <RegistroVisitas />
      case "personal":
        return <Personal />
      default:
        break;
    }
  }


  return (
    <main className='panel-admin-usuarios'>
      <NavOpciones setPage={setPageSelected} />
      <div className="admin-usuarios-screen">
        {renderPage()}
      </div>
    </main>
  )
}

export default Usuarios;
