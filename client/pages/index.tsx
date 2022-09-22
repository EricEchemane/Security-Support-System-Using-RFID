import { Button, Container, Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return <>

    <Head> <title> Security Support System Using RFID </title> </Head>

    <Container>
      <Stack spacing={2}>
        <Link passHref href={'/student/new'}>
          <Button variant='contained'> Add new student </Button>
        </Link>
        <Link passHref href={'/student/time-in'}>
          <Button variant='contained'> Student Time-in </Button>
        </Link>
        <Link passHref href={'/student/time-out'}>
          <Button variant='contained'> Student Time-out </Button>
        </Link>
        <Link passHref href={'/staff/new'}>
          <Button variant='contained'> Add new staff </Button>
        </Link>
        <Link passHref href={'/staff/time-in'}>
          <Button variant='contained'> Staff Time-in </Button>
        </Link>
        <Link passHref href={'/staff/time-out'}>
          <Button variant='contained'> Staff Time-out </Button>
        </Link>
        <Link passHref href={'/time-in'}>
          <Button variant='outlined'> Time-in </Button>
        </Link>
        <Link passHref href={'/time-out'}>
          <Button variant='outlined'> Time-out </Button>
        </Link>
      </Stack>

    </Container>
  </>;
}
