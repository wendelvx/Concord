const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    res.json({ message: 'MiniCord API está online!' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const channelRoutes = require('./routes/channelRoutes');
app.use('/api/channels', channelRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/upload', fileRoutes);

module.exports = app;