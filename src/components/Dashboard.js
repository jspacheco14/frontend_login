import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWasteLogs } from '../api';
import { decodeToken } from "react-jwt";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const [userData, setUserData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.info('Sesión cerrada correctamente');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            setUserData(decoded);
        }

        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const wasteLogs = await getWasteLogs(token);
                setLogs(wasteLogs);
            } catch (error) {
                console.error('Error fetching logs:', error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };
        fetchLogs();
    }, []);

    // Calcular el rango de residuos que se muestran en la página actual
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const totalPages = Math.ceil(logs.length / logsPerPage);

    return (
        <div>
            <div className="dashboard-header">
                <h2>Registros de Inferencias de residuos</h2>
                {userData.user_data ? `${userData.user_data.role.name} - ${userData.user_data.username}` : 'Unknown'}
                {userData.user_data?.role?.name === 'admin' && (
                    <button
                        className="admin-create-btn"
                        onClick={() => navigate('/crear-usuario')}
                    >
                        Crear usuario
                    </button>
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Probability</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLogs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.category}</td>
                            <td>{log.probability}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-wrapper">
                <table>
                    {/* ... tabla ... */}
                </table>

                <div className="pagination-container">
                    <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    >
                    ← Anterior
                    </button>

                    <span className="pagination-label">
                    Página {currentPage} de {totalPages}
                    </span>

                    <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    >
                    Siguiente →
                    </button>
                </div>
                </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Dashboard;
