import SocketConnectionStatus from '@components/shared/SocketConnectionStatus';
import { Container, Stack, TextField, Typography } from '@mui/material';

export default function Form({ values, handleChange, connected }: {
    values: { [key: string]: any; };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    connected: boolean;
}) {
    return <>
        <Container style={{ marginTop: '2rem' }}>
            <SocketConnectionStatus connected={connected} />
            <Typography variant="h3" mt={2}> New Student • {values.rfid} </Typography>

            <Stack style={{ marginTop: '2rem' }} spacing={2}>
                <Typography variant="h5"> Basic info </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}>
                    <TextField
                        fullWidth
                        name="firstName"
                        label="First name"
                        value={values.firstName}
                        onChange={handleChange}
                        variant="outlined" />
                    <TextField
                        fullWidth
                        name="middleName"
                        label="Middle name"
                        value={values.middleName}
                        onChange={handleChange}
                        variant="outlined" />
                    <TextField
                        fullWidth
                        name="lastName"
                        label="Last name"
                        value={values.lastName}
                        onChange={handleChange}
                        variant="outlined" />
                    <TextField
                        fullWidth
                        name="nameExtension"
                        label="Name extension"
                        helperText="eg: Jr."
                        value={values.nameExtension}
                        onChange={handleChange}
                        variant="outlined" />
                </Stack>
            </Stack>
        </Container>
    </>;
}
