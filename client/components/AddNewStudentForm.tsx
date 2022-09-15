import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useForm from 'hooks/useForm';
import { Student } from 'types/student.model';

export default function AddNewStudentForm(props: {
    uid: string;
}) {
    const { values, handleChange } = useForm({ ...formInitialValues, rfid: props.uid });
    const [birthDate, setBirthDate] = React.useState<Dayjs | null>(
        dayjs('03/29/2000'),
    );
    const handleBirthDateChange = (newValue: Dayjs | null) => {
        setBirthDate(newValue);
        values.birthDate = newValue?.format('DD/MM/YYYY');
    };
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={birthDate}
            onChange={handleBirthDateChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
        />
        <Box style={{ marginTop: '2rem' }} />
        <Typography variant='h6'> Please fill up the form carefully </Typography>

        <Grid container width="100%">
            <GridItem>
                Hello
            </GridItem>
            <GridItem>
                hello
            </GridItem>
            <GridItem>
                hello
            </GridItem>
            <GridItem>
                hello
            </GridItem>
        </Grid>
    </LocalizationProvider>;
}

const GridItem = (props: { children: any; }) => {
    return <Grid item xs={12} sm={6} md={4} lg={3} p={2}>
        {props.children}
    </Grid>;
};

const formInitialValues: Student = {
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    nameExtension: '',
    birthDate: '03/29/2000',
    rfid: '',
    mobileNumber: '',
    section: '',
    department: '',
    yearLevel: '',
    strand: '',
    course: '',
};