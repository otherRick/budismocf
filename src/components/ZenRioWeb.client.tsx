'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiCalendar, FiSend, FiArrowRight } from 'react-icons/fi';
import EventCard, { Event } from './WebEventCard';

const UltraModernMeditation = () => {
  const [activeTeaching, setActiveTeaching] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  // Custom cursor position tracking
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Auto-rotate teachings
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic gradient position based on cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const backgroundX = useTransform(cursorX, [0, window.innerWidth], [-20, 20]);
  const backgroundY = useTransform(cursorY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    cursorX.set(cursorPosition.x);
    cursorY.set(cursorPosition.y);
  }, [cursorPosition, cursorX, cursorY]);

  return (
    <>
      <Head>
        <title>Meditação Moderna em Cabo Frio - Sessões Online</title>
        {/* ... (keep previous SEO meta tags) ... */}
      </Head>

      {/* Animated cursor for interactive elements */}
      <motion.div
        className='fixed z-50 w-6 h-6 rounded-full pointer-events-none bg-amber-400/30 backdrop-blur-sm'
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          scale: isHoveringCTA ? 2.5 : 1,
          mixBlendMode: 'exclusion',
          transition: 'transform 0.15s ease-out'
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: isHoveringCTA ? [2.5, 3, 2.5] : [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main container */}
      <div className='fixed inset-0 overflow-hidden bg-gray-900'>
        {/* Dynamic gradient background */}
        <motion.div
          className='absolute inset-0 opacity-90'
          style={{
            background:
              'radial-gradient(circle at center, rgba(125, 211, 252, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(15, 23, 42, 1) 100%)',
            x: backgroundX,
            y: backgroundY
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-amber-400/20'
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 60],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Content */}
        <div className='relative z-10 h-screen w-full flex flex-col p-6 md:p-8 lg:p-12'>
          {/* Header */}
          <header className='flex justify-between items-center mb-8'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
                ZenRio
              </h1>
              <p className='text-sm text-blue-300/80'>Cabo Frio · RJ</p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='hidden md:flex space-x-8'
            >
              {['Eventos', 'Ensino', 'Sobre', 'Contato'].map((item) => (
                <a
                  key={item}
                  href='#'
                  className='relative text-blue-100/80 hover:text-white transition-colors group'
                >
                  {item}
                  <span className='absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300'></span>
                </a>
              ))}
            </motion.nav>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='relative overflow-hidden group'
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'></div>
              <div className='relative px-6 py-2.5 text-sm font-medium text-white bg-transparent border border-amber-500/50 rounded-lg backdrop-blur-sm group-hover:border-transparent transition-all duration-300'>
                Participe
              </div>
            </motion.button>
          </header>

          {/* Main Grid */}
          <main className='grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1'>
            {/* Left Column - Events */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl overflow-hidden'
            >
              <div className='relative'>
                <h2 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <FiCalendar className='mr-3 text-amber-400' />
                  <span className='bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>
                    Próximos Eventos
                  </span>
                </h2>
                <div className='absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl'></div>
              </div>

              <div className='space-y-4 relative z-10'>
                {events.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <motion.div
                className='mt-8 relative'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className='absolute -left-6 top-1/2 w-12 h-12 bg-blue-500/10 rounded-full blur-xl'></div>
                <h3 className='text-sm text-blue-300 mb-3'>Receba lembretes</h3>
                <div className='flex rounded-lg overflow-hidden'>
                  <input
                    type='email'
                    placeholder='Seu email'
                    className='flex-1 px-4 py-3 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30'
                  />
                  <button className='bg-amber-500 hover:bg-amber-600 text-white px-4 flex items-center justify-center transition-colors'>
                    <FiSend />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Center Column - Meditation Focus */}
            <div className='flex flex-col items-center justify-center relative'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className='text-center'
              >
                {/* Animated orb */}

                <div className='relative mb-12'>
                  <div className='relative w-64 h-64'>
                    {/* Glow effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className='absolute inset-0 rounded-full bg-amber-400/20 blur-xl'
                    />

                    {/* Orb layers */}
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      className='absolute inset-0 rounded-full border-2 border-amber-400/10'
                    />

                    <motion.div
                      animate={{
                        rotate: -360,
                        scale: [0.9, 0.95, 0.9]
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      className='absolute inset-4 rounded-full border border-amber-400/15'
                    />

                    {/* Main orb */}
                    <div className='absolute inset-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl overflow-hidden'>
                      <motion.div
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%']
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className='absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-blue-400/5 bg-[length:200%_200%]'
                      />
                      <motion.span
                        className='text-6xl z-10'
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
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className='text-4xl font-bold text-white mb-4'
                >
                  <span className='bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent'>
                    Encontre Paz Interior
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className='text-lg text-blue-200 mb-8 max-w-md mx-auto'
                >
                  Sessões de meditação guiada online e presencial em Cabo Frio
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setIsHoveringCTA(true)}
                    onMouseLeave={() => setIsHoveringCTA(false)}
                    className='relative overflow-hidden group px-8 py-4 rounded-full text-lg font-medium'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-100 group-hover:opacity-90 transition-opacity duration-300 rounded-full'></div>
                    <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
                    <div className='relative z-10 flex items-center justify-center space-x-2 text-white'>
                      <span>Comece Agora</span>
                      <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
                    </div>
                    <div className='absolute inset-0 rounded-full border border-amber-400/30 group-hover:border-amber-400/50 transition-all duration-300 pointer-events-none'></div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Teachings */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl overflow-hidden'
            >
              <div className='relative'>
                <h2 className='text-xl font-bold text-white mb-6'>
                  <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                    Sabedoria Budista
                  </span>
                </h2>
                <div className='absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-xl'></div>
              </div>

              <div className='relative h-64 mb-6'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTeaching}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0 p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl border border-blue-700/30 backdrop-blur-sm'
                  >
                    <h3 className='font-bold text-white text-lg mb-3'>
                      {teachings[activeTeaching].title}
                    </h3>
                    <p className='text-blue-200'>{teachings[activeTeaching].content}</p>
                    <div className='absolute bottom-4 right-4 flex space-x-2'>
                      {teachings.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTeaching(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeTeaching === idx ? 'bg-amber-400 w-4' : 'bg-blue-400/30'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className='space-y-4'>
                <h3 className='text-sm font-medium text-blue-300'>Benefícios da Prática</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className='p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-400/30 transition-all'
                    >
                      <div className='flex items-start'>
                        <div className='mt-0.5 mr-2 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0'></div>
                        <span className='text-sm text-blue-100'>{benefit}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </main>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className='flex justify-between items-center pt-6 border-t border-gray-700/50'
          >
            <div>
              <p className='text-sm text-blue-300/80'>
                © {new Date().getFullYear()} ZenRio Meditação
              </p>
              <p className='text-xs text-blue-400/50'>Cabo Frio · Região dos Lagos · RJ</p>
            </div>

            <div className='flex space-x-6'>
              {['Instagram', 'WhatsApp', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href='#'
                  className='text-sm text-blue-300/80 hover:text-white transition-colors relative group'
                >
                  {social}
                  <span className='absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300'></span>
                </a>
              ))}
            </div>
          </motion.footer>
        </div>
      </div>
    </>
  );
};

// Sample data
const events = [
  {
    title: 'Meditação Guiada Online',
    time: 'Quarta, 19:30',
    location: 'Zoom (link via email)'
  },
  {
    title: 'Retiro de Silêncio',
    time: 'Sábado, 08:00',
    location: 'Praia do Forte, Cabo Frio'
  },
  {
    title: 'Mindfulness para Iniciantes',
    time: 'Sexta, 18:00',
    location: 'Centro Cultural'
  }
];

const teachings = [
  {
    title: 'Atenção Plena',
    content:
      'A prática de estar completamente presente no momento atual, sem julgamentos ou distrações.'
  },
  {
    title: 'Impermanência',
    content:
      'Todas as coisas são transitórias. Reconhecer isso nos liberta do apego e reduz o sofrimento.'
  },
  {
    title: 'Compaixão',
    content:
      'Cultivar compaixão por todos os seres, incluindo nós mesmos, é essencial para a paz interior.'
  }
];

const benefits = [
  'Redução do estresse',
  'Foco melhorado',
  'Autoconhecimento',
  'Equilíbrio emocional',
  'Sono de qualidade',
  'Paciência',
  'Clareza mental',
  'Bem-estar geral'
];

export default UltraModernMeditation;
