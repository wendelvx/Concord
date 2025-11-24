const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class UserModel {
    // Busca usuário pelo email (para login e validação)
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }

    // Busca usuário pelo ID (para verificar token ou carregar perfil)
    static async findById(id) {
        const sql = 'SELECT id, username, email, avatar_url FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    // Cria um novo usuário
    static async create(userData) {
        const { username, email, password_hash } = userData;
        const id = uuidv4(); // Gera um ID único (ex: 5b3e...-...)

        const sql = `
            INSERT INTO users (id, username, email, password_hash) 
            VALUES (?, ?, ?, ?)
        `;
        
        await db.execute(sql, [id, username, email, password_hash]);
        return id;
    }
}

module.exports = UserModel;