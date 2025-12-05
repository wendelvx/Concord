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
      setError('CREDENCIAIS INVÁLIDAS OU ACESSO NEGADO.');
    }
  };

  return (
    <AuthLayout 
      title="ACCESS_TERMINAL" 
      subtitle="PLEASE AUTHENTICATE TO PROCEED"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Mensagem de Erro Estilizada como Log */}
        {error && (
          <div className="border border-red-500/50 bg-red-900/10 text-red-500 text-xs p-2 font-mono uppercase tracking-widest text-center animate-pulse">
            [ERROR]: {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Identity // Email
          </label>
          <input 
            type="email" 
            required
            placeholder="usr@mainframe.net"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
            Passcode
          </label>
          <input 
            type="password" 
            required
            placeholder="••••••••"
            className="w-full bg-black/40 border border-green-800 text-green-400 p-3 rounded-none focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all placeholder-green-900 font-mono"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="text-[10px] text-green-800 hover:text-green-500 mt-2 block text-right tracking-wider uppercase decoration-dashed hover:underline underline-offset-4 transition-colors">
            {'>'} Reset_Credentials?
          </a>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-900/10 border border-green-600 text-green-500 font-bold py-3 px-4 rounded-none hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-[0.2em] relative overflow-hidden group"
        >
          <span className="relative z-10">Initialize_Session</span>
        </button>

        <div className="text-xs text-green-800 mt-6 text-center font-mono">
          NO_TOKEN_FOUND?{' '}
          <Link to="/register" className="text-green-500 hover:text-green-300 font-bold hover:underline decoration-dashed underline-offset-4 ml-1">
            {'>'} CREATE_NEW_USER
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;