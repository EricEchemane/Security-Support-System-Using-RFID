import { Container, Stack, Typography } from "@mui/material";
import SocketConnectionStatus from "components/shared/SocketConnectionStatus";
import dayjs from "dayjs";
import useNotification from "hooks/useNotification";
import useSocket from "hooks/useSocket";
import HttpAdapter from "http_adapters/http-adapter-interface";
import useHttpAdapter from "http_adapters/useHttpAdapter";
import Head from "next/head";
import { useRef, useState } from "react";
import { Student } from "types/student.model";

const formatTime = (student: Student | undefined | null) => {
    if (!student || !student.visitationRecords) return "";
    return dayjs(student.visitationRecords[student.visitationRecords?.length - 1].timeIn.toString()).format("hh:mm a");
};

export default function TimeIn() {
    const [connected, setConnected] = useState(false);
    const previousTappedRfid = useRef('');
    const [student, setStudent] = useState<Student | null>();
    const notify = useNotification();
    const adapter = useHttpAdapter(new HttpAdapter('/student/time-in', 'POST'), {
        onFailed: (message: string) => {
            console.log(message);
            notify(message, 'error');
        },
        onSuccess: (data) => {
            setStudent(data.data);
            console.log(data.data);
        }
    });

    useSocket(data => {
        if (previousTappedRfid.current === data.uid) return;
        previousTappedRfid.current = data.uid;
        adapter.execute({ payload: { rfid: data.uid } });
    }, setConnected);

    return <>
        <Head> <title> Student Time-in </title> </Head>
        <Container>
            <Stack spacing={3} alignItems="flex-start" mt={3}>
                <SocketConnectionStatus connected={connected} />
                <Typography variant='h4'> Student Time-in: {formatTime(student)} </Typography>
            </Stack>
            {student && <Stack my={5}>
                <Typography variant='h3'>
                    {student.firstName} {student.middleName} {student.lastName} {student.nameExtension}
                </Typography>
                <Typography variant='button'>Email:{student.email}</Typography>
                <Typography variant='button'>Birthday:{student.birthDate}</Typography>
                <Typography variant='button'>RFID:{student.rfid}</Typography>
                <Typography variant='button'>Mobile Number:{student.mobileNumber}</Typography>
                <Typography variant='button'>Section:{student.section}</Typography>
                <Typography variant='button'>Department:{student.department}</Typography>
                <Typography variant='button'>Year Level:{student.yearLevel}</Typography>
                <Typography variant='button'>Strand:{student.strand}</Typography>
                <Typography variant='button'>Course:{student.course}</Typography>

            </Stack>}
        </Container>
    </>;
}