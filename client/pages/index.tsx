import HomePage from 'components/Home';
import Login from 'components/Login';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const sessionKey = "sbca-admin";
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const session = sessionStorage.getItem(sessionKey);
    if (session) setLoggedIn(true);
  }, []);
  const login = () => {
    sessionStorage.setItem(sessionKey, sessionKey);
    setLoggedIn(true);
  };

  return <>
    <Head> <title> Security Support System Using RFID </title> </Head>
    {loggedIn ? <HomePage /> : <Login onLoggedInSuccess={login} />}
  </>;
}
