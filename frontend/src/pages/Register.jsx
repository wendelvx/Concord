import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import api from '../services/api'; 
import Toast from '../components/Toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 

    try {
      await api.post('api/auth/register', formData);
      
      setShowToast(true);
      setIsLoading(false); 

      setTimeout(() => {
          navigate('/login');
      }, 2000);

    } catch (err) {
      const msg = err.response?.data?.error || 'FALHA_SISTEMA: NÃO_FOI_POSSÍVEL_CRIAR_USUÁRIO.';
      setError(msg);
      setIsLoading(false); 
    }
  };

  return (
    <AuthLayout 
      title="PROTOCOLO_NOVO_USUÁRIO" 
      subtitle="INICIALIZANDO_SEQUÊNCIA_DE_CADASTRO..."
    >
      {showToast && (
        <Toast 
            message="ENTIDADE_CRIADA_COM_SUCESSO. REDIRECIONANDO..." 
            onClose={() => setShowToast(false)} 
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
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
            disabled={isLoading || showToast} 
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
            disabled={isLoading || showToast}
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
            disabled={isLoading || showToast}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || showToast} 
          className="w-full bg-green-900/10 border border-green-600 text-green-500 font-bold py-3 px-4 rounded-none hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-[0.2em] mt-4 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                PROCESSANDO_DADOS...
            </div>
          ) : showToast ? (
            'REGISTRADO_COM_SUCESSO'
          ) : (
            'EXECUTAR_REGISTRO'
          )}
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