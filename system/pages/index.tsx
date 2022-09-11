import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [timeInData, setTimeInData] = useState<timeInData>();
  useSocketConnection((data: timeInData) => {
    setTimeInData(data);
  });

  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
    {JSON.stringify(timeInData, null, 4)}
  </>;
}
