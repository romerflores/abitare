import { useState, useEffect } from 'react';

function RegistroConsumo({ id }) {
    
    const [servicios, setServicios] = useState(null);
    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const conexion = await fetch('http://localhost:10000/api/consumo/servicios');
                const respuesta = await conexion.json();
                if (!conexion.ok) throw new Error(respuesta.message);
                setServicios(respuesta.servicio);
            } catch (e) {
                console.error(e.message);
            }
        }
        obtenerServicios();
    }, [])

    // Costos por unidad (simulados)
    const COSTO_BASE = {
        agua: servicios && servicios[0].costo_por_unidad || 1.50,
        luz: servicios && servicios[1].costo_por_unidad,
        gas: servicios && servicios[2].costo_por_unidad
    };

    const [departamento, setDepartamento] = useState(null);

    const [formData, setFormData] = useState({
        departamento: id,
        fechaRegistro: new Date().toISOString().substring(0, 10),
        servicio: servicios && servicios[0].nombre_servicio || 'agua',
        medidaRegistro: '',
        costoPorMedida: COSTO_BASE['agua'],
        totalConsumo: 0,
    });

    useEffect(() => {
        const { medidaRegistro, servicio } = formData;

        const nuevoCosto = COSTO_BASE[servicio] || 0;
        const medida = parseFloat(medidaRegistro) || 0;

        const nuevoTotal = (medida * nuevoCosto);

        setFormData(prevData => ({
            ...prevData,
            costoPorMedida: nuevoCosto,
            totalConsumo: nuevoTotal.toFixed(2),
        }));

    }, [formData.medidaRegistro, formData.servicio]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const conexion = await fetch('http://localhost:10000/api/consumo/registrar-consumo', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials:'include'
            });
            const respuesta = await conexion.json();
            if (conexion.status == 400) throw new Error(respuesta.message);
            
            alert(`Registro de ${formData.servicio} para ${formData.departamento} guardado.\nTotal: ${formData.totalConsumo} Bs.`);

            setFormData(prevData => ({
                ...prevData,
                medidaRegistro: '',
                totalConsumo: 0,
            }));

            window.location.reload();
        } catch (e) {
            console.error(e.message);
        }
    };

    const getUnidad = (servicio) => {
        switch (servicio) {
            case 'agua':
                return 'L';
            case 'luz':
                return 'kWh';
            case 'gas':
                return 'm^3';
            default:
                return 'Unidad';
        }
    };

    return (
        <form className="registro-form" onSubmit={handleSubmit}>

            {/* 1. Departamento (select) */}
            <div className="form-group">
                <label htmlFor="departamento">Departamento:</label>
                <input type="text" id='departamento' disabled value={id}/>
            </div>

            {/* (e)=>setDepartamento(e.target.value) */}

            {/* 2. Fecha del registro */}
            <div className="form-group">
                <label htmlFor="fechaRegistro">Fecha del Registro:</label>
                <input
                    type="date"
                    id="fechaRegistro"
                    name="fechaRegistro"
                    value={formData.fechaRegistro}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* 3. Servicio (agua, luz, gas) */}
            <div className="form-group">
                <label htmlFor="servicio">Servicio:</label>
                <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                >
                    <option value="agua">Agua 💧</option>
                    <option value="luz">Luz 💡</option>
                    <option value="gas">Gas 🔥</option>
                </select>
            </div>

            <hr />

            {/* 4. Medida del registro */}
            <div className="form-group">
                <label htmlFor="medidaRegistro">
                    Medida Registrada ({getUnidad(formData.servicio)}):
                </label>
                <input
                    type="number"
                    id="medidaRegistro"
                    name="medidaRegistro"
                    placeholder={`Ingresa la medida en ${getUnidad(formData.servicio)}`}
                    value={formData.medidaRegistro}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            {/* 5. Costo por cada medida (Informativo, calculado automáticamente) */}
            <div className="form-group info-group">
                <label>Costo por Unidad:</label>
                <p className="costo-display">
                    Bs {formData.costoPorMedida}/{getUnidad(formData.servicio)}
                </p>
            </div>

            {/* 6. Total del consumo (Calculado automáticamente) */}
            <div className="form-group total-group">
                <label>Total del Consumo:</label>
                <p className="total-display">
                    Bs {formData.totalConsumo} 
                </p>
            </div>

            <button type="submit" className="submit-btn">
                Guardar Registro 💾
            </button>
        </form>
    );
}

export default RegistroConsumo;