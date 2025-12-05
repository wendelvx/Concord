import React, { useEffect, useState, useContext } from 'react';
import { 
  FaHashtag, 
  FaMicrophone, 
  FaHeadphones, 
  FaCog, 
  FaSignOutAlt, 
  FaChevronDown 
} from 'react-icons/fa';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ChannelList = ({ onSelectChannel }) => {
  const [channels, setChannels] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const { user, logout } = useContext(AuthContext); // Pegamos dados do usuário e logout

  useEffect(() => {
    // Busca os canais no backend ao carregar
    const fetchChannels = async () => {
      try {
        const response = await api.get('/channels'); // Sua rota: router.get('/', ...)
        setChannels(response.data);

        // Seleciona automaticamente o primeiro canal se existir
        if (response.data.length > 0) {
          const firstChannel = response.data[0];
          setActiveChannelId(firstChannel.id);
          onSelectChannel(firstChannel);
        }
      } catch (error) {
        console.error("Erro ao buscar canais", error);
      }
    };

    fetchChannels();
  }, [onSelectChannel]);

  const handleChannelClick = (channel) => {
    setActiveChannelId(channel.id);
    onSelectChannel(channel);
  };

  return (
    <div className="flex flex-col h-full bg-[#2f3136] text-gray-400">
      
      {/* 1. Cabeçalho do Servidor */}
      <div className="h-12 flex items-center px-4 border-b border-[#202225] shadow-sm hover:bg-[#34373c] transition cursor-pointer text-white font-bold truncate">
        <span>Dev Server</span>
        <FaChevronDown className="ml-auto text-xs" />
      </div>

      {/* 2. Lista de Canais (Área com Scroll) */}
      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
        
        {/* Categoria Visual (Estética) */}
        <div className="flex items-center justify-between px-2 pt-4 pb-1 text-xs font-bold uppercase hover:text-gray-200 cursor-pointer">
          <span>Canais de Texto</span>
          <span className="text-lg">+</span>
        </div>

        {/* Mapeamento dos Canais */}
        {channels.map((channel) => (
          <div 
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={`
              flex items-center px-2 py-1 rounded cursor-pointer transition
              ${activeChannelId === channel.id 
                ? 'bg-[#393c43] text-white' 
                : 'hover:bg-[#34373c] hover:text-gray-100'}
            `}
          >
            <FaHashtag className="mr-2 text-lg text-gray-500" />
            <span className="font-medium truncate">{channel.name}</span>
          </div>
        ))}

        {channels.length === 0 && (
          <div className="px-2 text-xs mt-2">Nenhum canal encontrado.</div>
        )}
      </div>

      {/* 3. Barra do Usuário (Rodapé Fixo) */}
      <div className="bg-[#292b2f] p-2 flex items-center justify-between">
        
        {/* Info do User */}
        <div className="flex items-center hover:bg-[#34373c] p-1 rounded cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden mr-2">
             {/* Exibe avatar se tiver, ou a inicial */}
             {user?.avatar_url ? (
               <img src={`http://localhost:3001${user.avatar_url}`} alt="avatar" />
             ) : (
               <span className="text-white text-xs font-bold">
                 {user?.username?.charAt(0).toUpperCase()}
               </span>
             )}
          </div>
          <div className="text-xs">
            <div className="font-bold text-white block max-w-[70px] truncate">
                {user?.username}
            </div>
            <div className="text-gray-500 text-[10px]">#{user?.id?.slice(0,4)}</div>
          </div>
        </div>

        {/* Ícones de Controle */}
        <div className="flex items-center">
          <button className="p-2 hover:bg-[#34373c] rounded text-lg" title="Microfone (Demo)">
            <FaMicrophone />
          </button>
          <button className="p-2 hover:bg-[#34373c] rounded text-lg" title="Áudio (Demo)">
            <FaHeadphones />
          </button>
          <button 
            onClick={logout} 
            className="p-2 hover:bg-[#34373c] rounded text-lg hover:text-red-400 transition" 
            title="Sair / Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChannelList;