import React, { useState, useEffect } from 'react';
import ChannelList from '../components/ChannelList';
import ChatArea from '../components/ChatArea';
// import api from '../services/api';

const DiscordLayout = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#36393f', color: 'white' }}>
      
      {}
      <div className="hidden sm:flex w-[72px] bg-[#202225] flex-col items-center py-3 space-y-2">
         {/* Ícone do "Home" do Discord */}
         <div className="w-12 h-12 bg-[#5865F2] rounded-2xl flex items-center justify-center text-white cursor-pointer transition hover:rounded-xl">
             D
         </div>
         <hr className="w-8 border-gray-700" />
      </div>

      {}
      <div style={{ width: '240px', backgroundColor: '#2f3136' }}>
        <ChannelList onSelectChannel={setSelectedChannel} />
      </div>

      {}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#36393f' }}>
        {selectedChannel ? (
             <ChatArea channel={selectedChannel} />
        ) : (
             <div className="flex items-center justify-center h-full text-gray-500">
                Carregando canais...
             </div>
        )}
      </div>

      {}
      <div className="hidden lg:block w-[240px] bg-[#2f3136] border-l border-[#202225]">
        {/* UserList futura */}
        <div className="p-4 text-xs font-bold text-gray-500 uppercase">Disponível</div>
      </div>

    </div>
  );
};

export default DiscordLayout;