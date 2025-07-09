import { useState } from 'react';
import '../styles/EntradaGeneral.css';

export default function EntradaGeneral() {
  const [nombre, setNombre] = useState('');
  const [registros, setRegistros] = useState([]);

  const registrarEntrada = () => {
    if (nombre.trim() !== '') {
      const nuevoRegistro = {
        nombre,
        fecha: new Date().toLocaleString()
      };
      setRegistros([...registros, nuevoRegistro]);
      setNombre('');
    }
  };

  return (
    <div className="entrada-container">
      <h2>Registro de Entrada General</h2>
      <div className="entrada-form">
        <input
          type="text"
          placeholder="Nombre del visitante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button onClick={registrarEntrada}>Registrar</button>
      </div>

      <div className="registros-list">
        <h3>Entradas registradas:</h3>
        <ul>
          {registros.map((reg, i) => (
            <li key={i}>
              <span>{reg.nombre}</span>
              <span>{reg.fecha}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}