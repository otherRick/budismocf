// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import defaultSEO, { getSchemaMarkup } from '../seo/default-seo';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Head>
        <script type='application/ld+json'>{getSchemaMarkup()}</script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
