require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); 
const socketHandler = require('./src/sockets/socketHandler'); 

const PORT = process.env.PORT || 3001;


const server = http.createServer(app);

// 2. Configura o Socket.io no servidor HTTP
const io = new Server(server, {
    cors: {
        // Em produção, substitua "*" pela URL do seu frontend (ex: "http://localhost:5173")
        // para segurança. "*" aceita conexões de qualquer lugar.
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

socketHandler(io);

server.listen(PORT, () => {
    console.log(`\n---------------------------------------------------`);
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);
    console.log(`HTTP e WebSocket prontos`);
    console.log(`---------------------------------------------------\n`);
});