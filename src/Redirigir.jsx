import { Navigate } from 'react-router';


const Redirigir = () => {
    const rolActual = localStorage.getItem("tipo")
    const token=localStorage.getItem("token");
    // Si no está logueado, lo envía al login
    
    if(!token)return <Navigate to="/login" replace />;

    if (rolActual == "administrador") {
        alert("Xd")
        return <Navigate to={`/administrador/dashboard`} replace />;
    }
    
    if (rolActual == "residente") {
        return <Navigate to={`/residente/dashboard`} replace />;
    }
    
    if (rolActual == "personal") {
        return <Navigate to={`/tecnico/dashboard`} replace />;
    }
    return <Navigate to="/login" replace />;
};

export default Redirigir;