// src/pages/blog/[slug].tsx

import { GetStaticProps, GetStaticPaths } from 'next';
import { Pool } from '@neondatabase/serverless';
import Head from 'next/head';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscando os slugs de todos os artigos no banco
  const { rows } = await pool.query('SELECT slug FROM articles');

  // Criando os paths com base nos slugs
  const paths = rows.map((row) => ({
    params: { slug: row.slug }
  }));

  return {
    paths,
    fallback: 'blocking' // Garante que a página só será gerada quando a primeira visita acontecer
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  // Buscando o artigo pelo slug no banco
  const { rows } = await pool.query(
    'SELECT title, description, content, image_url FROM articles WHERE slug = $1',
    [slug]
  );

  const artigo = rows[0];

  if (!artigo) {
    return {
      notFound: true // Se o artigo não for encontrado, exibe a página 404
    };
  }

  return {
    props: {
      artigo
    },
    revalidate: 60 // ISR: Revalida a página a cada 60 segundos
  };
};

interface Artigo {
  title: string;
  description: string;
  content: string;
  image_url?: string;
}

const ArtigoPage = ({ artigo }: { artigo: Artigo }) => {
  console.log(artigo.image_url);
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <Head>
        <title>{artigo.title} | Nome do Seu Site</title>
        <meta name='description' content={artigo.description} />
        <meta property='og:title' content={artigo.title} />
        <meta property='og:description' content={artigo.description} />
        {artigo.image_url && <meta property='og:image' content={artigo.image_url} />}
      </Head>

      <article className='space-y-6'>
        <h1 className='text-3xl font-bold text-gray-300'>{artigo.title}</h1>
        <p className='text-lg text-gray-300'>{artigo.description}</p>

        {artigo.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artigo.image_url}
            alt={artigo.title}
            className='w-full h-auto rounded-lg shadow-lg'
            loading='lazy'
          />
        )}

        <div
          className='prose prose-lg text-gray-300 mt-6'
          dangerouslySetInnerHTML={{ __html: artigo.content }}
        />
      </article>
    </div>
  );
};

export default ArtigoPage;
