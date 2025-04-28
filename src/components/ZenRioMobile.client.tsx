'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiInstagram, FiSend, FiYoutube } from 'react-icons/fi';
import { AiFillWechat } from 'react-icons/ai';
import EventCard from './WebEventCard';
import { FormDataProps } from '@/types/formData';
import EnjoyBtn from './buttons/EnjoyBtn';

const MobileFirstMeditation = () => {
  const [activeTab, setActiveTab] = useState('meditation');
  const [activeTeaching, setActiveTeaching] = useState(0);

  const [events, setEvents] = useState<{ events: FormDataProps[] }>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  // Auto-rotate teachings
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Meditação Cabo Frio - Sessões Online</title>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        {/* ... (keep other SEO meta tags) ... */}
      </Head>

      <div className='fixed inset-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800'>
        {/* Floating particles for mobile */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-amber-400/20 sm:bg-amber-400/30'
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 40],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Main layout */}
        <div className='relative h-screen w-full flex flex-col p-4 sm:p-6'>
          {/* Header - Simplified for mobile */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='flex justify-between items-center mb-4'
          >
            <div>
              <h1 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500'>
                ZenRio
              </h1>
              <p className='text-xs text-blue-300/80'>Cabo Frio · RJ</p>
            </div>

            <EnjoyBtn />
          </motion.header>

          {/* Mobile Navigation Tabs */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='flex justify-between mb-4 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm'
          >
            {[
              { id: 'events', label: 'Eventos' },
              { id: 'meditation', label: 'Meditar' },
              { id: 'teachings', label: 'Ensino' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500/90 text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.nav>

          {/* Content Area */}
          <main className='flex-1 overflow-hidden'>
            <AnimatePresence mode='wait'>
              {/* Events Tab */}
              {activeTab === 'events' && (
                <motion.div
                  key='events'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='h-full bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50 overflow-y-auto'
                >
                  <h2 className='text-lg font-bold text-white mb-4 flex items-center'>
                    <FiCalendar className='mr-2 text-amber-400' />
                    Próximos Eventos
                  </h2>

                  <div className='space-y-3'>
                    {events?.events?.map((event: FormDataProps) => {
                      return <EventCard key={event.id} event={event} />;
                    })}
                  </div>

                  <div className='mt-6'>
                    <h3 className='text-sm text-blue-300 mb-2'>Receba lembretes</h3>
                    <div className='flex rounded-lg overflow-hidden'>
                      <input
                        type='email'
                        placeholder='Seu email'
                        className='flex-1 px-3 py-2 bg-gray-700/50 text-white placeholder-gray-400 text-sm focus:outline-none'
                      />
                      <button className='bg-amber-500 hover:bg-amber-600 text-white px-3 flex items-center justify-center transition-colors'>
                        <FiSend size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Meditation Tab */}
              {activeTab === 'meditation' && (
                <motion.div
                  key='meditation'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='h-full flex flex-col items-center justify-center'
                >
                  {/* Simplified orb for mobile */}
                  <div className='relative mb-8 w-48 h-48'>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className='absolute inset-0 rounded-full bg-amber-400/20 blur-xl'
                    />

                    <div className='absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg'>
                      <motion.span
                        className='text-5xl'
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        🧘
                      </motion.span>
                    </div>
                  </div>

                  <h2 className='text-2xl font-bold text-white text-center mb-3'>
                    <span className='bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent'>
                      Encontre Paz
                    </span>
                  </h2>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className='px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-medium shadow-md flex items-center space-x-2'
                  >
                    <span>Comece Agora</span>
                    <FiArrowRight size={16} />
                  </motion.button>
                </motion.div>
              )}

              {/* Teachings Tab */}
              {activeTab === 'teachings' && (
                <motion.div
                  key='teachings'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className='h-full bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50 overflow-y-auto'
                >
                  <h2 className='text-lg font-bold text-white mb-4'>Sabedoria Budista</h2>

                  <div className='relative h-48 mb-6 bg-gray-700/40 rounded-lg p-4'>
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeTeaching}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className='absolute inset-0 p-4'
                      >
                        <h3 className='font-bold text-white text-sm mb-2'>
                          {teachings[activeTeaching].title}
                        </h3>
                        <p className='text-blue-200 text-xs'>
                          {teachings[activeTeaching].content}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    <div className='absolute bottom-2 right-2 flex space-x-1.5'>
                      {teachings.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTeaching(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            activeTeaching === idx ? 'bg-amber-400 w-3' : 'bg-blue-400/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='text-sm font-medium text-blue-300 mb-2'>Benefícios</h3>
                    <div className='grid grid-cols-2 gap-2'>
                      {benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className='p-2 bg-gray-700/40 rounded border border-gray-600/30 text-xs text-blue-100'
                        >
                          <div className='flex items-start'>
                            <div className='mt-0.5 mr-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0'></div>
                            <span>{benefit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer - Simplified for mobile */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='flex justify-between items-center pt-3 border-t border-gray-700/50 text-xs'
          >
            <p className='text-blue-300/70'>© {new Date().getFullYear()} ZenRio</p>

            <div className='flex space-x-4'>
              <a href='#' className='text-blue-300 hover:text-amber-400'>
                <FiInstagram size={16} />
              </a>
              <a href='#' className='text-blue-300 hover:text-amber-400'>
                <AiFillWechat size={16} />
              </a>
              <a href='#' className='text-blue-300 hover:text-amber-400'>
                <FiYoutube size={16} />
              </a>
            </div>
          </motion.footer>
        </div>
      </div>
    </>
  );
};

const teachings = [
  {
    title: 'Atenção Plena',
    content: 'Pratique estar presente no momento atual, sem julgamentos ou distrações.'
  },
  {
    title: 'Impermanência',
    content: 'Tudo é transitório. Reconhecer isso reduz o apego e o sofrimento.'
  },
  {
    title: 'Compaixão',
    content: 'Cultive compaixão por todos os seres, incluindo você mesmo.'
  }
];

const benefits = [
  'Menos estresse',
  'Mais foco',
  'Autoconhecimento',
  'Equilíbrio',
  'Melhor sono',
  'Paciência'
];

export default MobileFirstMeditation;
