import React, { useEffect } from 'react';
import io from "socket.io-client";

export default function Home() {

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('connected');

    });
  }, []);

  return (
    <div>Home</div>
  );
}
