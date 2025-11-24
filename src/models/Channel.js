const db = require('../config/db');

class ChannelModel {
    static async findAll() {
        // Retorna todos os canais
        const sql = 'SELECT * FROM channels ORDER BY id ASC';
        const [rows] = await db.execute(sql);
        return rows;
    }

    static async findById(id) {
        const sql = 'SELECT * FROM channels WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }
}

module.exports = ChannelModel;