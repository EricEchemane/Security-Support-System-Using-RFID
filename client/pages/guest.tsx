import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import Head from 'next/head';
import React, { FormEvent, useState } from 'react';

type Guest = {
    fullName: string;
    purposeOfVisit: string;
    timeIn: string;
};

const formatTime = (guest: Guest) => {
    if (!guest) return;
    return dayjs(guest.timeIn).format("hh:mm a");
};

export default function Guest() {
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Guest>();
    const adapter = useHttpAdapter(new HttpAdapter('/guest', 'POST'), {
        onFailed(message: string) {
            setLoading(false);
            alert(message);
        },
        onSuccess: (data) => {
            setLoading(false);
            setName('');
            setPurpose('');
            setData(data.data);
        }
    });
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        adapter.execute({
            payload: { fullName: name, purposeOfVisit: purpose },
        });
    };

    return <>
        <Head>
            <title> Guest </title>
        </Head>
        <form onSubmit={onSubmit}>
            <Stack
                sx={{ width: 'min(400px, 90vw)' }}
                spacing={4}
                px={2} py={8} m='auto'>
                <Typography variant='h4'> Continue as guest </Typography>
                <TextField
                    required
                    variant='filled'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                    type="text"
                    name='name' />
                <TextField
                    multiline
                    required
                    rows={4}
                    variant='filled'
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder='Purpose of visit'
                    name='purpose' />
                <Button
                    variant='contained'
                    disabled={loading}
                    type='submit'> Submit </Button>
            </Stack>
        </form>

        <Modal
            open={!!data}
            onClose={() => { }}
            aria-labelledby="Guest time in confirmation modal"
            aria-describedby="Guest time in confirmation modal"
        >
            <Box sx={{ ...style, width: 'min(400px, 90vw)' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Please present this to the guard
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 4, mb: 4 }}>
                    Signed in as {data?.fullName} at {formatTime(data!)} <br />
                    Purpose of visit: {data?.purposeOfVisit}
                </Typography>
                <Button
                    fullWidth
                    variant='outlined'
                    onClick={() => setData(undefined)}> Done </Button>
            </Box>
        </Modal>
    </>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
