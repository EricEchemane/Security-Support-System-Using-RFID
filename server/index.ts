import dotenv from "dotenv";
dotenv.config();
import studentRoutes from '@routes/student.routes';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import staffRoutes from "@routes/staff.routes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// routes
app.use('/student', studentRoutes);
app.use('/staff', staffRoutes);

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

    socket.on('time:out', data => {
        console.log('time:out: ', data);
        socket.broadcast.emit('time:out', { time: new Date(), uid: data.uid });
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});