/* eslint-disable @next/next/no-img-element */
import { Container, Paper, Stack, Typography } from "@mui/material";
import SocketConnectionStatus from "components/shared/SocketConnectionStatus";
import dayjs from "dayjs";
import useLoadingIndicator from "hooks/useLoadingIndicator";
import useNotification from "hooks/useNotification";
import socketConfig from "lib/socketConfig";
import { toTitleCase } from "lib/utillity-functions";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Staff } from "types/staff.model";
import { Student } from "types/student.model";

let socket: Socket | null;

const formatTime = (doc: Student | Staff | undefined | null) => {
    if (!doc || !doc.visitationRecords || doc.visitationRecords.length === 0) return "";
    return dayjs(doc.visitationRecords[doc.visitationRecords?.length - 1].timeIn.toString()).format("hh:mm a");
};

export default function TimeIn() {
    const [connected, setConnected] = useState(false);
    const previousTappedRfid = useRef('');
    const [entity, setEntity] = useState<Student | Staff | null>();
    const notify = useNotification();
    const loadingIndicator = useLoadingIndicator();

    useEffect(() => {
        const { url, options } = socketConfig;
        socket = io(url, options);
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));
        socket.on("time:in", async data => {
            const uid = data.uid;
            if (previousTappedRfid.current === uid) return;
            loadingIndicator.setVisibility(true);
            previousTappedRfid.current = uid;
            const res = await fetch(url + "/time-in/" + uid);
            const resData = await res.json();
            if (res.ok) setEntity(resData.data);
            else notify(resData.message, 'error');
            loadingIndicator.setVisibility(false);
        });
    }, [loadingIndicator, notify]);

    return <>

        <Head> <title> Time-in </title> </Head>
        <Container >
            <Stack direction={'row'} my={4} alignItems='flex-end' justifyContent='space-between'>
                {entity && <Typography variant='h3'>
                    {toTitleCase(`${entity.firstName} ${entity.middleName} ${entity.lastName} ${entity.nameExtension}`)}
                </Typography>}
                <Stack spacing={3} alignItems="flex-end">
                    <SocketConnectionStatus connected={connected} />
                    <Typography variant='h4'> Time-in: {formatTime(entity)} </Typography>
                </Stack>
            </Stack>
            {entity &&
                <Stack mb={5}>
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
                                    objectFit: "cover"
                                }}
                                src={entity.photo}
                                alt='photo url' />
                        </Paper>

                        <Stack spacing={2} direction='row'>
                            <Stack spacing={2} alignItems='flex-end'>
                                <Typography >Email: </Typography>
                                <Typography >Birthday: </Typography>
                                <Typography >RFID: </Typography>
                                <Typography >Mobile Number: </Typography>
                                {(entity as any).section && <Typography >Section: </Typography>}
                                {/* {(entity as any).typeOfStaff && <Typography >Type of Staff: </Typography>} */}
                                <Typography >Department: </Typography>
                                {(entity as any).yearLevel && <Typography >Year Level: </Typography>}
                                {(entity as any).strand && <Typography >Strand: </Typography>}
                                {(entity as any).course && <Typography >Course: </Typography>}
                            </Stack>
                            <Stack spacing={2}>
                                <Typography > {entity.email} </Typography>
                                <Typography > {entity.birthDate}</Typography>
                                <Typography > {entity.rfid}</Typography>
                                <Typography > {entity.mobileNumber}</Typography>
                                {(entity as any).section && <Typography > {(entity as any).section}</Typography>}
                                {/* {(entity as any).typeOfStaff && <Typography > {(entity as any).typeOfStaff}</Typography>} */}
                                <Typography > {entity.department}</Typography>
                                {(entity as any).yearLevel && <Typography > {(entity as any).yearLevel}</Typography>}
                                {(entity as any).strand && <Typography > {(entity as any).strand}</Typography>}
                                {(entity as any).course && <Typography > {(entity as any).course}</Typography>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>}
        </Container>
    </>;
}
