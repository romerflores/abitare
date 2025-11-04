import { useEffect, useState } from 'react'

/* const formatSalario = (salario) => {
    return `$${salario.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}; */


const VerPersonal = ({ id }) => {

    const styles = {
        card: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
        },
        pi: {
            display:'block',
            fontSize: '2em',
            width:'min-content',
            margin: '0 auto',
            padding:'10px'
        },
        header: {
            textAlign: 'center',
            color: '#333',
            borderBottom: '2px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        section: {
            marginBottom: '25px',
            padding: '15px',
            borderLeft: '4px solid #007bff',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px'
        },
        sectionHeader: {
            color: '#007bff',
            marginBottom: '10px',
            marginTop: '0'
        },
        salario: {
            fontWeight: 'bold',
            color: '#28a745'
        },
        time: {
            fontWeight: 'bold',
            color: '#dc3545'
        },
        // Añade más estilos para una interfaz más atractiva
    };


    const [personal, setPersonal] = useState(null);

    useEffect(() => {
        const obtenerPersonal = async (id_param) => {
            try {
                const conexion = await fetch(`http://localhost:10000/api/administrador/obtener-personal/:${id_param}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const datos = await conexion.json();
                console.log(datos)
                setPersonal(datos.personal);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerPersonal(id)
    }, [])

    console.log(personal);

    return (
        <div style={styles.card}>
            <span className='pi pi-user' style={styles.pi}></span>
            <h2 style={styles.header}>Información del Personal </h2>
            {personal &&
                <>

                    <div style={styles.section}>
                        <h3 style={styles.sectionHeader}>Datos Personales</h3>
                        <p><strong>Nombre Completo:</strong> {personal.nombres} {personal.paterno} {personal.materno}</p>
                        <p><strong>C.I.:</strong> {personal.ci}</p>
                        <p><strong>Celular:</strong> {personal.celular}</p>
                        <p><strong>Correo:</strong> <a href={`mailto:${personal.email}`}>{personal.email}</a></p>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionHeader}>Datos Laborales</h3>
                        <p><strong>Salario:</strong> <span style={styles.salario}>{personal.salario}</span></p>
                        <p><strong>Disponibilidad:</strong> {personal.estado_disponible?'Activo':'Inactivo'}</p>
                        <p><strong>Fecha Contratación:</strong> {personal.fecha_contratacion.slice(0,10).split('-').reverse().join('-')}</p>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionHeader}>Horario</h3>
                        <p><strong>Hora de Entrada:</strong> <span style={styles.time}>{personal.hora_entrada}</span></p>
                        <p><strong>Hora de Salida:</strong> <span style={styles.time}>{personal.hora_salida}</span></p>
                    </div>
                </>
            }
        </div>
    );

}

export default VerPersonal
