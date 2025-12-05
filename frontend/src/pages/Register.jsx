import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import api from '../services/api'; // Importamos a API diretamente aqui

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Faz o POST para a rota de registro do seu backend
      await api.post('/api/auth/register', formData);
      
      alert('Conta criada com sucesso! Faça login.');
      navigate('/login');
    } catch (err) {
      // Tenta pegar a mensagem de erro do backend (ex: "Email já existe")
      const msg = err.response?.data?.error || 'Erro ao criar conta.';
      setError(msg);
    }
  };

  return (
    <AuthLayout 
      title="Criar uma conta" 
      subtitle="Vamos começar sua jornada!"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome de Usuário</label>
          <input 
            type="text" 
            name="username"
            required
            className="w-full bg-[#202225] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-[#202225] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Senha</label>
          <input 
            type="password" 
            name="password"
            required
            className="w-full bg-[#202225] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Continuar
        </button>

        <div className="text-sm text-gray-400 mt-4">
          <Link to="/login" className="text-[#00b0f4] hover:underline">
            Já tem uma conta?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;