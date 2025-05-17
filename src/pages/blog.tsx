'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Article } from '@/types/formData';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiCalendar, FiClock } from 'react-icons/fi';
import HeaderWeb from '@/components/HeaderWeb';
import MobileFooter from '@/components/mobile/MobileFooter';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { StarField } from '@/components/magic-ui/StarField';
import FloatingParticles from '@/components/magic-ui/FloatingParticles';

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Função para calcular o tempo de leitura aproximado
  const calculateReadingTime = (content: string) => {
    // Remover HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    // Contar palavras (média de 200 palavras por minuto)
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/artigos');
        if (!response.ok) {
          throw new Error('Erro ao buscar artigos');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrar artigos com base no termo de pesquisa
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estruturar dados para o Schema.org
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Blog DojoRoom - Artigos sobre Meditação e Bem-estar',
    description:
      'Artigos sobre meditação, mindfulness e práticas para bem-estar mental e espiritual.',
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
        url: 'https://www.dojoroom.com/logo.png'
      }
    }
  };

  return (
    <>
      <Head>
        <title>Blog DojoRoom - Artigos sobre Meditação e Bem-estar</title>
        <meta
          name='description'
          content='Explore nossos artigos sobre meditação, mindfulness e práticas para bem-estar mental e espiritual.'
        />

        {/* Tags Open Graph para compartilhamento em redes sociais */}
        <meta property='og:title' content='Blog DojoRoom - Artigos sobre Meditação e Bem-estar' />
        <meta
          property='og:description'
          content='Explore nossos artigos sobre meditação, mindfulness e práticas para bem-estar mental e espiritual.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://www.dojoroom.com/blog' />
        <meta property='og:site_name' content='DojoRoom Meditação' />

        {/* Tags Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Blog DojoRoom - Artigos sobre Meditação e Bem-estar' />
        <meta
          name='twitter:description'
          content='Explore nossos artigos sobre meditação, mindfulness e práticas para bem-estar mental e espiritual.'
        />

        {/* Tags para SEO */}
        <meta
          name='keywords'
          content='meditação, mindfulness, bem-estar, zen, budismo, práticas meditativas, saúde mental'
        />
        <meta name='author' content='DojoRoom Meditação' />
        <link rel='canonical' href='https://www.dojoroom.com/blog' />

        {/* Adicionar Schema.org JSON-LD */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
            <div className='max-w-6xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mb-10 text-center'
              >
                <h1 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4'>
                  Blog DojoRoom
                </h1>
                <p className='text-lg text-blue-200 max-w-2xl mx-auto'>
                  Explore nossos artigos sobre meditação, mindfulness e práticas para bem-estar
                  mental e espiritual.
                </p>
              </motion.div>

              {/* Barra de pesquisa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='relative max-w-xl mx-auto mb-12'
              >
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Pesquisar artigos...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full py-3 px-5 pl-12 bg-slate-800/50 border border-slate-700/50 rounded-full text-blue-100 placeholder-blue-300/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all'
                  />
                  <FiSearch
                    className='absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/70'
                    size={18}
                  />
                </div>
              </motion.div>

              {/* Lista de artigos */}
              {isLoading ? (
                <div className='flex justify-center items-center py-20'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500'></div>
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className='text-center py-16'>
                  <FiBookOpen className='mx-auto text-blue-300/50' size={48} />
                  <p className='mt-4 text-blue-200'>
                    {searchTerm
                      ? 'Nenhum artigo encontrado para sua pesquisa.'
                      : 'Nenhum artigo disponível no momento.'}
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {filteredArticles.map((article) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className='relative backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition-all group'
                    >
                      {article.image_url ? (
                        <div className='relative h-48 overflow-hidden'>
                          <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 pointer-events-none'></div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
                            loading='lazy'
                          />
                        </div>
                      ) : (
                        <div className='h-48 bg-gradient-to-br from-blue-900/30 to-slate-800/50 flex items-center justify-center'>
                          <FiBookOpen className='text-amber-400/50' size={48} />
                        </div>
                      )}

                      <div className='p-6'>
                        {/* Metadados do artigo */}
                        <div className='flex items-center text-blue-300/70 text-xs mb-3 space-x-4'>
                          {article.id && (
                            <div className='flex items-center'>
                              <FiCalendar className='mr-1' />
                              <span>{article.id ? formatDate(article.id.toString()) : ''}</span>
                            </div>
                          )}
                          <div className='flex items-center'>
                            <FiClock className='mr-1' />
                            <span>{calculateReadingTime(article.content)} min de leitura</span>
                          </div>
                        </div>

                        <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 mb-2 line-clamp-2'>
                          {article.title}
                        </h2>

                        <p className='text-blue-200/80 mb-4 text-sm line-clamp-3'>
                          {article.description}
                        </p>

                        <Link
                          href={`/blog/${article.slug}`}
                          className='inline-block text-sm text-amber-400 hover:text-amber-300 transition-colors relative group-hover:underline'
                        >
                          Ler artigo completo
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </main>

          <MobileFooter />
          <Footer />
        </div>
      </PageWrapper>
    </>
  );
};

export default Blog;
