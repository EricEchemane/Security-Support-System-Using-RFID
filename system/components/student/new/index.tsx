import { Box, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import SocketConnectionStatus from "@components/shared/SocketConnectionStatus";
import StudentAdapter from "@app/http/adapters/user.adapter";
import useForm from "@app/hooks/useForm";
import { initialValues } from "./form";
import { useState } from "react";
import Head from "next/head";

export default function NewStudent() {
    const [connected, setconnected] = useState(false);
    const { values, handleChange } = useForm(initialValues);
    const [hasUniqueRfid, sethasUniqueRfid] = useState(false);
    const adapter = StudentAdapter.FindByRfid();

    useSocketConnection(async (data: timeInData) => {
        const resData = await adapter.execute({
            params: { rfid: data.uid }
        });
        console.log('res:', resData);
    }, setconnected);

    if (!hasUniqueRfid) return <>
        <Head> <title> New Student </title> </Head>
        <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h3">
                <SocketConnectionStatus connected={connected} /> Get an RFID code first
            </Typography>
            <Box mt={2}>
                {adapter.loading && <LinearProgress />}
            </Box>
        </Container>
    </>;

    return <>
        <Head> <title> New Student </title> </Head>

        <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h3"> New Student </Typography>

            <Stack style={{ marginTop: '2rem' }}>
                <Stack direction={"row"} spacing={2}>
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
