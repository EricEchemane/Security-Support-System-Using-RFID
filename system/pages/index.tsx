import useSocketConnection, { timeInData } from "@app/hooks/useSocketConnection";
import Head from "next/head";
import { useCallback } from "react";

export default function Home() {

  const onTimeIn = useCallback((data: timeInData) => {
    console.log(data);
  }, []);

  useSocketConnection(onTimeIn);


  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
  </>;
}
