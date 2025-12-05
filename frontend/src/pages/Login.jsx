import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      
      navigate('/'); 
    } catch (err) {
      setError('Email ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <AuthLayout 
      title="Boas-vindas de volta!" 
      subtitle="Estamos muito animados em te ver novamente!"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
          <input 
            type="email" 
            required
            className="w-full bg-[#202225] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Senha</label>
          <input 
            type="password" 
            required
            className="w-full bg-[#202225] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="text-xs text-[#00b0f4] hover:underline mt-1 block">Esqueceu a senha?</a>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Entrar
        </button>

        <div className="text-sm text-gray-400 mt-4">
          Precisa de uma conta?{' '}
          <Link to="/register" className="text-[#00b0f4] hover:underline">
            Registre-se
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;