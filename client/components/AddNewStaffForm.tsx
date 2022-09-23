import React, { FormEvent } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import useForm from 'hooks/useForm';
import { useRouter } from 'next/router';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import HttpAdapter from 'http_adapters/http-adapter-interface';
import useNotification from 'hooks/useNotification';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Staff } from 'types/staff.model';
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

export default function AddNewStaffForm(props: {
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
    const adapter = useHttpAdapter(new HttpAdapter('/staff', 'POST'), {
        onSuccess: handleOpen,
        onFailed: msg => notify(msg, 'error')
    });
    const cancel = () => router.replace('/');
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        adapter.execute({ payload: { ...values, photo: props.photo } });
    };
    const [teaching, setTeaching] = React.useState('Teaching');
    const handleTeachingChange = (event: SelectChangeEvent) => {
        setTeaching(event.target.value as string);
        values.typeOfStaff = event.target.value;
    };

    const [department, setDepartment] = React.useState('');
    const handleDepartmentChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
        values.department = event.target.value;
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
                        variant="filled" />
                </GridItem>
                <GridItem>
                    <TextField
                        required fullWidth
                        id="middleName"
                        label="Middle name"
                        name="middleName"
                        value={values.middleName}
                        onChange={handleChange}
                        variant="filled" />
                </GridItem>
                <GridItem>
                    <TextField
                        required fullWidth
                        id="lastName"
                        label="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        variant="filled" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth
                        id="nameExtension"
                        label="Name extension or suffix"
                        name="nameExtension"
                        value={values.nameExtension}
                        onChange={handleChange}
                        variant="filled" />
                </GridItem>
                <GridItem>
                    <MobileDatePicker
                        label="Birth Date"
                        inputFormat="MM/DD/YYYY"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                        renderInput={(params) => <TextField variant='filled' fullWidth required {...params} />}
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
                        variant="filled" />
                </GridItem>
                <GridItem>
                    <TextField
                        fullWidth required
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        variant="filled" />
                </GridItem>

                <GridItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type of Staff</InputLabel>
                        <Select
                            variant='filled'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={teaching}
                            label="Type of Staff"
                            onChange={handleTeachingChange}>
                            <MenuItem value={"Non Teaching"}>Non Teaching</MenuItem>
                            <MenuItem value={"Teaching"}>Teaching</MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem>
                    {teaching === "Teaching" && <>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Teaching Department</InputLabel>
                            <Select
                                variant='filled'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Teaching Department"
                                onChange={handleDepartmentChange}>
                                <MenuItem value={"CITCS"}>CITCS</MenuItem>
                                <MenuItem value={"CCJ"}>CJJ</MenuItem>
                                <MenuItem value={"CBA"}>CBA</MenuItem>
                                <MenuItem value={"CTE"}>CTE</MenuItem>
                                <MenuItem value={"CAS"}>CAS</MenuItem>
                                <MenuItem value={"STEM"}>STEM</MenuItem>
                                <MenuItem value={"GAS"}>GAS</MenuItem>
                                <MenuItem value={"HUMSS"}>HUMSS</MenuItem>
                                <MenuItem value={"ABM"}>ABM</MenuItem>
                                <MenuItem value={"ICT"}>ICT</MenuItem>
                            </Select>
                        </FormControl></>}
                    {teaching === "Non Teaching" && <>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Non Teaching Department</InputLabel>
                            <Select
                                variant='filled'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Non Teaching Department"
                                onChange={handleDepartmentChange}>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"Security"}>Secuirity</MenuItem>
                                <MenuItem value={"Nurses"}>Nurses</MenuItem>
                                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                            </Select>
                        </FormControl></>}
                </GridItem>
            </Grid>
            <Stack justifyContent="flex-end" spacing={2} direction="row">
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
                    Staff successfully created success
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

const formInitialValues: Staff = {
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    nameExtension: '',
    photo: '',
    birthDate: '03/29/2000',
    rfid: '',
    mobileNumber: '+63',
    department: '',
    typeOfStaff: 'Teaching',
};