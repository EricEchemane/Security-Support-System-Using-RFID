import { Button, Stack } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Student } from 'types/student.model';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import socketConfig from 'lib/socketConfig';
import useLoadingIndicator from 'hooks/useLoadingIndicator';
import useConfirmDialog from 'hooks/useConfirmDialog';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useNotification from 'hooks/useNotification';
import { useRouter } from 'next/router';

const formatTime = (student: Student | undefined | null, time: "in" | "out") => {
    if (!student || !student.visitationRecords || student.visitationRecords.length === 0) return "none";
    const visit = student.visitationRecords[student.visitationRecords.length - 1];
    if (time === "in") {
        if (!visit.timeIn) return "none";
        return dayjs(visit.timeIn.toString()).format("hh:mm a");
    }
    if (time === "out") {
        if (!visit.timeOut) return "none";
        return dayjs(visit.timeOut.toString()).format("hh:mm a");
    }
};
const getStudents = async () => {
    const { url } = socketConfig;
    const res = await fetch(url + "/student/get/all");
    const data = await res.json();
    if (res.ok) return data.data;
    return [];
};

export default function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const loadingIndicator = useLoadingIndicator();
    const confirmDialog = useConfirmDialog();
    const notify = useNotification();
    const router = useRouter();
    const adapter = useHttpAdapter(new HttpAdapter('/student', 'DELETE'), {
        onFailed: message => notify(message, 'error'),
        onSuccess: () => notify('Deleted successfully', 'success')
    });

    useEffect(() => {
        const sessionKey = "sbca-admin";
        if (!sessionStorage.getItem(sessionKey)) {
            router.replace('/');
            return;
        }

        loadingIndicator.setVisibility(true);
        getStudents().then(data => {
            setStudents(data);
            loadingIndicator.setVisibility(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const confirmDelete = (rfid: string) => {
        confirmDialog.confirm({
            title: "Delete this student?",
            message: "This action is irreversable. Once deleted, it cannot be undone.",
            confirmText: "Delete anyway",
            cancelText: "Cancel",
            onConfirm() {
                adapter.execute({ payload: { rfid } });
            },
        });
    };

    return <>
        <Head> <title> Students </title> </Head>
        <Stack alignItems={"flex-start"} p={3}>
            <Link href={"/student/new"} passHref>
                <Button variant='contained'> Add new student </Button>
            </Link>
        </Stack>
        <Stack p={2}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> RFID </TableCell>
                            <TableCell> Full Name </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> BirthDate  </TableCell>
                            <TableCell> MobileNumber </TableCell>
                            <TableCell> Department </TableCell>
                            <TableCell>  YearLevel </TableCell>
                            <TableCell> Section </TableCell>
                            <TableCell> Strand </TableCell>
                            <TableCell> Course </TableCell>
                            <TableCell> Last Time in </TableCell>
                            <TableCell> Last Time Out </TableCell>
                            <TableCell> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {student.rfid} </TableCell>
                                <TableCell component="th" scope="row">
                                    {`${student.firstName} ${student.middleName} ${student.lastName}${student.nameExtension}`}
                                </TableCell>
                                <TableCell component="th" scope="row"> {student.email} </TableCell>
                                <TableCell component="th" scope="row"> {student.birthDate} </TableCell>
                                <TableCell component="th" scope="row"> {student.mobileNumber} </TableCell>
                                <TableCell component="th" scope="row"> {student.department} </TableCell>
                                <TableCell component="th" scope="row"> {student.yearLevel} </TableCell>
                                <TableCell component="th" scope="row"> {student.section} </TableCell>
                                <TableCell component="th" scope="row"> {student.strand} </TableCell>
                                <TableCell component="th" scope="row"> {student.course} </TableCell>
                                <TableCell component="th" scope="row"> {formatTime(student, "in")} </TableCell>
                                <TableCell component="th" scope="row"> {formatTime(student, "out")} </TableCell>
                                <TableCell component="th" scope="row">
                                    <Stack direction={"row"} spacing={1}>
                                        <Link href={`/student/edit/${student.rfid}`} passHref>
                                            <Button variant='outlined'> Edit </Button>
                                        </Link>
                                        <IconButton color="primary" aria-label="delete" onClick={() => confirmDelete(student.rfid)}>
                                            <DeleteForeverOutlinedIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    </>;
}
