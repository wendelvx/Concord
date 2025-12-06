import React, { useEffect, useState, useContext } from 'react';
import { 
  FaHashtag, 
  FaMicrophone, 
  FaHeadphones, 
  FaSignOutAlt, 
  FaChevronDown,
  FaPlus 
} from 'react-icons/fa';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Modal from './Modal'; 

const ChannelList = ({ onSelectChannel }) => {
  const [channels, setChannels] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const { user, logout } = useContext(AuthContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await api.get('/channels');
        setChannels(response.data);

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

  const handleCreateChannel = async (e) => {
      e.preventDefault();
      if (!newChannelName.trim()) return;

      try {
          const response = await api.post('/api/channels', { name: newChannelName });
          const createdChannel = response.data;
          setChannels([...channels, createdChannel]);
          
          setNewChannelName('');
          setIsModalOpen(false);
          
          handleChannelClick(createdChannel);
      } catch (error) {
          alert('ERRO_SISTEMA: FALHA_AO_CRIAR_DIRETÓRIO');
      }
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-400 font-mono">
      
      {}
      <div className="h-14 flex items-center px-4 border-b border-green-900 hover:bg-green-900/10 transition cursor-pointer text-green-500 font-bold tracking-widest uppercase group">
        <span className="truncate">DIRETÓRIO_RAIZ</span>
        <FaChevronDown className="ml-auto text-xs group-hover:animate-bounce" />
      </div>

      {}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-1">
        
        {}
        <div className="flex items-center justify-between px-2 pt-4 pb-2 text-[10px] font-bold uppercase text-green-800 tracking-[0.2em] group">
          <span>Protocolos_Texto</span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-lg leading-none hover:text-green-400 transition transform hover:scale-125 hover:rotate-90"
            title="Criar Novo Canal"
          >
            <FaPlus />
          </button>
        </div>

        {channels.map((channel) => (
          <div 
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={`
              flex items-center px-2 py-2 cursor-pointer transition-all duration-200 border-l-2
              ${activeChannelId === channel.id 
                ? 'bg-green-900/20 text-green-300 border-green-500 shadow-[inset_10px_0_20px_-10px_rgba(34,197,94,0.2)]' 
                : 'border-transparent text-green-700 hover:text-green-400 hover:bg-green-900/10 hover:border-green-800'}
            `}
          >
            <FaHashtag className={`mr-2 text-sm ${activeChannelId === channel.id ? 'text-green-400' : 'opacity-50'}`} />
            <span className="font-medium truncate tracking-wide text-sm">
                {channel.name}
            </span>
            {activeChannelId === channel.id && <span className="ml-auto text-[10px] animate-pulse">{'<'}</span>}
          </div>
        ))}

        {channels.length === 0 && (
          <div className="px-2 text-xs mt-4 text-red-500 font-bold border border-red-900/50 p-2 bg-red-900/10">
            [ERRO]: NENHUM_CANAL_DETECTADO
          </div>
        )}
      </div>

      {}
      <div className="bg-black border-t border-green-900 p-3 flex items-center justify-between">
        <div className="flex items-center hover:bg-green-900/20 p-1 cursor-pointer group transition-colors w-full max-w-[120px]">
          <div className="w-8 h-8 border border-green-600 bg-black flex items-center justify-center overflow-hidden mr-2 relative">
             <div className="absolute inset-0 bg-green-500/10 pointer-events-none z-10"></div>
             {user?.avatar_url ? (
               <img src={`http://localhost:3001${user.avatar_url}`} alt="avatar" className="w-full h-full object-cover grayscale contrast-125" />
             ) : (
               <span className="text-green-500 text-xs font-bold">
                 {user?.username?.charAt(0).toUpperCase()}
               </span>
             )}
          </div>
          <div className="text-xs overflow-hidden">
            <div className="font-bold text-green-400 block truncate group-hover:text-green-300">
                {user?.username}
            </div>
            <div className="text-green-800 text-[9px] tracking-wider">ID:{user?.id?.slice(0,4)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 hover:bg-green-900/30 text-green-700 hover:text-green-400 transition"><FaMicrophone size={14} /></button>
          <button className="p-2 hover:bg-green-900/30 text-green-700 hover:text-green-400 transition"><FaHeadphones size={14} /></button>
          <button onClick={logout} className="p-2 hover:bg-red-900/30 text-green-700 hover:text-red-500 transition border border-transparent hover:border-red-900/50"><FaSignOutAlt size={14} /></button>
        </div>
      </div>

      {}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="EXECUTAR_MKDIR_CANAL"
      >
          <form onSubmit={handleCreateChannel} className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-green-700 uppercase mb-2 tracking-widest">
                      NOME_DO_DIRETÓRIO
                  </label>
                  <input 
                      autoFocus
                      type="text" 
                      placeholder="geral"
                      className="w-full bg-black border border-green-800 text-green-400 p-2 text-sm focus:outline-none focus:border-green-400 placeholder-green-900"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                  />
              </div>
              <div className="flex justify-end pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-3 text-xs text-green-700 hover:text-green-500 uppercase tracking-widest"
                  >
                      Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="bg-green-900/20 border border-green-600 text-green-400 text-xs font-bold py-2 px-4 hover:bg-green-500 hover:text-black transition uppercase tracking-widest"
                  >
                      Criar_Canal
                  </button>
              </div>
          </form>
      </Modal>

    </div>
  );
};

export default ChannelList;