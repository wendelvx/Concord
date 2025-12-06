import React, { useState } from 'react';
import ChannelList from '../components/ChannelList';
import ChatArea from '../components/ChatArea';

const DiscordLayout = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="flex h-screen bg-black text-green-400 font-mono overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* =========================================================
          COLUNA 1: SERVIDORES (Barra Lateral Esquerda)
      ========================================================= */}
      <div className="hidden sm:flex w-[72px] bg-black border-r border-green-900 flex-col items-center py-4 space-y-4 z-20">
         
         <div className="w-12 h-12 border border-green-600 text-green-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] group">
             <span className="text-lg font-bold group-hover:animate-pulse">{'>'}_</span>
         </div>
         
         <hr className="w-8 border-green-900" />

         <div className="w-12 h-12 border border-green-900 text-green-800 flex items-center justify-center cursor-pointer hover:border-green-500 hover:text-green-500 transition-all text-[10px] font-bold text-center leading-none p-1">
             SRV_01
         </div>
      </div>

      {/* =========================================================
          COLUNA 2: LISTA DE CANAIS
      ========================================================= */}
      <div className="w-60 bg-black border-r border-green-900 flex flex-col z-10">
        <ChannelList onSelectChannel={setSelectedChannel} />
      </div>

      {/* =========================================================
          COLUNA 3: ÁREA DE CHAT (Centro)
      ========================================================= */}
      <div className="flex-1 flex flex-col bg-gray-950 relative">
        
        {/* EFEITO VISUAL: Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        {/* Conteúdo Real do Chat */}
        <div className="relative z-10 flex flex-col h-full">
            {selectedChannel ? (
                <ChatArea channel={selectedChannel} />
            ) : (
                // AQUI ESTAVA O PROBLEMA: Removemos o spinner eterno e colocamos uma tela de "Standby"
                <div className="flex flex-col items-center justify-center h-full text-green-800 space-y-6 opacity-50 select-none">
                    
                    {/* Arte ASCII ou Logo simples */}
                    <div className="border-4 border-green-900 p-8 rounded-none bg-black/50">
                        <pre className="text-[10px] sm:text-xs leading-none font-bold text-green-600">
{`
   ____  __  ______  _______  __  ___
  / __ \\/ / / / __ \\/ ___/ / / / / _ \\
 / /_/ / /_/ / /_/ / /__/ /_/ / /  __/
/ .___/\\__, /_____/\\___/\\__,_/  \\___/ 
/_/   /____/                          
`}
                        </pre>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="tracking-[0.3em] uppercase text-xs">Sistema_Online // v.2.0</p>
                        <p className="text-green-500 font-bold animate-pulse text-sm">
                            {'>'} AGUARDANDO_SELEÇÃO_DE_CANAL<span className="animate-ping">_</span>
                        </p>
                        <p className="text-[10px] text-green-900 max-w-xs mx-auto pt-4">
                            DICA: Use o botão [+] no painel lateral para inicializar um novo diretório de comunicação.
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* =========================================================
          COLUNA 4: LISTA DE USUÁRIOS (Direita)
      ========================================================= */}
      <div className="hidden lg:block w-60 bg-black border-l border-green-900 z-10">
        <div className="p-4 border-b border-green-900/30">
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest">
                Nós_Ativos — 3
            </h3>
        </div>
        
        <div className="p-2 space-y-2 mt-2">
            {['Neo', 'Trinity', 'Morpheus'].map((u) => (
                <div key={u} className="flex items-center p-2 hover:bg-green-900/20 cursor-pointer opacity-70 hover:opacity-100 transition">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_5px_#22c55e]"></div>
                    <span className="text-green-400 font-bold">{u}</span>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default DiscordLayout;