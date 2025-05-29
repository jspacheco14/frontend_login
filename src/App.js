import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CreateUserForm from './components/CreateUserForm';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/crear-usuario"
          element={
            <PrivateRoute>
              <CreateUserForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;