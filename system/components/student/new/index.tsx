import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import SocketConnectionStatus from "@components/shared/SocketConnectionStatus";
import StudentAdapter from "@app/http/adapters/user.adapter";
import { Container, Typography } from "@mui/material";
import { initialValues } from "./initial-values";
import useForm from "@app/hooks/useForm";
import { useState } from "react";
import Head from "next/head";
import Form from "./Form";

export default function NewStudent() {
    const [connected, setconnected] = useState(false);
    const { values, handleChange } = useForm(initialValues);
    const adapter = StudentAdapter.FindByRfid();
    const [rfidStatus, setRfidStatus] = useState<"available" | "used" | "">("");

    useSocketConnection(async (data: timeInData) => {
        values.rfid = "";
        await adapter.execute({
            params: { rfid: data.uid },
            onSuccess: () => setRfidStatus("used"),
            onFailed: () => setRfidStatus("available")
        });
        values.rfid = data.uid;
    }, setconnected);

    if (rfidStatus === '') return <>
        <Head> <title> New Student </title> </Head>
        <Container style={{ marginTop: '2rem' }}>
            <SocketConnectionStatus connected={connected} />
            <Typography variant="h3" mt={2}> Get an RFID code first </Typography>
        </Container>
    </>;

    if (rfidStatus === 'used') return <>
        <Head> <title> New Student </title> </Head>
        <Container style={{ marginTop: '2rem' }}>
            <SocketConnectionStatus connected={connected} />
            <Typography variant="h4" mt={2} color='red'>
                {values.rfid} already in used
            </Typography>
        </Container>
    </>;

    if (rfidStatus === "available") return <>
        <Head> <title> New Student </title> </Head>
        <Form connected={connected} values={values} handleChange={handleChange} />
    </>;
}
