import { Container, Paper, Stack, Typography } from '@mui/material';
import AddNewStudentForm from 'components/AddNewStudentForm';
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
                {rfidStatus === 'untapped' && <RfidStatus text='Tap an RFID first on the RFID reader to register' />}
                {rfidStatus === 'used' && <RfidStatus text={`This RFID with code: ${previousTappedRfid.current} is already used`} error />}
                {rfidStatus === 'available' && <RfidStatus text={`${previousTappedRfid.current} is available`} />}
                {rfidStatus === 'available' && <AddNewStudentForm uid={previousTappedRfid.current} />}
            </Stack>
        </Container>
    </>;
}

const RfidStatus = (props: { error?: boolean; text: string; }) => {
    return <Paper
        elevation={3}
        style={{ padding: '1rem', borderRadius: '.5rem' }}>
        <Typography variant='body1' color={props.error ? 'red' : ''}>
            {props.text}
        </Typography>
    </Paper>;
};