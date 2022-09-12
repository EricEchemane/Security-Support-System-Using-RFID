import dotenv from "dotenv";
dotenv.config();
import studentRoutes from '@routes/student.routes';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;

const app = express();

// routes
app.use('/student', studentRoutes);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*' },
    allowEIO3: true
});

io.on('connection', socket => {
    console.log('New Connection from', socket.id);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('time:in', data => {
        console.log('time:in: ', data);
        socket.broadcast.emit('time:in', { time: new Date(), uid: data.uid });
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});