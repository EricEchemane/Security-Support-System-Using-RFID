import SocketConnectionStatus from '@components/shared/SocketConnectionStatus';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mantine/dates';
import FormSection from './FormSection';
import { useRouter } from 'next/router';

export default function Form({ values, handleChange, connected }: {
    values: { [key: string]: any; };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    connected: boolean;
}) {
    const router = useRouter();
    return <>
        <Container style={{ marginTop: '2rem' }}>
            <SocketConnectionStatus connected={connected} />
            <Typography variant="h3" mt={2}> Add new student • {values.rfid} </Typography>

            <FormSection sectionTitle='Basic information'>
                <TextField
                    fullWidth
                    required
                    name="firstName"
                    label="First name"
                    value={values.firstName}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    fullWidth
                    required
                    name="middleName"
                    label="Middle name"
                    value={values.middleName}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    fullWidth
                    required
                    name="lastName"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    fullWidth
                    name="nameExtension"
                    label="Name extension/suffix"
                    value={values.nameExtension}
                    onChange={handleChange}
                    variant="outlined" />
            </FormSection>
            <FormSection>
                <TextField
                    required fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    required fullWidth
                    name="mobileNumber"
                    label="Mobile number"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    fullWidth
                    name="rfid"
                    label="RFID code"
                    value={values.rfid}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                    variant="outlined" />
                <DatePicker
                    size='xl'
                    style={{ width: '100%' }}
                    onChange={v => values.birthDate = v}
                    placeholder="Birth date"
                    withAsterisk />
            </FormSection>
            <FormSection sectionTitle='Academic status'>
                <TextField
                    required fullWidth
                    name="section"
                    label="Section"
                    value={values.section}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    required fullWidth
                    name="department"
                    label="Department"
                    value={values.department}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    required fullWidth
                    name="yearLevel"
                    label="Year level"
                    value={values.yearLevel}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    required fullWidth
                    name="strand"
                    label="Strand"
                    value={values.strand}
                    onChange={handleChange}
                    variant="outlined" />
                <TextField
                    fullWidth
                    name="course"
                    label="Course"
                    value={values.course}
                    onChange={handleChange}
                    variant="outlined" />
            </FormSection>

            <Stack mt={5} pb={5} direction='row' justifyContent='flex-end' spacing={2}>
                <Button
                    onClick={() => router.back()}
                    size='large'
                    variant='outlined'
                    style={{ width: '200px' }}> Cancel </Button>
                <Button
                    size='large'
                    variant='contained'
                    style={{ width: '200px' }}> Save </Button>
            </Stack>
        </Container>
    </>;
}
