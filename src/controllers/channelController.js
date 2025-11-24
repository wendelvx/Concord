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