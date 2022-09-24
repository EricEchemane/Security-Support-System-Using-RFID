import '../styles/globals.css';
import { NotificationProvider } from 'hooks/useNotification';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingIndicatorProvider } from 'hooks/useLoadingIndicator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ff9980"
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NotificationProvider>
        <LoadingIndicatorProvider>
          <Component {...pageProps} />
        </LoadingIndicatorProvider>
      </NotificationProvider>
    </ThemeProvider>

  );
}

export default MyApp;
