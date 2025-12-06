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

    static async create(name) {
    const sql = 'INSERT INTO channels (name) VALUES (?)';
    const [result] = await db.execute(sql, [name]);
    return result.insertId;
}
}

module.exports = ChannelModel;