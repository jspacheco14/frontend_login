import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            toast.success('Inicio de sesión exitoso');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Clasificación de Residuos</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;

