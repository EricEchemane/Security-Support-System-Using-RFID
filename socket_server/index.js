import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', socket => {
    console.log('New Connection from', socket.id);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('time:in', data => {
        console.log(data);
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});