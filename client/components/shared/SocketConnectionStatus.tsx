import { Chip, Container } from '@mui/material';
import { useState } from 'react';

export default function SocketConnectionStatus({ connected }: { connected: boolean; }) {
    return <Chip
        color={connected ? 'success' : 'error'}
        label={connected ? 'RFID is connected' : 'RFID is disconnected'} />;
}
