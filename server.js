const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chat message', (message) => {
        console.log('Message received: ', message);
        let response;
        if (message.toLowerCase().includes('hello')) {
            response = 'Hello! How can I assist you today?';
        } else if (message.toLowerCase().includes('how are you')) {
            response = 'I am just a bot, but thank you for asking!';
        } else if (message.toLowerCase().includes('bye')) {
            response = 'Goodbye! Have a great day!';
        } else {
            response = "I'm sorry, I didn't understand that.";
        }
        io.emit('chat message', { text: response, fromBot: true }); // Emitting the response to the frontend
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
