'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FormDataProps } from '@/types/formData';
import MobilePrimaryBtn from './mobile/MobilePrimaryBtn';
import EventTab from './mobile/EventTab';
import MeditationTab from './mobile/MeditationTab';
import TeachingTab from './mobile/TeachingTab';
import MobileFooter from './mobile/MobileFooter';
import FloatingParticles from './magic-ui/FloatingParticles';
import MobileHeader from './mobile/MobileHeader';
import WisdomPage from '@/pages/sabedorias';
import Blog from '@/pages/blog';
import EventsPage from '@/pages/eventos';

const MobileFirstMeditation = () => {
  const [activeTab, setActiveTab] = useState('meditation');

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

  return (
    <>
      <Head>
        <title>Meditação Dimensão virtual - Sessões Online</title>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        {/* ... (keep other SEO meta tags) ... */}
      </Head>

      <div className='fixed inset-0 overflow-hidden scroll-hidden  bg-gradient-to-b from-gray-900 to-gray-800'>
        <FloatingParticles />
        <div className='relative h-screen w-full flex flex-col p-4 sm:p-6'>
          <MobileHeader />
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='flex justify-between mb-4 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm z-10'
          >
            {[
              { id: 'events', label: 'Eventos' },
              { id: 'meditation', label: 'Meditar' },
              { id: 'teachings', label: 'Ensino' }
            ].map((tab) => (
              <MobilePrimaryBtn
                active={activeTab === tab.id}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </MobilePrimaryBtn>
            ))}
          </motion.nav>
          <main className='flex-1'>
            <AnimatePresence mode='wait'>
              {activeTab === 'events' && (
                <EventTab onEvents={() => setActiveTab('eventlist')} events={events?.events} />
              )}
              {activeTab === 'meditation' && <MeditationTab />}
              {activeTab === 'teachings' && (
                <TeachingTab
                  onWisdon={() => setActiveTab('wisdon')}
                  onBlog={() => setActiveTab('blog')}
                />
              )}
              {activeTab === 'wisdon' && <WisdomPage />}
              {activeTab === 'blog' && <Blog />}
              {activeTab === 'eventlist' && <EventsPage />}
            </AnimatePresence>
          </main>
          <MobileFooter />
        </div>
      </div>
    </>
  );
};

export default MobileFirstMeditation;
