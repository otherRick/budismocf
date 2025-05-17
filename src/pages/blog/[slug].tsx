// src/pages/blog/[slug].tsx

import { GetStaticProps, GetStaticPaths } from 'next';
import { Pool } from '@neondatabase/serverless';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import HeaderWeb from '@/components/HeaderWeb';
import Footer from '@/components/Footer';
import MobileFooter from '@/components/mobile/MobileFooter';
import PageWrapper from '@/components/PageWrapper';
import { StarField } from '@/components/magic-ui/StarField';
import FloatingParticles from '@/components/magic-ui/FloatingParticles';

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

  // Buscando o artigo pelo slug no banco com todos os campos relevantes para SEO
  const { rows } = await pool.query(
    `SELECT
      title,
      description,
      content,
      image_url,
      slug,
      created_at,
      updated_at
    FROM articles WHERE slug = $1`,
    [slug]
  );

  const artigo = rows[0];

  if (!artigo) {
    return {
      notFound: true // Se o artigo não for encontrado, exibe a página 404
    };
  }

  // Extrair palavras-chave do conteúdo
  // Extrair palavras do título e descrição, remover palavras comuns
  const stopWords = [
    'de',
    'a',
    'o',
    'que',
    'e',
    'do',
    'da',
    'em',
    'um',
    'para',
    'é',
    'com',
    'não',
    'uma',
    'os',
    'no',
    'se',
    'na',
    'por',
    'mais',
    'as',
    'dos',
    'como',
    'mas',
    'foi',
    'ao',
    'ele',
    'das',
    'tem',
    'à',
    'seu',
    'sua',
    'ou',
    'ser',
    'quando',
    'muito',
    'há',
    'nos',
    'já',
    'está',
    'eu',
    'também',
    'só',
    'pelo',
    'pela',
    'até',
    'isso',
    'ela',
    'entre',
    'era',
    'depois',
    'sem',
    'mesmo',
    'aos',
    'ter',
    'seus',
    'quem',
    'nas',
    'me',
    'esse',
    'eles',
    'estão',
    'você',
    'tinha',
    'foram',
    'essa',
    'num',
    'nem',
    'suas',
    'meu',
    'às',
    'minha',
    'têm',
    'numa',
    'pelos',
    'elas'
  ];

  // Combinar título e descrição, extrair palavras únicas
  const text = `${artigo.title} ${artigo.description}`.toLowerCase();
  const allWords = text
    .split(/\W+/)
    .filter((word) => word.length > 3 && !stopWords.includes(word));

  // Pegar as palavras mais frequentes (até 5)
  const wordCount: Record<string, number> = {};
  allWords.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
  const keywords = sortedWords.slice(0, 5).join(', ');

  // Formatar datas para exibição
  const createdAt = new Date(artigo.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Converter datas para strings para evitar erro de serialização
  const created_at_str = artigo.created_at ? new Date(artigo.created_at).toISOString() : '';
  const updated_at_str = artigo.updated_at ? new Date(artigo.updated_at).toISOString() : '';

  return {
    props: {
      artigo: {
        title: artigo.title,
        description: artigo.description,
        content: artigo.content,
        image_url: artigo.image_url || '',
        slug: artigo.slug,
        created_at: created_at_str,
        updated_at: updated_at_str,
        keywords,
        createdAt,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dojoroom.com'}/blog/${slug}`
      }
    },
    revalidate: 60 // ISR: Revalida a página a cada 60 segundos
  };
};

interface Artigo {
  title: string;
  description: string;
  content: string;
  image_url?: string;
  slug: string;
  keywords: string;
  createdAt: string;
  url: string;
  created_at: string;
  updated_at: string;
}

