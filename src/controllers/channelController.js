const ChannelModel = require('../models/Channel');

exports.listChannels = async (req, res) => {
    try {
        const channels = await ChannelModel.findAll();
        res.json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar canais.' });
    }

};

exports.createChannel = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Nome do canal é obrigatório' });
        }

        const channelId = await ChannelModel.create(name);
        
        res.status(201).json({ id: channelId, name }); 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar canal.' });
    }
};