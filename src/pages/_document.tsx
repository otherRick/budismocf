// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#0f172a' />
          <link rel='icon' href='/favicon.ico' />
          {/* Adicionando o JSON-LD Schema Markup */}
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Event',
                name: 'Prática de Meditação Online em Cabo Frio',
                startDate: '2025-04-30T20:00:00',
                endDate: '2025-04-30T21:00:00',
                eventAttendanceMode: 'http://schema.org/OnlineEventAttendanceMode',
                eventStatus: 'http://schema.org/EventScheduled',
                location: {
                  '@type': 'Place',
                  name: 'Online',
                  url: 'https://seu-site.com'
                },
                organizer: {
                  '@type': 'Organization',
                  name: 'Meditação Cabo Frio',
                  url: 'https://seu-site.com'
                },
                description:
                  'Participe da prática de meditação online ao vivo em Cabo Frio. Experimente alívio do estresse e relaxamento profundo.'
              })
            }}
          />
        </Head>
        <body className='bg-white text-slate-900'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
