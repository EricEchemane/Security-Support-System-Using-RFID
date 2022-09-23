import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useNotification from 'hooks/useNotification';

export default function Login(props: {
    onLoggedInSuccess: () => void;
}) {
    const notify = useNotification();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            props.onLoggedInSuccess();
            notify("Login successful", "success");
        }
        else notify(data.message, "error");
    };
    return <>
        <Container maxWidth="sm">
            <form method='POST' onSubmit={handleSubmit}>
                <Stack alignItems="stretch" spacing={5} mb={6} mt={12}>
                    <Stack alignItems="stretch">
                        <Typography variant='h4' align="center">
                            <AccountCircleIcon style={{ fontSize: "6rem" }} />
                        </Typography>
                        <Typography variant='h4' align="center"> Admin Login </Typography>
                    </Stack>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        id="username"
                        label="Username"
                        variant="filled" />
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="password"
                        label="Password"
                        type="password"
                        variant="filled" />
                    <Button type='submit' size='large' fullWidth variant='contained'> Login </Button>
                </Stack>
            </form>
        </Container>
    </>;
}
