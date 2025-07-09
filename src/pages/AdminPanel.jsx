import '../styles/AdminPanel.css';

export default function AdminPanel() {
  return (
    <div className="admin-container">
      <h2>Panel del Administrador</h2>
      <p>En futuras versiones aquí se podrá:</p>
      <ul className="admin-features">
        <li>Confirmar visitas escolares</li>
        <li>Consultar histórico de entradas</li>
        <li>Ver agenda por fecha</li>
      </ul>
    </div>
  );
}