// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'



import './App.css'
import 'primereact/resources/themes/lara-light-amber/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Routes, Route, Navigate } from 'react-router'


import Login from './pages/Usuario/Login/Login';
import ConfirmCode from './pages/Usuario/ConfirmCode/ConfirmCode';
import CambioPrimeraVez from './pages/Usuario/CambioPrimeraVez/CambioPrimeraVez';
import ChangePassword from './pages/Usuario/ChangePassword/ChangePassword';
import CambioContrasenia from './pages/Usuario/CambioContrasenia/CambioContrasenia';


import Home from './pages/Home/Home';
import PanelResidente from './pages/PanelResidente/PanelResidente';
import PanelTecnico from './pages/PanelTecnico/PanelTecnico';

import RutaProtegida from './Redirigir';
import Redirigir from './Redirigir';

function PrivateRoute({ children, p_tipoUsuario = "" }) {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("tipo"))
  return (token && localStorage.getItem("tipo") == p_tipoUsuario) ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='verificar' element={<ConfirmCode />} />
        <Route path='cambio-primera-vez' element={<CambioPrimeraVez />} />
        <Route path='validar-clave' element={<ChangePassword />} />
        <Route path='cambiar-clave' element={<CambioContrasenia />} />
        <Route
          path="/administrador/*"
          element={
            <PrivateRoute p_tipoUsuario='administrador'>
              <Routes>
                <Route path='dashboard/*' element={<Home />} />
                <Route path='*' element={<Navigate to={'/administrador/dashboard'} replace/>}/>
              </Routes>
            </PrivateRoute>
          }
        />

        <Route
          path="/residente/*"
          element={
            <PrivateRoute p_tipoUsuario='residente'>
              <Routes>
                <Route path='dashboard/*' element={<PanelResidente />} />
                <Route path='*' element={<Navigate to={'/residente/dashboard'} replace/>}/>
              </Routes>
            </PrivateRoute>
          }
        />
        <Route
          path="/tecnico/*"
          element={
            <PrivateRoute p_tipoUsuario='personal'> {/*Cambiar aca si el nombre es otro*/}
              <Routes>
                <Route path='dashboard/*' element={<PanelTecnico />} />
                <Route path='*' element={<Navigate to="/tecnico/dashboard" replace />}/>
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to={"/login"} replace></Navigate>} />
        <Route path="/*" element={<Redirigir/>} />

      </Routes>
    </>
  )
}

export default App



{/* <>

      <section className='content-container'>

        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='verificar' element={<ConfirmCode />} />
          <Route path='cambioPrimeraVez' element={<CambioPrimeraVez />} />
          <Route path='validar-clave' element={<ChangePassword />} />
          <Route path='cambiar-clave' element={<CambioContrasenia />} />
          <Route path='/administrador/dashboard/*' element={<Home />} />
          <Route path='*' element={<Navigate to="/login" replace />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute p_tipoUsuario='administrador'>
                <Routes>
                  <Route path='home' element={<Home />} />
                </Routes>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <PrivateRoute p_tipoUsuario='residente'>
                <Routes>
                  <Route path='home' element={<UserHome />} />
                </Routes>
              </PrivateRoute>
            }
          />

        </Routes>
      </section >

    </> */}