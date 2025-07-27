import '../styles/Home.css';
import LogoAgencia from '../assets/LOGOAGENCIA.png';
import LogoMUCH from '../assets/LogoMUCH2.png';

export default function Home() {
  return (
    <div className="home-container">
      <h2>Bienvenidos al Museo Chiapas de Ciencia y Tecnología (MUCH)</h2>
      <p>Selecciona una opción en el menú para comenzar.</p>
      <div className="logos">
        <img src={LogoMUCH} alt="Logo MUCH" className='logo1' />
        <img src={LogoAgencia} alt="Logo Agencia" className='logo1' />
      </div>
    </div>
  );
}