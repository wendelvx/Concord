const MessageModel = require('../models/Message');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`🔌 User conectado no Socket: ${socket.id}`);

        socket.on('join_room', (channelId) => {
            socket.join(channelId);
            console.log(`User ${socket.id} entrou no canal ${channelId}`);
        });

        socket.on('send_message', async (data) => {
            console.log('Mensagem recebida:', data);

            try {
                const messageId = await MessageModel.create({
                    userId: data.userId,
                    channelId: data.channelId,
                    content: data.content,
                    type: data.type || 'text' 
                });

                
                const messagePayload = {
                    ...data,
                    id: messageId,
                    created_at: new Date()
                };

                io.to(data.channelId).emit('receive_message', messagePayload);

            } catch (error) {
                console.error('Erro ao salvar mensagem via Socket:', error);
                socket.emit('error_message', { error: 'Falha ao enviar mensagem' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`❌ User desconectado: ${socket.id}`);
        });
    });
};