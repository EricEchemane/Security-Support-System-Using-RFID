import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import { Button } from "@mui/material";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  const [timeInData, setTimeInData] = useState<timeInData>();
  const [connected, setConnected] = useState(false);
  useSocketConnection(setTimeInData, setConnected);

  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
    <h5> {connected ? 'connected' : 'disconnected'} </h5>
    <div>{JSON.stringify(timeInData, null, 4)}</div>
    <Link passHref href={'/student/new'}>
      <Button variant="contained"> add new student </Button>
    </Link>
  </>;
}
