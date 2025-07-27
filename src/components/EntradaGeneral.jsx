import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/EntradaGeneral.css';

export default function EntradaGeneral() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [estado, setEstado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [registros, setRegistros] = useState([]);
  const qrRefs = useRef({});

  const estadosMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
    'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
    'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
    'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
    'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  const registrarEntrada = () => {
    if (nombre.trim() && edad && genero && estado && telefono.trim()) {
      const nuevoRegistro = {
        id: Date.now(),
        nombre,
        edad,
        genero,
        estado,
        telefono,
        fecha: new Date().toLocaleString()
      };
      setRegistros([...registros, nuevoRegistro]);

      // Limpiar campos
      setNombre('');
      setEdad('');
      setGenero('');
      setEstado('');
      setTelefono('');
    }
  };

  const descargarQR = async (registro) => {
    const qrElement = qrRefs.current[registro.id];
    const canvas = await html2canvas(qrElement);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Identificador de visitante", 20, 20);
    pdf.text(`Nombre: ${registro.nombre}`, 20, 30);
    pdf.text(`Edad: ${registro.edad}`, 20, 40);
    pdf.text(`Género: ${registro.genero}`, 20, 50);
    pdf.text(`Estado: ${registro.estado}`, 20, 60);
    pdf.text(`Tel: ${registro.telefono}`, 20, 70);
    pdf.text(`Fecha: ${registro.fecha}`, 20, 80);
    pdf.addImage(imgData, 'PNG', 20, 90, 100, 100);

    pdf.save(`QR_${registro.nombre.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div className="entrada-container">
      <h2>Registro de Entrada General</h2>

      <div className="entrada-form">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Seleccione género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Seleccione estado</option>
          {estadosMexico.map((estado, i) => (
            <option key={i} value={estado}>{estado}</option>
          ))}
        </select>
        <input
          type="tel"
          placeholder="Número de contacto"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button onClick={registrarEntrada}>Registrar</button>
      </div>

      <div className="registros-list">
        <h3>Entradas registradas:</h3>
        <ul>
          {registros.map((reg) => (
            <li key={reg.id}>
              <strong>{reg.nombre}</strong> | Edad: {reg.edad} | Género: {reg.genero} | Estado: {reg.estado} | Tel: {reg.telefono} | <em>{reg.fecha}</em>
              <div ref={(el) => (qrRefs.current[reg.id] = el)} style={{ marginTop: '10px' }}>
                <QRCodeCanvas
                  value={JSON.stringify(reg)}
                  size={128}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <button onClick={() => descargarQR(reg)}>Descargar QR</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
