const MessageModel = require('../models/Message');

exports.getChannelHistory = async (req, res) => {
    try {
        const { channelId } = req.params;

        if (!channelId) {
            return res.status(400).json({ error: 'ID do canal é obrigatório' });
        }

        const messages = await MessageModel.getByChannelId(channelId);
        res.json(messages);

    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        res.status(500).json({ error: 'Erro interno ao buscar mensagens.' });
    }
};