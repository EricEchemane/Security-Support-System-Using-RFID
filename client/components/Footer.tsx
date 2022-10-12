import { Email, Phone, Language, LocationOn } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Stack
            px={5}
            mt={7}
            direction="row"
            justifyContent="center"
            spacing={8}>
            <Stack direction="row" justifyContent="center" alignContent="center" spacing={1}>
                <Phone />
                <Typography variant='h5'>
                    288422139
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignContent="center" spacing={1}>
                <Email />
                <Typography variant='h5'>
                    admin@sbca.edu.ph
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignContent="center" spacing={1}>
                <Language />
                <Typography variant='h5'>
                    www.sbca.edu.ph
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignContent="center" spacing={1}>
                <LocationOn />
                <Typography variant='h5'>
                    Km. 23. 6 East Service Road, Muntinlupa City
                </Typography>
            </Stack>
        </Stack>
    );
}
