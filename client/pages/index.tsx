import { Button, Container, Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>

    <Container>
      <Stack>
        <Link passHref href={'/student/new'}>
          <Button variant='contained'> Add new student </Button>
        </Link>
      </Stack>
    </Container>
  </>;
}
