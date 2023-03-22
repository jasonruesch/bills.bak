import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to bills!</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
