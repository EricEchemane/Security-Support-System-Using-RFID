import socketConfig from 'lib/socketConfig';
import { GetServerSideProps } from 'next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Student } from 'types/student.model';
import { useRouter } from 'next/router';
import useLoadingIndicator from 'hooks/useLoadingIndicator';
import useNotification from 'hooks/useNotification';
import useForm from 'hooks/useForm';
import { FormEvent, useState } from 'react';
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

export default function EditStudent(props: { data: Student; }) {
    useBackgroundRemoverHook();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const loadingIndicator = useLoadingIndicator();
    const notify = useNotification();
    const { values, handleChange } = useForm(props.data);
    const adapter = useHttpAdapter(new HttpAdapter('/student', 'PATCH'), {
        onFailed: message => notify(message, 'error'),
        onSuccess: () => notify('Successfully updated', 'success')
    });

    const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(props.data.birthDate));

    const handleBirthDateChange = (newValue: Dayjs | null) => {
        setBirthDate(newValue);
        values.birthDate = newValue?.format('MM/DD/YYYY');
    };

    const cancel = () => router.back();
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        adapter.execute({ payload: values });
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
                            <Button size='large' variant='outlined' onClick={cancel}> Cancel </Button>
                            <Button type='submit' size='large' variant='contained'> Save </Button>
                        </Stack>
                    </form>
                    <Modal
                        open={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
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
                            </Stack>
                        </Box>
                    </Modal>
                </LocalizationProvider>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { params } = ctx;
    const rfid = params?.rfid;
    if (!rfid) return { notFound: true };

    const res: any = await fetch(socketConfig.url + "/student/" + rfid);
    if (!res.ok) return { notFound: true };
    const data = await res.json();

    return {
        props: { data: JSON.parse(JSON.stringify(data.data)) }
    };
};