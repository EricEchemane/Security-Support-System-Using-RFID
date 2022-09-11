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
            <Typography variant="h3" mt={2}> New Student </Typography>

            <Stack style={{ marginTop: '2rem' }} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <TextField
                        fullWidth
                        name="rfid"
                        label="RFID"
                        InputProps={{ readOnly: true }}
                        defaultValue={values.rfid}
                        variant="outlined" />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        variant="outlined" />
                    <TextField
                        fullWidth
                        name="firstName"
                        label="First name"
                        value={values.firstName}
                        onChange={handleChange}
                        variant="outlined" />
                </Stack>
            </Stack>
        </Container>
    </>;
}
