import { Button, Stack } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Staff } from 'types/staff.model';
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
import { useRouter } from 'next/router';
import useConfirmDialog from 'hooks/useConfirmDialog';
import useNotification from 'hooks/useNotification';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import HttpAdapter from 'http_adapters/http-adapter-interface';
const formatTime = (staff: Staff | undefined | null, time: "in" | "out") => {
    if (!staff || !staff.visitationRecords || staff.visitationRecords.length === 0) return "none";
    const visit = staff.visitationRecords[staff.visitationRecords.length - 1];
    if (time === "in") {
        if (!visit.timeIn) return "none";
        return dayjs(visit.timeIn.toString()).format("hh:mm a");
    }
    if (time === "out") {
        if (!visit.timeOut) return "none";
        return dayjs(visit.timeOut.toString()).format("hh:mm a");
    }
};
const getStaff = async () => {
    const { url } = socketConfig;
    const res = await fetch(url + "/staff/get/all");
    const data = await res.json();
    if (res.ok) return data.data;
    return [];
};

export default function StaffPage() {
    const [staff, setStaff] = useState<Staff[]>([]);
    const loadingIndicator = useLoadingIndicator();
    const router = useRouter();
    const confirmDialog = useConfirmDialog();
    const notify = useNotification();
    const adapter = useHttpAdapter(new HttpAdapter('/staff', 'DELETE'), {
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
        getStaff().then(data => {
            setStaff(data);
            loadingIndicator.setVisibility(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const confirmDelete = (rfid: string) => {
        confirmDialog.confirm({
            title: "Delete this staff?",
            message: "This action is irreversable. Once deleted, it cannot be undone.",
            confirmText: "Delete anyway",
            cancelText: "Cancel",
            onConfirm() {
                adapter.execute({ payload: { rfid } });
            },
        });
    };
    const edit = (staff: Staff) => {
        sessionStorage.setItem("edit", JSON.stringify(staff));
        router.push(`/staff/edit/${staff.rfid}`);
    };

    return <>
        <Head> <title> Staffs </title> </Head>
        <Stack alignItems={"flex-start"} p={3}>
            <Link href={"/staff/new"} passHref>
                <Button variant='contained'> Add new staff </Button>
            </Link>
        </Stack>
        <Stack p={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> RFID </TableCell>
                            <TableCell> Full Name </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> BirthDate  </TableCell>
                            <TableCell> MobileNumber </TableCell>
                            <TableCell> Department </TableCell>
                            <TableCell> Type of staff </TableCell>
                            <TableCell> Last Time in </TableCell>
                            <TableCell> Last Time Out </TableCell>
                            <TableCell align='center'> Action </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staff.map((staff, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {staff.rfid} </TableCell>
                                <TableCell component="th" scope="row">
                                    {`${staff.firstName} ${staff.middleName} ${staff.lastName}${staff.nameExtension}`}
                                </TableCell>
                                <TableCell component="th" scope="row"> {staff.email} </TableCell>
                                <TableCell component="th" scope="row"> {staff.birthDate} </TableCell>
                                <TableCell component="th" scope="row"> {staff.mobileNumber} </TableCell>
                                <TableCell component="th" scope="row"> {staff.department} </TableCell>
                                <TableCell component="th" scope="row"> {staff.typeOfStaff} </TableCell>
                                <TableCell component="th" scope="row"> {formatTime(staff, "in")} </TableCell>
                                <TableCell component="th" scope="row"> {formatTime(staff, "out")} </TableCell>
                                <TableCell component="th" scope="row">
                                    <Stack direction={"row"} spacing={1}>
                                        <Button
                                            onClick={() => edit(staff)}
                                            variant='outlined'> Edit </Button>
                                        <IconButton
                                            onClick={() => confirmDelete(staff.rfid)}
                                            color="primary"
                                            aria-label="delete">
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
