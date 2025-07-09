import { useState } from 'react';
import '../styles/VisitasEscolares.css';

export default function VisitasEscolares() {
  const [solicitud, setSolicitud] = useState({
    escuela: '',
    fecha: '',
    nivel: '',
    grado: '',
    grupo: '',
    docente: '',
    telefono: '',
    alumnos: ''
  });

  const [visitas, setVisitas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombresAlumnos, setNombresAlumnos] = useState([]);
  const [visitasConListaVisible, setVisitasConListaVisible] = useState([]);

  const enviarSolicitud = () => {
    const cantidad = parseInt(solicitud.alumnos);
    if (solicitud.escuela && solicitud.fecha && solicitud.nivel && solicitud.docente) {
      if (cantidad > 0) {
        setNombresAlumnos(Array(cantidad).fill(''));
        setMostrarModal(true);
      } else {
        setVisitas([...visitas, solicitud]);
        resetFormulario();
      }
    }
  };

  const confirmarNombres = () => {
    const nuevaVisita = { ...solicitud, lista: nombresAlumnos };
    setVisitas([...visitas, nuevaVisita]);
    resetFormulario();
    setNombresAlumnos([]);
    setMostrarModal(false);
  };

  const resetFormulario = () => {
    setSolicitud({
      escuela: '',
      fecha: '',
      nivel: '',
      grado: '',
      grupo: '',
      docente: '',
      telefono: '',
      alumnos: ''
    });
  };

  const toggleListaAlumnos = (index) => {
    if (visitasConListaVisible.includes(index)) {
      setVisitasConListaVisible(visitasConListaVisible.filter(i => i !== index));
    } else {
      setVisitasConListaVisible([...visitasConListaVisible, index]);
    }
  };

  return (
    <div className={`visitas-container ${mostrarModal ? 'desplazar-contenedor' : ''}`}>
      <h2>Registro de Visitas Escolares</h2>

      <div className="visitas-form">
        <div className="form-group">
          <label>Nombre de la escuela</label>
          <input
            type="text"
            placeholder="Nombre de la escuela"
            value={solicitud.escuela}
            onChange={(e) => setSolicitud({ ...solicitud, escuela: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de visita</label>
          <input
            type="date"
            value={solicitud.fecha}
            onChange={(e) => setSolicitud({ ...solicitud, fecha: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Nivel educativo</label>
          <select
            value={solicitud.nivel}
            onChange={(e) => setSolicitud({ ...solicitud, nivel: e.target.value })}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Preescolar">Preescolar</option>
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="Universidad">Universidad</option>
          </select>
        </div>

        <div className="form-group">
          <label>Grado</label>
          <input
            type="text"
            placeholder="Ej. Tercero"
            value={solicitud.grado}
            onChange={(e) => setSolicitud({ ...solicitud, grado: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Grupo</label>
          <input
            type="text"
            placeholder="Ej. A"
            value={solicitud.grupo}
            onChange={(e) => setSolicitud({ ...solicitud, grupo: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Cantidad de alumnos</label>
          <input
            type="number"
            placeholder="Ej. 30"
            value={solicitud.alumnos}
            onChange={(e) => setSolicitud({ ...solicitud, alumnos: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Docente responsable</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={solicitud.docente}
            onChange={(e) => setSolicitud({ ...solicitud, docente: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono de contacto</label>
          <input
            type="tel"
            placeholder="Número de teléfono"
            value={solicitud.telefono}
            onChange={(e) => setSolicitud({ ...solicitud, telefono: e.target.value })}
          />
        </div>

        <button className="submit-button" onClick={enviarSolicitud}>Crear Registro</button>
      </div>

      <div className="solicitudes-list">
        <h3>Registros realizados:</h3>
        <ul>
          {visitas.map((v, i) => (
            <li key={i}>
              <div className="visita-info">
                <div className="visita-header">
                  <span className="escuela">{v.escuela}</span>
                  <span className="fecha">{v.fecha}</span>
                </div>
                <div className="visita-details">
                  <span><strong>Nivel:</strong> {v.nivel}</span>
                  <span><strong>Grado/Grupo:</strong> {v.grado} {v.grupo}</span>
                  <span><strong>Alumnos:</strong> {v.alumnos}</span>
                  <span><strong>Docente:</strong> {v.docente}</span>
                  <span><strong>Teléfono:</strong> {v.telefono}</span>
                </div>
                {v.lista && (
                  <>
                    <button 
                      className="ver-lista-button" 
                      onClick={() => toggleListaAlumnos(i)}
                    >
                      {visitasConListaVisible.includes(i) ? 'Ocultar listado' : 'Ver listado de alumnos'}
                    </button>
                    {visitasConListaVisible.includes(i) && (
                      <div className="visita-lista">
                        <strong>Lista de alumnos</strong>
                        <ul>
                          {v.lista.map((nombre, j) => (
                            <li key={j}>{nombre || `Alumno ${j + 1} (sin nombre)`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Lista de alumnos ({nombresAlumnos.length})</h3>
            <div className="alumnos-lista">
              {nombresAlumnos.map((nombre, index) => (
                <div key={index} className="form-group">
                  <label>Alumno {index + 1}</label>
                  <input
                    type="text"
                    placeholder={`Nombre del alumno ${index + 1}`}
                    value={nombre}
                    onChange={(e) => {
                      const nuevosNombres = [...nombresAlumnos];
                      nuevosNombres[index] = e.target.value;
                      setNombresAlumnos(nuevosNombres);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={confirmarNombres} className="submit-button">Guardar</button>
              <button onClick={() => setMostrarModal(false)} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}