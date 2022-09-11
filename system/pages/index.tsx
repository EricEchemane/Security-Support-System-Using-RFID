import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import { Button } from "@mui/material";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [timeInData, setTimeInData] = useState<timeInData>();
  useSocketConnection((data: timeInData) => {
    setTimeInData(data);
  });

  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
    {JSON.stringify(timeInData, null, 4)}
    <Link passHref href={'/student/new'}>
      <Button variant="contained"> add new student </Button>
    </Link>
  </>;
}
