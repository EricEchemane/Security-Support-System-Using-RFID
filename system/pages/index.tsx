import React, { useEffect } from 'react';
import io, { Socket } from "socket.io-client";

let socket: Socket | null;

export default function Home() {

  useEffect(() => {
    if (socket) return;

    socket = io("http://localhost:4000", {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on("time:in", data => {
      console.log(data);
    });
  }, []);

  return (
    <div>Home</div>
  );
}
