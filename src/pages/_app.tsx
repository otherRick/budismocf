// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import defaultSEO, { getSchemaMarkup } from '../seo/default-seo';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Head>
        <script type='application/ld+json'>{getSchemaMarkup()}</script>
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  );
}

export default MyApp;
