import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import DiscordLayout from './pages/DiscordLayout';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <div className="text-white">Carregando...</div>;

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <DiscordLayout />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;