const ArtigoPage = ({ artigo }: { artigo: Artigo }) => {
  const router = useRouter();
  const canonicalUrl = artigo.url;

  // Função para calcular o tempo de leitura
  const calculateReadingTime = () => {
    // Remover HTML tags
    const text = artigo.content.replace(/<[^>]*>/g, '');
    // Contar palavras (média de 200 palavras por minuto)
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  const readingTime = calculateReadingTime();

  // Estruturar dados para o Schema.org
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.title,
    description: artigo.description,
    image: artigo.image_url,
    datePublished: artigo.created_at,
    dateModified: artigo.updated_at,
    author: {
      '@type': 'Organization',
      name: 'DojoRoom Meditação',
      url: 'https://www.dojoroom.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DojoRoom Meditação',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dojoroom.com/logo.png' // Substitua pelo caminho real do logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    keywords: artigo.keywords
  };

  return (
    <>
      <Head>
        <title>{artigo.title} | DojoRoom Meditação</title>
        <meta name='description' content={artigo.description} />

        {/* Tags Open Graph para compartilhamento em redes sociais */}
        <meta property='og:title' content={artigo.title} />
        <meta property='og:description' content={artigo.description} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={canonicalUrl} />
        {artigo.image_url && <meta property='og:image' content={artigo.image_url} />}
        <meta property='og:site_name' content='DojoRoom Meditação' />
        <meta property='article:published_time' content={artigo.created_at} />
        <meta property='article:modified_time' content={artigo.updated_at} />

        {/* Tags Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={artigo.title} />
        <meta name='twitter:description' content={artigo.description} />
        {artigo.image_url && <meta name='twitter:image' content={artigo.image_url} />}

        {/* Tags para SEO */}
        <meta name='keywords' content={artigo.keywords} />
        <meta name='author' content='DojoRoom Meditação' />
        <link rel='canonical' href={canonicalUrl} />

        {/* Adicionar Schema.org JSON-LD */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <PageWrapper>
        <div className='relative z-10 h-full w-full flex flex-col p-6 md:p-8 lg:p-12'>
          <HeaderWeb />

          <StarField className='fixed inset-0 opacity-20' />
          <div className='relative'>
            <FloatingParticles />
          </div>

          <main className='flex-1 overflow-y-auto scroll-hidden pb-20 pt-4 md:pt-0'>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push('/blog')}
              className='flex items-center mb-6 text-blue-300 hover:text-amber-400 transition-colors'
            >
              <FiArrowLeft className='mr-2' />
              <span>Voltar para todos os artigos</span>
            </motion.button>

            <div className='max-w-4xl mx-auto'>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='relative backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8 shadow-xl'
              >
                {/* Metadados do artigo - data e tempo de leitura */}
                <div className='flex items-center text-blue-300/70 text-sm mb-4 space-x-4'>
                  <div className='flex items-center'>
                    <FiCalendar className='mr-1' />
                    <span>{artigo.createdAt}</span>
                  </div>
                  <div className='flex items-center'>
                    <FiClock className='mr-1' />
                    <span>{readingTime} min de leitura</span>
                  </div>
                </div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4'
                >
                  {artigo.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className='text-lg text-blue-200 mb-8'
                >
                  {artigo.description}
                </motion.p>

                {/* Tags/Keywords */}
                {artigo.keywords && (
                  <div className='mb-6 flex flex-wrap gap-2'>
                    {artigo.keywords.split(',').map((keyword, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50 flex items-center'
                      >
                        <FiTag className='mr-1' />
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {artigo.image_url && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='relative mb-8 overflow-hidden rounded-lg'
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 pointer-events-none'></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artigo.image_url}
                      alt={artigo.title}
                      className='w-full h-auto object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-700'
                      loading='lazy'
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='prose prose-lg max-w-none text-blue-100 mt-6 prose-headings:text-amber-400 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-amber-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:rounded-md'
                  dangerouslySetInnerHTML={{ __html: artigo.content }}
                />

                {/* Compartilhamento */}
                <div className='mt-10 pt-6 border-t border-slate-700/50'>
                  <p className='text-blue-200 mb-3'>Compartilhe este artigo:</p>
                  <div className='flex space-x-4'>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        artigo.title
                      )}&url=${encodeURIComponent(canonicalUrl)}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-300 hover:text-blue-400 transition-colors'
                      aria-label='Compartilhar no Twitter'
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        canonicalUrl
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-300 hover:text-blue-400 transition-colors'
                      aria-label='Compartilhar no Facebook'
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        artigo.title + ' ' + canonicalUrl
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-300 hover:text-blue-400 transition-colors'
                      aria-label='Compartilhar no WhatsApp'
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            </div>
          </main>

          <MobileFooter />
          <Footer />
        </div>
      </PageWrapper>
    </>
  );
};

export default ArtigoPage;
