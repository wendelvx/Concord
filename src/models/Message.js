const db = require('../config/db');

class MessageModel {
    // Salva uma nova mensagem
    static async create({ userId, channelId, content, type }) {
        const sql = `
            INSERT INTO messages (user_id, channel_id, content, message_type)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [userId, channelId, content, type]);
        return result.insertId; // Retorna o ID da mensagem criada
    }

    // Busca as últimas 50 mensagens de um canal (com dados do usuário)
    static async getByChannelId(channelId) {
        const sql = `
            SELECT 
                m.id, 
                m.content, 
                m.message_type, 
                m.created_at,
                u.id as sender_id,
                u.username,
                u.avatar_url
            FROM messages m
            JOIN users u ON m.user_id = u.id
            WHERE m.channel_id = ?
            ORDER BY m.created_at ASC 
            LIMIT 50
        `;
        // Nota: ORDER BY ASC para o chat mostrar da mais antiga no topo para a mais nova embaixo
        
        const [rows] = await db.execute(sql, [channelId]);
        return rows;
    }
}

module.exports = MessageModel;