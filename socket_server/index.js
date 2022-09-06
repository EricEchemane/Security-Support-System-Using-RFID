const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

server.listen(PORT, function () {
    console.log(`🚀 App listening on port ${PORT}`);
});

const io = require('socket.io')(server);

io.on('connect', function (socket) {

    socket.on('message', function (data) {
        console.log(data);
    });
});


