import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaPaperPlane, FaHashtag } from 'react-icons/fa'; // Ícones
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

        // Conecta ao Socket.io passando o token
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
                const response = await api.get(`/${channel.id}/history`);
                // A API retorna as mensagens, setamos no estado
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

    // Função de envio
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
        <div className="flex flex-col h-full bg-gray-700 text-gray-100">
            <div className="h-12 border-b border-gray-900 flex items-center px-4 shadow-sm bg-gray-750">
                <FaHashtag className="text-gray-400 mr-2" />
                <span className="font-bold text-white">{channel.name || 'Geral'}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => {
                    // Verifica se a mensagem anterior foi do mesmo usuário (para agrupar visualmente)
                    const isSameUser = index > 0 && messages[index - 1].userId === msg.userId;
                    
                    return (
                        <div key={msg.id || index} className={`flex ${isSameUser ? 'mt-1' : 'mt-4'}`}>
                            {/* Avatar (só mostra se não for continuação) */}
                            {!isSameUser ? (
                                <div className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0 mr-4 overflow-hidden">
                                     {/* Placeholder ou imagem real */}
                                     {msg.avatar_url ? (
                                        <img src={`http://localhost:3001${msg.avatar_url}`} alt="avatar" className="w-full h-full object-cover"/>
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center text-sm font-bold">
                                            {msg.username ? msg.username.charAt(0).toUpperCase() : '?'}
                                        </div>
                                     )}
                                </div>
                            ) : (
                                <div className="w-10 mr-4"></div> // Espaçamento para alinhar
                            )}

                            <div>
                                {!isSameUser && (
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-white mr-2 cursor-pointer hover:underline">
                                            {msg.username}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {msg.created_at 
                                                ? format(new Date(msg.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
                                                : 'Agora'}
                                        </span>
                                    </div>
                                )}
                                <p className="text-gray-300 leading-relaxed break-all">
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-700">
                <form 
                    onSubmit={handleSendMessage}
                    className="bg-gray-600 rounded-lg flex items-center px-4 py-2"
                >
                    <input
                        type="text"
                        className="bg-transparent flex-1 text-white outline-none placeholder-gray-400"
                        placeholder={`Conversar em #${channel.name || 'geral'}`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="text-gray-400 hover:text-white transition">
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;