import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import Head from "next/head";
import { useCallback, useState } from "react";

export default function Home() {
  const [timeInData, settimeInData] = useState<timeInData>();
  const onTimeIn = useCallback((data: timeInData) => {
    settimeInData(data);
  }, []);

  const { socket } = useSocketConnection(onTimeIn);


  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
    <h5> {socket?.connected ? 'connected' : 'disconnected'} </h5>
    {JSON.stringify(timeInData, null, 4)}
  </>;
}
