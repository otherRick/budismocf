// seo/default-seo.ts
const defaultSEO = {
  title: 'My SEO App',
  titleTemplate: '%s | My SEO App',
  description: 'Blazing fast SEO-focused app built with Next.js.',
  canonical: 'https://my-seo-app.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-seo-app.com',
    site_name: 'My SEO App',
    images: [
      {
        url: 'https://my-seo-app.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My SEO App'
      }
    ]
  },
  twitter: {
    handle: '@yourhandle',
    site: '@yourhandle',
    cardType: 'summary_large_image'
  }
};

export default defaultSEO;
