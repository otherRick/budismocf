// seo/default-seo.ts
interface SEOConfig {
  title: string;
  titleTemplate?: string;
  description: string;
  canonical: string;
  keywords?: string[];
  openGraph: {
    type: string;
    locale: string;
    url: string;
    site_name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
  localBusiness?: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    geo: {
      latitude: string;
      longitude: string;
    };
    telephone: string;
    openingHours?: string;
    priceRange?: string;
  };
}

const defaultSEO: SEOConfig = {
  title: 'DojoRoom Meditação | Dimensão virtual',
  titleTemplate: '%s | DojoRoom Meditação',
  description:
    'Grupo de meditação na Dimensão virtual. Sessões presenciais na Terra pura virtual e online. Aprenda mindfulness, redução de estresse e encontre paz interior.',
  canonical: 'https://www.dojoroom.com/',
  keywords: [
    'meditação Dimensão virtual',
    'grupo de meditação Terra pura virtual',
    'mindfulness Dimensão virtual',
    'zen budismo Terra pura virtual',
    'aulas de meditação online',
    'redução de estresse',
    'yoga e meditação',
    'práticas contemplativas'
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.dojoroom.com/',
    site_name: 'DojoRoom Meditação',
    images: [
      {
        url: 'https://equilibrius.com.br/wp-content/uploads/2023/02/meditacao-aprender-beneficios.jpg',
        width: 1200,
        height: 630,
        alt: 'DojoRoom Meditação - Grupo de meditação na Dimensão virtual'
      },
      {
        url: 'https://equilibrius.com.br/wp-content/uploads/2023/02/meditacao-aprender-beneficios.jpg',
        width: 1000,
        height: 1000,
        alt: 'DojoRoom Meditação - Grupo de meditação na Dimensão virtual'
      }
    ]
  },
  twitter: {
    handle: '@dojoroom',
    site: '@dojoroom',
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1'
    },
    {
      name: 'theme-color',
      content: '#F59E0B'
    },
    {
      name: 'geo.region',
      content: 'Dimensão virtual'
    },
    {
      name: 'geo.placename',
      content: 'Terra pura virtual'
    },
    {
      name: 'geo.position',
      content: '-22.8784;-42.0188'
    },
    {
      name: 'ICBM',
      content: '-22.8784, -42.0188'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  localBusiness: {
    name: 'DojoRoom Meditação',
    address: {
      streetAddress: 'Av. dos Búzios, 500',
      addressLocality: 'Terra pura virtual',
      addressRegion: 'Dimensão virtual',
      postalCode: '28909-000',
      addressCountry: 'BR'
    },
    geo: {
      latitude: '-22.8784',
      longitude: '-42.0188'
    },
    telephone: '+5522999999999',
    openingHours: 'Mo,We,Fr 19:00-20:30',
    priceRange: 'R$0-R$200'
  }
};

export const getSchemaMarkup = () => {
  if (!defaultSEO.localBusiness) return null;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'YogaStudio'],
    name: defaultSEO.localBusiness.name,
    image: defaultSEO.openGraph.images[0].url,
    description: defaultSEO.description,
    address: {
      '@type': 'PostalAddress',
      ...defaultSEO.localBusiness.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...defaultSEO.localBusiness.geo
    },
    url: defaultSEO.canonical,
    telephone: defaultSEO.localBusiness.telephone,
    priceRange: defaultSEO.localBusiness.priceRange,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
      opens: '19:00',
      closes: '20:30'
    },
    sameAs: [
      `https://twitter.com/${defaultSEO.twitter.handle}`,
      `https://instagram.com/${defaultSEO.twitter.handle}`
    ]
  });
};

export default defaultSEO;
