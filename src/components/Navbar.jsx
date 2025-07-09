import { Link } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';
import '../styles/Navbar.css'; // Asegúrate de tener este archivo CSS

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {user && <Link to="/home">Inicio</Link>}
      {user && <Link to="/entrada-general">Entrada General</Link>}
      {user && <Link to="/visitas-escolares">Visitas Escolares</Link>}
      
      {user ? (
        <>
          {/* <Link to="/admin">Administrador</Link> */}
          <button onClick={logout} className="logout-button">
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
}