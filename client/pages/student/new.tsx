import { Container, Stack, Typography } from '@mui/material';
import SocketConnectionStatus from 'components/shared/SocketConnectionStatus';
import useSocket from 'hooks/useSocket';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import Head from 'next/head';
import { useRef, useState } from 'react';

type rfidStatusTypes = "untapped" | "used" | "available";

export default function NewStudent() {
    const [connected, setConnected] = useState(false);
    const [rfidStatus, setRfidStatus] = useState<rfidStatusTypes>("untapped");
    const previousTappedRfid = useRef('');
    const adapter = useHttpAdapter(new HttpAdapter('/student/:rfid', 'GET'), {
        onSuccess: () => setRfidStatus("used"),
        onFailed: () => setRfidStatus("available"),
    });

    useSocket(data => {
        if (previousTappedRfid.current === data.uid) return;
        previousTappedRfid.current = data.uid;
        adapter.execute({
            params: { rfid: data.uid }
        });
    }, setConnected);

    return <>
        <Head> <title> Add new student </title> </Head>
        <Container>
            <Stack spacing={3} alignItems="flex-start" mt={3}>
                <SocketConnectionStatus connected={connected} />
                <Typography variant='h4'> New Student • {previousTappedRfid.current} </Typography>
                {rfidStatus === 'untapped' && <Typography variant='button'> Tap an RFID first </Typography>}
                {rfidStatus === 'used' &&
                    <Typography variant='button' color='red'>
                        This RFID code {previousTappedRfid.current} is already used
                    </Typography>}
                {rfidStatus === 'available' && <>
                    <Typography variant='button'> {previousTappedRfid.current} is available </Typography>
                </>}
            </Stack>
        </Container>
    </>;
}