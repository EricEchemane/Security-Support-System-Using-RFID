import HomePage from 'components/Home';
import Login from 'components/Login';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <>

    <Head> <title> Security Support System Using RFID </title> </Head>

    {loggedIn ? <HomePage /> : <Login onLoggedInSuccess={() => setLoggedIn(true)} />}
  </>;
}
