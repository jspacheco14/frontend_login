import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWasteLogs } from '../api';

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Fetch waste logs
    useEffect(() => {
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

    return (
        <div>
            <h2>Registros de Inferencias de residuos</h2>
            <button onClick={handleLogout}>Logout</button>
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
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.category}</td>
                            <td>{log.probability}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;