'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Article } from '@/types/formData'; // Adapte esse tipo conforme necessário
import { motion } from 'framer-motion';
import HeaderWeb from '@/components/HeaderWeb';
import MobileFooter from '@/components/mobile/MobileFooter';
import Footer from '@/components/Footer';

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]); // Lista de artigos

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/artigos'); // Certifique-se de que sua API retorna todos os artigos
        if (!response.ok) {
          throw new Error('Erro ao buscar artigos');
        }
        const data = await response.json();
        setArticles(data); // Armazena os artigos recebidos
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Head>
        <title>Blog Buda - Todos os Artigos</title>
      </Head>

      <div className='fixed inset-0 overflow-hidden bg-gray-900 '>
        <motion.div
          className='absolute inset-0 opacity-90'
          style={{
            background:
              'radial-gradient(circle at center, rgba(125, 211, 252, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(15, 23, 42, 1) 100%)'
          }}
        >
          <div className='relative z-10 h-full w-full flex flex-col p-6 md:p-8 lg:p-12  mx-auto px-4 pt-40'>
            <HeaderWeb />

            <main className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1 overflow-y-auto scroll-hidden  '>
              <div className='col-span-2'>
                <h1 className='text-3xl font-bold mb-6'>Todos os Artigos</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-0'>
                  {articles.map((article) => (
                    <div key={article.id} className='bg-white p-4 rounded-lg shadow-lg'>
                      {article.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className='w-full h-48 object-cover rounded-t-lg'
                        />
                      )}
                      <div className='mt-4'>
                        <Link href={`/blog/${article.slug}`}>
                          <p className='text-xl font-semibold text-blue-600 hover:underline'>
                            {article.title}
                          </p>
                        </Link>
                        <p className='text-gray-600 mt-2'>{article.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-span-1'>
                {/* Aqui pode adicionar conteúdo adicional, se necessário */}
              </div>
            </main>
            <MobileFooter />
            <Footer />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Blog;
