/* eslint-disable @next/next/no-img-element */
import { Container, Paper, Stack, Typography } from "@mui/material";
import SocketConnectionStatus from "components/shared/SocketConnectionStatus";
import dayjs from "dayjs";
import useNotification from "hooks/useNotification";
import socketConfig from "lib/socketConfig";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Staff } from "types/staff.model";
import { Student } from "types/student.model";

let socket: Socket | null;

const formatTime = (doc: Student | Staff | undefined | null) => {
    if (!doc || !doc.visitationRecords) return "";
    return dayjs(doc.visitationRecords[doc.visitationRecords?.length - 1].timeIn.toString()).format("hh:mm a");
};

export default function TimeIn() {
    const [connected, setConnected] = useState(false);
    const previousTappedRfid = useRef('');
    const [entity, setEntity] = useState<Student | Staff | null>();
    const notify = useNotification();

    useEffect(() => {
        const { url, options } = socketConfig;
        socket = io(url, options);
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));
        socket.on("time:in", async data => {
            const uid = data.uid;
            if (previousTappedRfid.current === uid) return;
            previousTappedRfid.current = uid;
            const res = await fetch(url + "/staff/" + uid);
            const resData = await res.json();
            if (res.ok) setEntity(resData.data);
            else notify(resData.message, 'error');
        });
    }, [notify]);

    return <>

        <Head> <title> Time-in </title> </Head>
        <Container >
            <Stack spacing={3} alignItems="flex-end" mt={3}>
                <SocketConnectionStatus connected={connected} />
                <Typography variant='h4'> Time-in: {formatTime(entity)} </Typography>
            </Stack>
            {entity && <Stack my={5}>
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
                            src={entity.photo}
                            alt='photo url'
                            width={150}
                            height={150} />
                    </Paper>
                    <Stack>
                        <Typography variant='h3'>
                            {entity.firstName} {entity.middleName} {entity.lastName} {entity.nameExtension}
                        </Typography>
                        <Typography variant='button'>Email:{entity.email}</Typography>
                        <Typography variant='button'>Birthday:{entity.birthDate}</Typography>
                        <Typography variant='button'>RFID:{entity.rfid}</Typography>
                        <Typography variant='button'>Mobile Number:{entity.mobileNumber}</Typography>
                        {(entity as any).section && <Typography variant='button'>Section:{(entity as any).section}</Typography>}
                        <Typography variant='button'>Department:{entity.department}</Typography>
                        {(entity as any).yearLevel && <Typography variant='button'>Year Level:{(entity as any).yearLevel}</Typography>}
                        {(entity as any).strand && <Typography variant='button'>Strand:{(entity as any).strand}</Typography>}
                        {(entity as any).course && <Typography variant='button'>Course:{(entity as any).course}</Typography>}
                    </Stack>
                </Stack>
            </Stack>}
        </Container>
    </>;
}
