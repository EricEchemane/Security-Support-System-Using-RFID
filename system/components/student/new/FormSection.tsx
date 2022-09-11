import { Stack, Typography } from '@mui/material';

export default function FormSection(props: {
    sectionTitle?: string;
    children: JSX.Element[] | JSX.Element;
}) {
    return <>
        <Stack spacing={2}>
            {props.sectionTitle && <Typography mt={4} variant="h5"> {props.sectionTitle} </Typography>}
            <Stack
                mt={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}>
                {props.children}
            </Stack>
        </Stack>
    </>;
}
