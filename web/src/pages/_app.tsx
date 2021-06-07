import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Agendaí</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
