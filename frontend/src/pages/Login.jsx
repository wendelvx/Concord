import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 

    try {
      await login(email, password);
      
      setShowToast(true);
      setIsLoading(false); 

      setTimeout(() => {
          navigate('/'); 
      }, 2000);

    } catch (err) {
      setError('FALHA NA AUTENTICAÇÃO. ACESSO NEGADO.');
      setIsLoading(false); 
    }
  };

  return (
    <AuthLayout 
      title="TERMINAL_DE_ACESSO" 
      subtitle="AUTENTICAÇÃO_NECESSÁRIA_PARA_PROSSEGUIR"
    >
      {showToast && (
        <Toast 
            message="ACESSO_AUTORIZADO. ESTABELECENDO_CONEXÃO..." 
            onClose={() => setShowToast(false)} 
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {error && (
          <div className="border border-red-500/50 bg-red-900/10 text-red-500 text-xs p-2 font-mono uppercase tracking-widest text-center animate-pulse">
            [ERRO_CRÍTICO]: {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Identidade // Email
          </label>
          <input 
            type="email" 
            required
            placeholder="usuario@mainframe.net"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || showToast} 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Chave_de_Acesso
          </label>
          <input 
            type="password" 
            required
            placeholder="••••••••"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || showToast}
          />
          <a href="#" className="text-[10px] text-green-800 hover:text-green-500 mt-2 block text-right tracking-wider uppercase decoration-dashed hover:underline underline-offset-4 transition-colors">
            {'>'} Redefinir_Credenciais?
          </a>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || showToast} // Desabilita se estiver carregando ou redirecionando
          className="w-full bg-green-900/10 border border-green-600 text-green-500 font-bold py-3 px-4 rounded-none hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-[0.2em] relative overflow-hidden group disabled:opacity-50 disabled:cursor-wait flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center">
                {/* SVG do Spinner */}
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                PROCESSANDO...
            </div>
          ) : showToast ? (
            'DECRIPTANDO_CHAVE...'
          ) : (
            <span className="relative z-10">Iniciar_Sessão</span>
          )}
        </button>

        <div className="text-xs text-green-800 mt-6 text-center font-mono">
          TOKEN_NÃO_DETECTADO?{' '}
          <Link to="/register" className="text-green-500 hover:text-green-300 font-bold hover:underline decoration-dashed underline-offset-4 ml-1">
            {'>'} CRIAR_NOVO_USUÁRIO
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;