import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from '@utils/getTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <ThemeProvider theme={getTheme('dark')}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>;
}

export default MyApp;
