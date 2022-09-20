/* eslint-disable @next/next/no-img-element */
import { Container, Paper, Stack, Typography } from "@mui/material";
import SocketConnectionStatus from "components/shared/SocketConnectionStatus";
import dayjs from "dayjs";
import useNotification from "hooks/useNotification";
import useSocket from "hooks/useSocket";
import HttpAdapter from "http_adapters/http-adapter-interface";
import useHttpAdapter from "http_adapters/useHttpAdapter";
import Head from "next/head";
import { useRef, useState } from "react";
import { Staff } from "types/staff.model";
const formatTime = (staff: Staff | undefined | null) => {
    if (!staff || !staff.visitationRecords) return "";
    return dayjs(staff.visitationRecords[staff.visitationRecords?.length - 1].timeOut.toString()).format("hh:mm a");
};

export default function TimeOut() {
    const [connected, setConnected] = useState(false);
    const previousTappedRfid = useRef('');
    const [staff, setStudent] = useState<Staff | null>();
    const notify = useNotification();
    const adapter = useHttpAdapter(new HttpAdapter('/staff/time-out', 'POST'), {
        onFailed: (message: string) => {
            console.log(message);
            notify(message, 'error');
        },
        onSuccess: (data) => {
            setStudent(data.data);
            console.log(data.data);
        }
    });

    useSocket(data => { }, setConnected, data => {
        previousTappedRfid.current = data.uid;
        adapter.execute({ payload: { rfid: data.uid } });
    });

    return <>
        <Head> <title> Staff Time-out </title> </Head>
        <Container>
            <Stack spacing={3} alignItems="flex-start" mt={3}>
                <SocketConnectionStatus connected={connected} />
                <Typography variant='h4'> Staff Time-out: {formatTime(staff)} </Typography>
            </Stack>
            {staff && <Stack my={5}>
                <Stack
                    width='100%'
                    spacing={5}
                    direction='row'>
                    <Paper
                        elevation={4}
                        style={{ overflow: 'hidden', width: '280px', height: '280px' }}>
                        <img
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            src={staff.photo}
                            alt='photo url'
                            width={150}
                            height={150} />
                    </Paper>
                    <Stack>
                        <Typography variant='h3'>
                            {staff.firstName} {staff.middleName} {staff.lastName} {staff.nameExtension}
                        </Typography>
                        <Typography variant='button'>Email:{staff.email}</Typography>
                        <Typography variant='button'>Birthday:{staff.birthDate}</Typography>
                        <Typography variant='button'>RFID:{staff.rfid}</Typography>
                        <Typography variant='button'>Mobile Number:{staff.mobileNumber}</Typography>
                        <Typography variant='button'>Type of staff:{staff.typeOfStaff}</Typography>
                        <Typography variant='button'>Department:{staff.department}</Typography>
                    </Stack>
                </Stack>
            </Stack>}
        </Container>
    </>;
}