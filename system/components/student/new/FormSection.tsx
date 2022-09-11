import { Stack, Typography } from '@mui/material';

export default function FormSection(props: {
    sectionTitle: string;
    children: JSX.Element[];
}) {
    return <>
        <Stack style={{ marginTop: '2rem' }} spacing={2}>
            <Typography variant="h5"> {props.sectionTitle} </Typography>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}>
                {props.children}
            </Stack>
        </Stack>
    </>;
}
