import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import Head from "next/head";
import { useCallback, useState } from "react";

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
