import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import SocketConnectionStatus from "@components/shared/SocketConnectionStatus";
import { Container, Stack, TextField, Typography } from "@mui/material";
import StudentAdapter from "@app/http/adapters/user.adapter";
import useForm from "@app/hooks/useForm";
import { initialValues } from "./form";
import { useState } from "react";
import Head from "next/head";

export default function NewStudent() {
    const [connected, setconnected] = useState(false);
    const { values, handleChange } = useForm(initialValues);
    const adapter = StudentAdapter.FindByRfid();
    const [rfidStatus, setRfidStatus] = useState<"available" | "used" | "">("");

    useSocketConnection(async (data: timeInData) => {
        values.rfid = "";
        const res = await adapter.execute({
            params: { rfid: data.uid }
        });
        if (res) {
            setRfidStatus("used");
        } else {
            setRfidStatus("available");
            values.rfid = data.uid;
        }
    }, setconnected);

    if (rfidStatus === '' || rfidStatus === 'used') return <>
        <Head> <title> New Student </title> </Head>
        <Container style={{ marginTop: '2rem' }}>
            <SocketConnectionStatus connected={connected} />
            <Typography variant="h3" mt={2}> Get an RFID code first </Typography>
            {rfidStatus === 'used' && <Typography variant="h5" mt={2} color='red'>
                This {values.rfid} RFID code already in use
            </Typography>}
        </Container>
    </>;

    if (rfidStatus === "available") return <>
        <Head> <title> New Student </title> </Head>

        <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h3"> New Student </Typography>

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
