import { Navigate, Outlet } from 'react-router-dom';
const obtenerRolUsuario = () => {
    const rol = localStorage.getItem('tipo');
    return rol;
}

const RutaProtegida = ({ rolRequerido }) => {
    const rolActual = obtenerRolUsuario();
    if (!rolActual) {
        // Si no está logueado, lo envía al login
        return <Navigate to="/login" replace />;
    }

    // 2. Verificar Autorización (¿tiene el rol correcto?)
    if (rolActual !== rolRequerido) {
        // Si tiene un rol, pero no el correcto, lo envía a su panel principal
        // Opcional: Podrías enviarlo a una página 403 (Acceso Denegado)
        return <Navigate to={`/${rolActual}/dashboard`} replace />;
    }

    // 3. Acceso Permitido
    // Outlet renderiza el componente hijo de la ruta (el Panel)
    return <Outlet />;
};

export default RutaProtegida;