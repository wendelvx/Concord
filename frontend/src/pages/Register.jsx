import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import api from '../services/api'; 

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
      await api.post('api/auth/register', formData);
      
      alert('ENTIDADE_CRIADA_COM_SUCESSO. REDIRECIONANDO...');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.error || 'FALHA_SISTEMA: NÃO_FOI_POSSÍVEL_CRIAR_USUÁRIO.';
      setError(msg);
    }
  };

  return (
    <AuthLayout 
      title="PROTOCOLO_NOVO_USUÁRIO" 
      subtitle="INICIALIZANDO_SEQUÊNCIA_DE_CADASTRO..."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {}
        {error && (
          <div className="border border-red-500/50 bg-red-900/10 text-red-500 text-xs p-2 font-mono uppercase tracking-widest text-center animate-pulse">
            [ERRO_CRÍTICO]: {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Alias_Usuário // Nome
          </label>
          <input 
            type="text" 
            name="username"
            required
            placeholder="Neo"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Nó_de_Contato // Email
          </label>
          <input 
            type="email" 
            name="email"
            required
            placeholder="neo@matrix.com"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Chave_Criptografia // Senha
          </label>
          <input 
            type="password" 
            name="password"
            required
            placeholder="••••••••"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-900/10 border border-green-600 text-green-500 font-bold py-3 px-4 rounded-none hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-[0.2em] mt-4"
        >
          EXECUTAR_REGISTRO
        </button>

        <div className="text-xs text-green-800 mt-6 text-center font-mono">
          <Link to="/login" className="text-green-500 hover:text-green-300 font-bold hover:underline decoration-dashed underline-offset-4">
            { '<' } RETORNAR_AO_TERMINAL
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;