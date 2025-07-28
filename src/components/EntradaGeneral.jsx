import { useEffect } from 'react'; // Asegúrate de tenerlo arriba
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom/client';
import '../styles/EntradaGeneral.css';

export default function EntradaGeneral() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [estado, setEstado] = useState('');
  const [telefono, setTelefono] = useState('');
  const [registros, setRegistros] = useState([]);

  const estadosMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
    'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
    'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
    'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
    'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  const registrarEntrada = async () => {
    const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumerosRegex = /^\d{10}$/;

    if (!nombre.trim() || !soloLetrasRegex.test(nombre)) {
      alert('El nombre solo debe contener letras y espacios.');
      return;
    }

    if (!edad || isNaN(edad) || edad <= 0) {
      alert('Ingrese una edad válida.');
      return;
    }

    if (!genero) {
      alert('Seleccione un género.');
      return;
    }

    if (!estado) {
      alert('Seleccione un estado.');
      return;
    }

    if (!telefono.trim() || !soloNumerosRegex.test(telefono)) {
      alert('El teléfono debe tener exactamente 10 dígitos numéricos.');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      nombre,
      edad,
      genero,
      estado,
      telefono,
      fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    // Guardar en frontend
    setRegistros([...registros, nuevoRegistro]);

    // Limpiar inputs
    setNombre('');
    setEdad('');
    setGenero('');
    setEstado('');
    setTelefono('');

    // Guardar en base de datos
    try {
      const res = await fetch('http://localhost:3001/api/entradas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoRegistro)
      });

      if (res.ok) {
        console.log('Registro guardado en base de datos');
      } else {
        alert('Error al guardar en base de datos');
      }
    } catch (error) {
      alert('No se pudo conectar al servidor');
      console.error(error);
    }
  };

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/entradas');
        const data = await res.json();
        setRegistros(data);
      } catch (error) {
        console.error('Error al obtener registros:', error);
      }
    };

    obtenerRegistros();
  }, []);


  const descargarQR = (registro) => {
    const qrContainer = document.createElement('div');
    qrContainer.style.position = 'fixed';
    qrContainer.style.left = '-10000px';
    qrContainer.style.top = '0px';
    document.body.appendChild(qrContainer);

    const root = ReactDOM.createRoot(qrContainer);
    root.render(
      <QRCodeCanvas
        value={JSON.stringify(registro)}
        size={250}
        level="H"
        includeMargin={true}
      />
    );

    setTimeout(async () => {
      const canvas = qrContainer.querySelector('canvas');
      if (!canvas) {
        alert('Error al generar el código QR.');
        root.unmount();
        document.body.removeChild(qrContainer);
        return;
      }
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
      pdf.addImage(imgData, 'PNG', 60, 90, 90, 90);
      pdf.save(`QR_${registro.nombre.replace(/\s/g, '_')}.pdf`);

      root.unmount();
      document.body.removeChild(qrContainer);
    }, 300);
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
          placeholder="Número de contacto (10 dígitos)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10))}
        />
        <button onClick={registrarEntrada}>Registrar</button>
      </div>

      <div className="registros-list">
        <h3>Entradas registradas:</h3>
        <ul>
          {registros.map((reg) => (
            <li key={reg.id}>
              <strong>{reg.nombre}</strong> | Edad: {reg.edad} | Género: {reg.genero} | Estado: {reg.estado} | Tel: {reg.telefono} | <em>{reg.fecha}</em>
              <br />
              <button onClick={() => descargarQR(reg)}>Descargar QR</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
