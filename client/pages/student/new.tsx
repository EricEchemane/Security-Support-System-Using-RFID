/* eslint-disable @next/next/no-img-element */
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import AddNewStudentForm from 'components/AddNewStudentForm';
import SocketConnectionStatus from 'components/shared/SocketConnectionStatus';
import useSocket from 'hooks/useSocket';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

type rfidStatusTypes = "untapped" | "used" | "available";

export default function NewStudent() {
    const [connected, setConnected] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string>('/student_photo_placeholder.jpg');
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

    const reset = () => {
        setRfidStatus("untapped");
        previousTappedRfid.current = "";
    };
    const selectFile = () => {
        const inputPhoto = document.getElementById('input-photo');
        if (!inputPhoto) return;
        inputPhoto.click();
    };
    const handlePhotoChange = (e: any) => {
        if (e.target.files.length === 0) return;

        const files = e.target.files;
        const file = files[0];

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please upload a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            const base64Image = reader.result;
            setPhotoUrl(base64Image as string);
        };
    };

    return <>
        <Head> <title> Add new student </title> </Head>
        <Container>
            <Stack spacing={3} alignItems="flex-start" mt={3}>
                <SocketConnectionStatus connected={connected} />
                <Stack
                    justifyContent='space-between'
                    direction='row'
                    width={'100%'}
                    alignItems="flex-start">
                    <Stack>
                        <Typography variant='h4'> New Student • {previousTappedRfid.current} </Typography>
                        {rfidStatus === 'untapped' && <RfidStatus text='Tap an RFID first on the RFID reader to register' />}
                        {rfidStatus === 'used' && <RfidStatus text={`This RFID with code: ${previousTappedRfid.current} is already used`} error />}
                        {rfidStatus === 'available' && <RfidStatus text={`${previousTappedRfid.current} is available`} />}
                    </Stack>
                    {rfidStatus === 'available' &&
                        <Button onClick={selectFile}>
                            <Paper
                                elevation={4}
                                style={{ overflow: 'hidden', width: '150px', height: '150px' }}>
                                <img
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    src={photoUrl}
                                    alt='photo url'
                                    width={150}
                                    height={150} />
                            </Paper>
                            <input type="file" hidden id='input-photo' onChange={handlePhotoChange} />
                        </Button>}
                </Stack>
                {rfidStatus === 'available' && <AddNewStudentForm photo={photoUrl} uid={previousTappedRfid.current} onReset={reset} />}
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