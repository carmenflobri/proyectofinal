import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login'; // Asegúrate de importar el CSS

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    // Define la URL de la API usando la variable de entorno
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSumit = (e) => {
        e.preventDefault();
        // Utiliza API_URL en lugar de la URL hardcoded
        axios.post(`${API_URL}/login`, { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSumit}>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-input rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-input rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-submit w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="register-text">¿Ya tienes cuenta?</p>
                <Link to="/register" className="btn-register border w-100 bg-light rounded-0 text-decoration-none">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
