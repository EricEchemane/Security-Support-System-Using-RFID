import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null;

export type timeInData = { uid: string; };
export interface OnTimeInHandler {
    (data: timeInData): void;
}

export default function useSocket(
    onTimeInHandler: OnTimeInHandler,
    onConnectionStatusChange: (connected: boolean) => void
) {
    useEffect(() => {
        socket = io("http://localhost:4000", {
            transports: ['websocket']
        });

        socket.on('connect', () => {
            console.log('connected');
            onConnectionStatusChange(true);
        });
        socket.on('disconnect', () => {
            console.log('diconnected');
            onConnectionStatusChange(false);
        });
        socket.on('time:in', onTimeInHandler);

        return () => {
            socket?.off('time:in', onTimeInHandler);
            socket?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { socket };
}