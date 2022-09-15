import { Container, Typography } from '@mui/material';
import SocketConnectionStatus from 'components/shared/SocketConnectionStatus';
import useSocket from 'hooks/useSocket';
import { useState } from 'react';

export default function NewStudent() {
    const [connected, setConnected] = useState(false);
    useSocket(console.log, setConnected);

    return <>
        <Container>
            <SocketConnectionStatus connected={connected} />
            <Typography variant='h4'> New Student </Typography>
        </Container>
    </>;
}
