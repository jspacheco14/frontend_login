import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUserForm = () => {
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/auth/list-users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Error al obtener usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/auth/create-user', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Usuario creado correctamente');
      setNewUser({ username: '', password: '', role: 'user' });
      fetchUsers(); // Actualiza lista
    } catch (error) {
      toast.error('Error al crear usuario');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div className="create-user-container">
        {/* Formulario de creación */}
        <div className="form-section">

          <h3>Crear nuevo usuario</h3>
          <form onSubmit={handleCreateUser}>
            <input
                type="text"
                placeholder="Usuario"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
            />
            <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>

            <button type="submit">Crear usuario</button>

            {/* 👇 Botón para volver al dashboard (debajo del formulario) */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                onClick={() => navigate('/dashboard')}
                className="return-dashboard-btn"
                type="button"
                >
                Volver al Dashboard
                </button>
            </div>
            </form>

        </div>

        {/* Tabla de usuarios existentes */}
        <div className="user-list-section">
          <h4>Usuarios existentes</h4>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateUserForm;
