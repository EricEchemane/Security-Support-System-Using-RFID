import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import useNotification from 'hooks/useNotification';
import useForm from 'hooks/useForm';
import { FormEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Head from 'next/head';
import useBackgroundRemoverHook from 'hooks/useBackgroundRemoverHook';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import HttpAdapter from 'http_adapters/http-adapter-interface';

const GridItem = (props: { children: any; }) => {
    return <Grid item xs={12} sm={6} md={4} lg={3} px={1} py={2}>
        {props.children}
    </Grid>;
};

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

export default function EditStudent() {
    useBackgroundRemoverHook();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const notify = useNotification();
    const { values, handleChange, setValues } = useForm({ "": "" });
    const adapter = useHttpAdapter(new HttpAdapter('/student', 'PATCH'), {
        onFailed: message => notify(message, 'error'),
        onSuccess: () => setModalIsOpen(true)
    });

    useEffect(() => {
        const valuesFromSession = sessionStorage.getItem('edit');
        if (!valuesFromSession) {
            router.back();
            return;
        }
        setValues(JSON.parse(valuesFromSession));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValues]);

    const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(values.birthDate));

    const handleBirthDateChange = (newValue: Dayjs | null) => {
        setBirthDate(newValue);
        values.birthDate = newValue?.format('MM/DD/YYYY');
    };

    const cancel = () => router.back();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await adapter.execute({ payload: values });
    };

    return (
        <>
            <Head> <title> Edit Student Information </title> </Head>
            <Container>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form style={{ marginTop: '2rem', width: '100%' }} onSubmit={handleSubmit}>
                        <Typography variant='h4' mb={2}> Update student information carefully </Typography>
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
                                <TextField
                                    fullWidth required
                                    id="section"
                                    label="Section"
                                    name="section"
                                    value={values.section}
                                    onChange={handleChange}
                                    variant="filled" />
                            </GridItem>
                            <GridItem>
                                <TextField
                                    fullWidth
                                    id="department"
                                    label="Department"
                                    name="department"
                                    value={values.department}
                                    onChange={handleChange}
                                    variant="filled" />
                            </GridItem>
                            <GridItem>
                                <TextField
                                    fullWidth required
                                    id="yearLevel"
                                    label="Year Level"
                                    name="yearLevel"
                                    value={values.yearLevel}
                                    onChange={handleChange}
                                    variant="filled" />
                            </GridItem>
                            <GridItem>
                                <TextField
                                    fullWidth
                                    id="strand"
                                    label="Strand"
                                    name="strand"
                                    value={values.strand}
                                    onChange={handleChange}
                                    variant="filled" />
                            </GridItem>
                            <GridItem>
                                <TextField
                                    fullWidth
                                    id="course"
                                    label="Course"
                                    name="course"
                                    value={values.course}
                                    onChange={handleChange}
                                    variant="filled" />
                            </GridItem>
                        </Grid>
                        <Stack justifyContent="flex-end" spacing={2} direction="row" my={4}>
                            <Button
                                disabled={adapter.loading}
                                size='large'
                                variant='outlined'
                                onClick={cancel}> Cancel </Button>
                            <Button
                                disabled={adapter.loading}
                                type='submit'
                                size='large'
                                variant='contained'> Save </Button>
                        </Stack>
                    </form>
                    <Modal
                        open={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant='h6' align='center' id="modal-modal-description" sx={{ mt: 2 }}>
                                Student successfully udpated
                            </Typography>
                            <Stack spacing={2} mt={3} direction={"row"} justifyContent="stretch" width={"100%"}>
                                <Button
                                    onClick={cancel}
                                    variant="contained"
                                    color='success'
                                    fullWidth> ok </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </LocalizationProvider>
            </Container>
        </>
    );
}