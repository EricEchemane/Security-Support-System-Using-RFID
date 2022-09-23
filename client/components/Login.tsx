import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login(props: {
    onLoggedInSuccess: () => void;
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };
    return <>
        <Container maxWidth="sm">
            <form method='POST' onSubmit={handleSubmit}>
                <Stack alignItems="stretch" spacing={5} mb={6} mt={12}>
                    <Typography variant='h4' align="center">
                        <AccountCircleIcon style={{ fontSize: "6rem" }} />
                        <Typography variant='h4' align="center"> Admin Login </Typography>
                    </Typography>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        id="outlined-basic"
                        label="Username"
                        variant="filled" />
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="outlined-basic"
                        label="Password"
                        type="password"
                        variant="filled" />
                    <Button size='large' fullWidth variant='contained'> Login </Button>
                </Stack>
            </form>
        </Container>
    </>;
}
