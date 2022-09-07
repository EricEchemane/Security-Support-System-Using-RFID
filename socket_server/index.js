const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

server.listen(PORT, function () {
    console.log(`🚀 App listening on port ${PORT}`);
});

const io = require('socket.io')(server);

io.on('connect', function (socket) {

    socket.on('time:in', uid => {
        const timeIn = new Date();
        console.log(`User ${uid} time in: ${timeIn}`);
    });
});


