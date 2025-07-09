import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './data/AuthContext'; // Agrega useAuth aquí
import Navbar from './components/Navbar';
import Home from './components/Home';
import EntradaGeneral from './components/EntradaGeneral';
import VisitasEscolares from './components/VisitasEscolares';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import ProtectedRoute from './data/ProtectedRoute';
import './styles/styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            {/* Ruta raíz muestra Login y redirige si ya está autenticado */}
            <Route path="/" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            {/* Home ahora es una ruta protegida */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            {/* Rutas existentes protegidas */}
            <Route path="/entrada-general" element={
              <ProtectedRoute>
                <EntradaGeneral />
              </ProtectedRoute>
            } />
            
            <Route path="/visitas-escolares" element={
              <ProtectedRoute>
                <VisitasEscolares />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Redirección para rutas no definidas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Componente para rutas públicas (redirige si ya está autenticado)
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

export default App;