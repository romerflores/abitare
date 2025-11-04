import './registroIncidente.css';

import { useEffect, useState } from 'react'
import InputForm from '../../../components/inputAF/InputForm'
import Select from '../../../components/select/Select';
import InputFile from '../../../components/inputFiles/InputFile';

const RegistroIncidente = () => {
  const [niveles, setNiveles] = useState([]);

  useEffect(() => {
    const obtenerNiveles = async () => {
      try {
        const conexion = await fetch('http://localhost:10000/api/incidente/niveles');
        const datos = await conexion.json();
        datos.niveles.forEach(e => {
          setNiveles(nivel => [...nivel, e.nombre]);
        })
      } catch (e) {
        console.error(e);
      }
    }
    obtenerNiveles();
  }, [])

  const [tiposIncidentes, setTiposIncidentes] = useState([]);

  useEffect(() => {
    const obtenerTipos = async () => {
      try {
        const conexion = await fetch('http://localhost:10000/api/mantenimiento');
        const datos = await conexion.json();
        datos.activos.forEach(e => {
          setTiposIncidentes(tipo => [...tipo, e.tipo])
        })
        setMapIncidente(incidentes);
      } catch (e) {
        console.error(e);
      }
    }
    obtenerTipos();
  }, [])

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');
  const [nivel, setNivel] = useState('');
  const [filesAll, setFilesAll] = useState(null);


  const enviarIncidente = async (e) => {
    e.preventDefault();

    /* LLenar informacion del formulario */
    const formData = new FormData();

    if (filesAll) {
      for (let i = 0; i < filesAll.length; i++) {
        formData.append('files', filesAll[i]);
      }
    }

    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('nivel', nivel);
    formData.append('ubicacion', ubicacion);
    formData.append('tipo_incidente', tipo);
    try {
      const conexion = await fetch('http://localhost:10000/api/incidente/registrar-incidente', {
        method: 'POST',
        body: formData
      });
      const respuesta = await conexion.json();
      if (!conexion.ok) {
        alert(respuesta.message)
        window.location.reload();
      };
      if (conexion.status == 201) {
        alert(respuesta.message)
        setTitulo(null);
        setDescripcion(null);
        setNivel(null);
        setUbicacion(null);
        setTipo(null);
        setFilesAll(null);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <main className='s_incidente-form'>
      <form className='incidente-form' onSubmit={enviarIncidente}>
        <header className='incidente-form-header'>
          <h2>Reportar Nueva Incidencia</h2>
          <h5>Complete el formulario para registrar un nuevo reporte.</h5>
        </header>
        <div className="incidente-form-campos">
          <InputForm label_text={'Título'} input_id={'titulo'} input_name={'titulo'} input_type={'text'} input_value={titulo} set_input_value={setTitulo} input_placeholder={'Ej. Fuga de gas'} />
          <div className="incidente-campos-textarea">
            <label htmlFor="description">Descripcion</label>
            <textarea name="description" id="description" placeholder='Ej. El olor a gas proveniente de la tuberia cerca a la entrada es muy notorio' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
          <div className="incidente-campos-select">
            <Select label_text={'Nivel de la incidencia'} options={niveles} select_id={'nivel'} select_name={'nivel'} select_value={nivel} select_set_value={setNivel} />
            <InputForm label_text={'Ubicacion'} input_id={'ubicacion'} input_type={'text'} input_name={'ubicacion'} input_placeholder={'Ej. Pasillo del piso 5'} input_value={ubicacion} set_input_value={setUbicacion} />
            {/* <Select label_text={'Ubicacion'} options={ubicaciones} default_option={''} select_id={'ubicacion'} select_name={'ubicacion'} select_value={ubicacion} select_set_value={setUbicacion} /> */}
            <Select label_text={'Tipo de incidente'} options={tiposIncidentes} select_id={'tipo-incidente'} select_name={'tipo-incidente'} select_value={tipo} select_set_value={setTipo} />
          </div>
          <InputFile label_text={'Adjunte archivos (Fotos/videos)'} set_value={setFilesAll} />
        </div>
        <button className='incidente-form-btn'>Registrar Incidente</button>
      </form>
    </main>
  )
}

export default RegistroIncidente
