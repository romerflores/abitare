import './CardUser.css';

const CardUser = ({ usuario, opciones }) => {
    return (
        <div className='container-card'>
            <div className="card-imagen">
                <img src="https://static.vecteezy.com/system/resources/previews/006/326/393/non_2x/penguin-cartoon-colored-aanimal-illustration-free-vector.jpg" alt={`Imagen del usuario ${usuario.id_residente}`} />
            </div>
            <div className='card-usuario'>
                <div className="card-usuario-datos">
                    <h2>{`${(usuario.nombre) || (usuario.nombres)} ${usuario.paterno} ${usuario.materno}`}</h2>
                    <h3>{usuario.correo || usuario.email}</h3>
                    <h4>CI: {usuario.ci}</h4>
                </div>
                <div className="card-usuario-registro">
                    <span>{usuario.id_residente || `ID personal: ${usuario.id_personal}`}</span>
                    <span>{usuario.id_departamento || `Cel: ${usuario.celular}`}</span>
                </div>
            </div>
            <div className="card-usuario-opciones">
                <>
                    {opciones.map(opcion => (
                        opcion
                    ))}
                </>
            </div>
        </div>
    )
}

export default CardUser;