const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

server.listen(PORT, function () {
    console.log(`🚀 App listening on port ${PORT}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', function (socket) {
    console.log('Client connected with id: ' + socket.id);

    socket.on('time:in', uid => {
        const timeIn = new Date();
        console.log(`User ${uid} time in: ${timeIn}`);

        socket.emit('time:in', { uid, timeIn });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected with id: ' + socket.id);
    });
});