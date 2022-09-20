import React, { FormEvent } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import useForm from 'hooks/useForm';
import { Student } from 'types/student.model';
import { useRouter } from 'next/router';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useNotification from 'hooks/useNotification';

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
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

export default function AddNewStudentForm(props: {
    uid: string;
    photo: string;
    onReset: () => void;
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    const notify = useNotification();
    const { values, handleChange } = useForm({ ...formInitialValues, rfid: props.uid });
    const [birthDate, setBirthDate] = React.useState<Dayjs | null>(
        dayjs('03/29/2000'),
    );
    const handleBirthDateChange = (newValue: Dayjs | null) => {
        setBirthDate(newValue);
        values.birthDate = newValue?.format('MM/DD/YYYY');
    };
    const adapter = useHttpAdapter(new HttpAdapter('/student', 'POST'), {
        onSuccess: () => {
            //  notify('Student successfully created', 'success');
            handleOpen();
        },
        onFailed: msg => notify(msg, 'error')
    });
    const cancel = () => router.replace('/');
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        adapter.execute({ payload: { ...values, photo: props.photo } });
    };


    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form style={{ marginTop: '2rem', width: '100%' }} onSubmit={handleSubmit}>
            <Typography variant='h6' mb={2}> Please fill up the form carefully </Typography>
            <Grid container width="100%">
                <GridItem>
                    <TextField
                        required fullWidth
                        id="firstName"
                        label="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        required fullWidth
                        id="middleName"
                        label="Middle name"
                        name="middleName"
                        value={values.middleName}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        required fullWidth
                        id="lastName"
                        label="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth
                        id="nameExtension"
                        label="Name extension or suffix"
                        name="nameExtension"
                        value={values.nameExtension}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <MobileDatePicker
                        label="Birth Date"
                        inputFormat="MM/DD/YYYY"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                        renderInput={(params) => <TextField fullWidth required {...params} />}
                    />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth required
                        id="mobileNumber"
                        label="Mobile number"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth required
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth required
                        id="section"
                        label="Section"
                        name="section"
                        value={values.section}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth
                        id="department"
                        label="Department"
                        name="department"
                        value={values.department}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth required
                        id="yearLevel"
                        label="Year Level"
                        name="yearLevel"
                        value={values.yearLevel}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth
                        id="strand"
                        label="Strand"
                        name="strand"
                        value={values.strand}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth
                        id="course"
                        label="Course"
                        name="course"
                        value={values.course}
                        onChange={handleChange}
                        variant="outlined" />
                </GridItem>
            </Grid>
            <Stack justifyContent="flex-end" spacing={2} direction="row" my={4}>
                <Button size='large' variant='outlined' onClick={cancel}> Cancel </Button>
                <Button type='submit' size='large' variant='contained'> Save </Button>
            </Stack>
        </form>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                    RFID
                </Typography>
                <Typography align='center' id="modal-modal-description" sx={{ mt: 2 }}>
                    Student successfully created success
                </Typography>
                <Stack spacing={2} mt={3} direction={"row"} justifyContent="stretch" width={"100%"}>
                    <Button onClick={cancel} variant="outlined" fullWidth>Return Home</Button>
                    <Button onClick={props.onReset} variant="contained" fullWidth>Add another</Button>
                </Stack>

            </Box>
        </Modal>
    </LocalizationProvider>;
}

const GridItem = (props: { children: any; }) => {
    return <Grid item xs={12} sm={6} md={4} lg={3} px={1} py={2}>
        {props.children}
    </Grid>;
};

const formInitialValues: Student = {
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    nameExtension: '',
    photo: '',
    birthDate: '03/29/2000',
    rfid: '',
    mobileNumber: '+63',
    section: '',
    department: '',
    yearLevel: '',
    strand: '',
    course: '',
};