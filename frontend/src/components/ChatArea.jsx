import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaPaperPlane, FaHashtag } from 'react-icons/fa'; 
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const SOCKET_URL = 'http://localhost:3001';

const ChatArea = ({ channel }) => {
    const { user } = useContext(AuthContext); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(); 
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        if (!channel) return;

        const token = localStorage.getItem('discord_token');

        socketRef.current = io(SOCKET_URL, {
            auth: { token }
        });

        socketRef.current.emit('join_room', channel.id);

        socketRef.current.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socketRef.current.on('connect_error', (err) => {
            console.error("Erro de conexão no socket:", err.message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [channel]); 

    useEffect(() => {
        if (!channel) return;

        const fetchHistory = async () => {
            try {
                const response = await api.get(`/api/chat/${channel.id}/history`);
                setMessages(response.data);
            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            }
        };

        fetchHistory();
    }, [channel]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        if (socketRef.current) {
            const messageData = {
                channelId: channel.id,
                content: newMessage,
                type: 'text',
                userId: user.id, 
                username: user.username 
            };

            socketRef.current.emit('send_message', messageData);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent text-green-400 font-mono">
            
            {/* Cabeçalho do Chat */}
            <div className="h-14 border-b border-green-900/50 flex items-center px-4 bg-black/60 backdrop-blur-sm z-20">
                <FaHashtag className="text-green-600 mr-2" />
                <span className="font-bold text-green-400 tracking-widest uppercase">
                    {channel.name || 'CANAL_DESCONHECIDO'}
                </span>
                <span className="ml-4 text-[10px] text-green-800 border border-green-900 px-1 uppercase">
                    CONEXÃO_CRIPTOGRAFADA
                </span>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar z-10">
                {messages.map((msg, index) => {
                    const isSameUser = index > 0 && messages[index - 1].userId === msg.userId;
                    
                    return (
                        <div key={msg.id || index} className={`flex group ${isSameUser ? 'mt-1' : 'mt-6'}`}>
                            
                            {/* Avatar Quadrado */}
                            {!isSameUser ? (
                                <div className="w-10 h-10 rounded-none border border-green-600/50 bg-black flex-shrink-0 mr-4 overflow-hidden relative">
                                     <div className="absolute inset-0 bg-green-500/10 pointer-events-none"></div>
                                     
                                     {msg.avatar_url ? (
                                        <img src={`http://localhost:3001${msg.avatar_url}`} alt="avatar" className="w-full h-full object-cover grayscale contrast-125"/>
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-green-500">
                                            {msg.username ? msg.username.charAt(0).toUpperCase() : '?'}
                                        </div>
                                     )}
                                </div>
                            ) : (
                                <div className="w-10 mr-4 border-l border-green-900/30 ml-5 h-full opacity-50"></div> 
                            )}

                            <div className="flex-1">
                                {!isSameUser && (
                                    <div className="flex items-baseline mb-1">
                                        <span className="font-bold text-green-400 mr-2 cursor-pointer hover:underline decoration-dashed hover:text-green-300">
                                            {msg.username}
                                        </span>
                                        <span className="text-[10px] text-green-800 uppercase tracking-widest">
                                            [{msg.created_at 
                                                ? format(new Date(msg.created_at), "HH:mm:ss", { locale: ptBR })
                                                : 'SINCRONIZANDO...'}]
                                        </span>
                                    </div>
                                )}
                                <p className={`text-green-200/90 leading-relaxed break-all text-sm ${!isSameUser ? '' : 'opacity-90'}`}>
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 bg-black border-t border-green-900 z-20">
                <form 
                    onSubmit={handleSendMessage}
                    className="bg-black border border-green-800 flex items-center px-4 py-3 shadow-[0_0_10px_rgba(0,0,0,0.5)] focus-within:border-green-500 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300"
                >
                    <span className="text-green-600 mr-2 animate-pulse">{'>'}</span>
                    <input
                        type="text"
                        className="bg-transparent flex-1 text-green-400 outline-none placeholder-green-900 font-mono h-full"
                        placeholder={`Injetar_Mensagem() -> #${channel.name || 'geral'}`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit" className="text-green-800 hover:text-green-400 transition transform hover:scale-110">
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;