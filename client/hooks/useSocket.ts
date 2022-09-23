import socketConfig from "lib/socketConfig";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null;

export type timeInData = { uid: string; };
export type timeOutData = { uid: string; };
export interface OnTimeInHandler {
    (data: timeInData): void;
}
export interface OnTimeOutHandler {
    (data: timeOutData): void;
}

const { url } = socketConfig;

export default function useSocket(
    onTimeInHandler: OnTimeInHandler,
    onConnectionStatusChange: (connected: boolean) => void,
    onTimeOutHandler: OnTimeOutHandler = (data: timeOutData) => { },
) {
    useEffect(() => {
        socket = io(url, {
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
        socket.on('time:out', onTimeOutHandler);

        return () => {
            socket?.off('time:in', onTimeInHandler);
            socket?.off('time:out', onTimeOutHandler);
            socket?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { socket };
}