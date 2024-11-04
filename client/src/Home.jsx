import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Bienvenido a tu Gestor de Artículos</h1>
            <div className="button-group">
                <Link to="/myprofile" className="btn btn-main">
                    Mis artículos
                </Link>
                <Link to="/new" className="btn btn-main">
                    Crear artículo
                </Link>
            </div>
        </div>
    );
}

export default Home;
