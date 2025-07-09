import { useState } from 'react';
import '../styles/VisitasEscolares.css';

export default function VisitasEscolares() {
  const [solicitud, setSolicitud] = useState({ escuela: '', fecha: '' });
  const [visitas, setVisitas] = useState([]);

  const enviarSolicitud = () => {
    if (solicitud.escuela && solicitud.fecha) {
      setVisitas([...visitas, solicitud]);
      setSolicitud({ escuela: '', fecha: '' });
    }
  };

  return (
    <div className="visitas-container">
      <h2>Solicitud de Visitas Escolares</h2>
      <div className="visitas-form">
        <input
          type="text"
          placeholder="Nombre de la escuela"
          value={solicitud.escuela}
          onChange={(e) => setSolicitud({ ...solicitud, escuela: e.target.value })}
        />
        <input
          type="date"
          value={solicitud.fecha}
          onChange={(e) => setSolicitud({ ...solicitud, fecha: e.target.value })}
        />
        <button onClick={enviarSolicitud}>Enviar Solicitud</button>
      </div>

      <div className="solicitudes-list">
        <h3>Solicitudes recibidas:</h3>
        <ul>
          {visitas.map((v, i) => (
            <li key={i}>
              <span>{v.escuela}</span>
              <span>{v.fecha}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}