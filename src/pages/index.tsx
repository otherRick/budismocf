import EventCard from '@/components/WebEventCard';
import { FormDataProps } from '@/types/formData';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { AiFillWechat } from 'react-icons/ai';
import { FiArrowRight, FiCalendar, FiInstagram, FiSend, FiYoutube } from 'react-icons/fi';
import { toast } from 'react-toastify';

// const UltraModernMeditation = dynamic(() => import('../components/ZenRioWeb.client'), {
//   ssr: false
// });
// const MobileFirstMeditation = dynamic(() => import('../components/ZenRioMobile.client'), {
//   ssr: false
// });

const HomePage = () => {
  const [activeTeaching, setActiveTeaching] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [events, setEvents] = useState<FormDataProps[]>([]);

  // For mobile tabs
  const [activeTab, setActiveTab] = useState('meditation');

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

  // Custom cursor position tracking (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const moveCursor = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, []);

  // Auto-rotate teachings
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic gradient position based on cursor (desktop only)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const backgroundX = useTransform(
    cursorX,
    [0, typeof window !== 'undefined' ? window.innerWidth : 0],
    [-20, 20]
  );
  const backgroundY = useTransform(
    cursorY,
    [0, typeof window !== 'undefined' ? window.innerHeight : 0],
    [-20, 20]
  );

  useEffect(() => {
    cursorX.set(cursorPosition.x);
    cursorY.set(cursorPosition.y);
  }, [cursorPosition, cursorX, cursorY]);
  const router = useRouter();
  const canonicalUrl = `https://www.zenriocabofrio.com.br${router.asPath}`;
  useEffect(() => {
    const showToast = localStorage.getItem('showEventCreatedToast');
    if (showToast) {
      toast.success('Evento criado com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });

      localStorage.removeItem('showEventCreatedToast');
    }
  }, []);
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
      <>
        <Head>
          <title>Meditação Moderna em Cabo Frio - Sessões Online</title>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
          {/* ... (keep previous SEO meta tags) ... */}
        </Head>

        {/* Animated cursor for desktop */}
        {typeof window !== 'undefined' && window.innerWidth > 768 && (
          <motion.div
            className='hidden md:fixed md:z-50 md:w-6 md:h-6 md:rounded-full md:pointer-events-none md:bg-amber-400/30 md:backdrop-blur-sm'
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
        )}

        {/* Main container */}
        <div className='fixed inset-0 overflow-hidden bg-gray-900'>
          {/* Dynamic gradient background - desktop */}
          {typeof window !== 'undefined' && window.innerWidth > 768 && (
            <motion.div
              className='hidden md:absolute md:inset-0 md:opacity-90'
              style={{
                background:
                  'radial-gradient(circle at center, rgba(125, 211, 252, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(15, 23, 42, 1) 100%)',
                x: backgroundX,
                y: backgroundY
              }}
            />
          )}

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-amber-400/20 ${
                i < 8 ? 'md:bg-amber-400/20' : 'md:bg-amber-400/30'
              }`}
              style={{
                width:
                  Math.random() *
                    (typeof window !== 'undefined' && window.innerWidth > 768 ? 10 : 8) +
                  (typeof window !== 'undefined' && window.innerWidth > 768 ? 5 : 4),
                height:
                  Math.random() *
                    (typeof window !== 'undefined' && window.innerWidth > 768 ? 10 : 8) +
                  (typeof window !== 'undefined' && window.innerWidth > 768 ? 5 : 4),
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [
                  0,
                  (Math.random() - 0.5) *
                    (typeof window !== 'undefined' && window.innerWidth > 768 ? 60 : 40)
                ],
                x: [
                  0,
                  (Math.random() - 0.5) *
                    (typeof window !== 'undefined' && window.innerWidth > 768 ? 60 : 40)
                ],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration:
                  Math.random() *
                    (typeof window !== 'undefined' && window.innerWidth > 768 ? 10 : 8) +
                  (typeof window !== 'undefined' && window.innerWidth > 768 ? 10 : 8),
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Content */}
          <div className='relative z-10 h-screen w-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12'>
            {/* Header - responsive */}
            <header className='flex justify-between items-center mb-4 sm:mb-6 md:mb-8'>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
                  ZenRio
                </h1>
                <p className='text-xs sm:text-sm text-blue-300/80'>Cabo Frio · RJ</p>
              </motion.div>

              {/* Desktop nav */}
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='hidden md:flex space-x-6 lg:space-x-8'
              >
                {['Eventos', 'Ensino', 'Sobre', 'Contato'].map((item) => (
                  <a
                    key={item}
                    href='#'
                    className='relative text-blue-100/80 hover:text-white transition-colors group text-sm lg:text-base'
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
                <div className='hidden md:block absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'></div>
                <div className='relative px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2.5 text-sm font-medium text-white bg-transparent border border-amber-500/50 rounded-lg backdrop-blur-sm group-hover:border-transparent transition-all duration-300'>
                  Participe
                </div>
              </motion.button>
            </header>

            {/* Mobile Navigation Tabs */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='flex justify-between mb-4 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm md:hidden'
            >
              {[
                { id: 'events', label: 'Eventos' },
                { id: 'meditation', label: 'Meditar' },
                { id: 'teachings', label: 'Ensino' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 text-xs sm:text-sm rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-500/90 text-white'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.nav>

            {/* Main Grid - desktop */}
            <div className='hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 flex-1'>
              {/* Left Column - Events */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-xl overflow-auto'
              >
                <div className='relative'>
                  <h2 className='text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center'>
                    <FiCalendar className='mr-2 sm:mr-3 text-amber-400' />
                    <span className='bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>
                      Próximos Eventos
                    </span>
                  </h2>
                  <div className='absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-amber-400/10 rounded-full blur-xl'></div>
                </div>

                <div className='space-y-3 sm:space-y-4 relative z-10'>
                  {events.map((event: FormDataProps) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                <motion.div
                  className='mt-6 sm:mt-8 relative'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className='absolute -left-4 sm:-left-6 top-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full blur-xl'></div>
                  <h3 className='text-xs sm:text-sm text-blue-300 mb-2 sm:mb-3'>
                    Receba lembretes
                  </h3>
                  <div className='flex rounded-lg overflow-hidden'>
                    <input
                      type='email'
                      placeholder='Seu email'
                      className='flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-700/50 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/30'
                    />
                    <button className='bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 flex items-center justify-center transition-colors'>
                      <FiSend className='text-xs sm:text-sm' />
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
                  <div className='relative mb-8 sm:mb-12'>
                    <div className='relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64'>
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
                        className='absolute inset-3 sm:inset-4 rounded-full border border-amber-400/15'
                      />

                      {/* Main orb */}
                      <div className='absolute inset-4 sm:ins-6 lg:inset-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl overflow-hidden'>
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
                          className='text-4xl sm:text-5xl lg:text-6xl z-10'
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
                    className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4'
                  >
                    <span className='bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent'>
                      Encontre Paz Interior
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className='text-sm sm:text-base lg:text-lg text-blue-200 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto'
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
                      className='relative overflow-hidden group px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium'
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
                className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-xl overflow-hidden'
              >
                <div className='relative'>
                  <h2 className='text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6'>
                    <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                      Sabedoria Budista
                    </span>
                  </h2>
                  <div className='absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-400/10 rounded-full blur-xl'></div>
                </div>

                <div className='relative h-48 sm:h-64 mb-4 sm:mb-6'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={activeTeaching}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className='absolute inset-0 p-4 sm:p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl border border-blue-700/30 backdrop-blur-sm'
                    >
                      <h3 className='font-bold text-white text-base sm:text-lg mb-2 sm:mb-3'>
                        {teachings[activeTeaching].title}
                      </h3>
                      <p className='text-blue-200 text-sm sm:text-base'>
                        {teachings[activeTeaching].content}
                      </p>
                      <div className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-1.5 sm:space-x-2'>
                        {teachings.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTeaching(idx)}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                              activeTeaching === idx ? 'bg-amber-400 sm:w-4' : 'bg-blue-400/30'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className='space-y-3 sm:space-y-4'>
                  <h3 className='text-xs sm:text-sm font-medium text-blue-300'>
                    Benefícios da Prática
                  </h3>
                  <div className='grid grid-cols-2 gap-2 sm:gap-3'>
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className='p-2 sm:p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-400/30 transition-all text-xs sm:text-sm'
                      >
                        <div className='flex items-start'>
                          <div className='mt-0.5 mr-1 sm:mr-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 flex-shrink-0'></div>
                          <span className='text-blue-100'>{benefit}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Content Area */}
            <main className='flex-1 overflow-hidden md:hidden'>
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
                      {events.map((event: FormDataProps) => {
                        return <EventCard key={event.id} event={event} />;
                      })}
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-xs sm:text-sm text-blue-300 mb-2'>Receba lembretes</h3>
                      <div className='flex rounded-lg overflow-hidden'>
                        <input
                          type='email'
                          placeholder='Seu email'
                          className='flex-1 px-3 py-2 bg-gray-700/50 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none'
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
                    <div className='relative mb-8 w-40 h-40 sm:w-48 sm:h-48'>
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
                          className='text-4xl sm:text-5xl'
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

                    <h2 className='text-2xl sm:text-3xl font-bold text-white text-center mb-3'>
                      <span className='bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent'>
                        Encontre Paz
                      </span>
                    </h2>

                    <p className='text-blue-200 text-center mb-6 max-w-xs mx-auto text-sm sm:text-base'>
                      Sessões de meditação em Cabo Frio e online
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className='px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm sm:text-base font-medium shadow-md flex items-center space-x-2'
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
                          <p className='text-blue-200 text-xs sm:text-sm'>
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
                      <h3 className='text-xs sm:text-sm font-medium text-blue-300 mb-2'>
                        Benefícios
                      </h3>
                      <div className='grid grid-cols-2 gap-2'>
                        {benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className='p-2 bg-gray-700/40 rounded border border-gray-600/30 text-xs sm:text-sm text-blue-100'
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

            {/* Footer - responsive */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className='flex justify-between items-center pt-3 sm:pt-4 md:pt-6 border-t border-gray-700/50'
            >
              <div>
                <p className='text-xs sm:text-sm text-blue-300/80'>
                  © {new Date().getFullYear()} ZenRio Meditação
                </p>
                <p className='text-[10px] sm:text-xs text-blue-400/50'>
                  Cabo Frio · Região dos Lagos · RJ
                </p>
              </div>

              {/* Mobile social icons */}
              <div className='flex space-x-3 sm:space-x-4 md:hidden'>
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

              {/* Desktop social links */}
              <div className='hidden md:flex space-x-4 lg:space-x-6'>
                {['Instagram', 'WhatsApp', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href='#'
                    className='text-xs sm:text-sm text-blue-300/80 hover:text-white transition-colors relative group'
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
    </div>
  );
};

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

export default HomePage;
