import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import AdminEvents from './admin/events';

const UltraModernMeditation = dynamic(() => import('../components/ZenRioWeb.client'), {
  ssr: false
});
const MobileFirstMeditation = dynamic(() => import('../components/ZenRioMobile.client'), {
  ssr: false
});

const HomePage = () => {
  const router = useRouter();
  const canonicalUrl = `https://www.zenriocabofrio.com.br${router.asPath}`;

  return (
    <div className='relative'>
      <Head>
        {/* Primary Meta Tags */}
        <title>Meditação em Cabo Frio | ZenRio - Sessões Online e Presenciais</title>
        <meta
          name='title'
          content='Meditação em Cabo Frio | ZenRio - Sessões Online e Presenciais'
        />
        <meta
          name='description'
          content='Grupo de meditação em Cabo Frio. Participe de nossas sessões presenciais na Região dos Lagos ou online. Aprenda técnicas de mindfulness e redução de estresse.'
        />
        <meta
          name='keywords'
          content='meditação, Cabo Frio, mindfulness, Rio de Janeiro, redução de estresse, paz interior, grupo de meditação, zen, budismo'
        />

        {/* Canonical URL */}
        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={canonicalUrl} />
        <meta
          property='og:title'
          content='Meditação em Cabo Frio | ZenRio - Sessões Online e Presenciais'
        />
        <meta
          property='og:description'
          content='Grupo de meditação em Cabo Frio. Participe de nossas sessões presenciais na Região dos Lagos ou online.'
        />
        <meta
          property='og:image'
          content='https://equilibrius.com.br/wp-content/uploads/2023/02/meditacao-aprender-beneficios.jpg'
        />
        <meta property='og:locale' content='pt_BR' />
        <meta property='og:site_name' content='ZenRio Meditação' />

        {/* Twitter */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={canonicalUrl} />
        <meta
          property='twitter:title'
          content='Meditação em Cabo Frio | ZenRio - Sessões Online e Presenciais'
        />
        <meta
          property='twitter:description'
          content='Grupo de meditação em Cabo Frio. Participe de nossas sessões presenciais na Região dos Lagos ou online.'
        />
        <meta
          property='twitter:image'
          content='https://equilibrius.com.br/wp-content/uploads/2023/02/meditacao-aprender-beneficios.jpg'
        />

        {/* Local Business SEO */}
        <meta name='geo.region' content='BR-RJ' />
        <meta name='geo.placename' content='Cabo Frio' />
        <meta name='geo.position' content='-22.8784;-42.0188' />
        <meta name='ICBM' content='-22.8784, -42.0188' />
        <meta name='robots' content='index, follow' />

        {/* Favicons */}
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#f59e0b' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='theme-color' content='#ffffff' />

        {/* Schema.org markup */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'ZenRio Meditação',
            image:
              'https://equilibrius.com.br/wp-content/uploads/2023/02/meditacao-aprender-beneficios.jpg',
            description: 'Grupo de meditação em Cabo Frio, Rio de Janeiro',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. dos Buzios, 500',
              addressLocality: 'Cabo Frio',
              addressRegion: 'RJ',
              postalCode: '28909-000',
              addressCountry: 'BR'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '-22.8784',
              longitude: '-42.0188'
            },
            url: 'https://zenrio.vercel.app/',
            telephone: '+5522999999999',
            priceRange: 'R$0-R$200',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
              opens: '07:00',
              closes: '20:30'
            },
            sameAs: [
              'https://www.instagram.com/zenriocabofrio',
              'https://www.facebook.com/zenriocabofrio'
            ]
          })}
        </script>
      </Head>

      {/* Render appropriate component */}
      {isMobile ? <MobileFirstMeditation /> : <UltraModernMeditation />}
      {/* <AdminEvents /> */}
    </div>
  );
};

export default HomePage;
