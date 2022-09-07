import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const getTheme = (theme: 'light' | 'dark') => createTheme({
  palette: {
    mode: theme,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <ThemeProvider theme={getTheme('dark')}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>;
}

export default MyApp;
