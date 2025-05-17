'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FormDataProps } from '@/types/formData';
import HeaderWeb from './HeaderWeb';
import CenterContent from './CenterContent';
import RightContent from './RightContent';
import Footer from './Footer';
import LeftContent from './ColumnEvents';
import PageWrapper from './PageWrapper';

const UltraModernMeditation = () => {
  const [events, setEvents] = useState<{ events: FormDataProps[] }>();

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

  return (
    <>
      <Head>
        <title>Meditação Moderna na Dimensão virtual - Sessões Online</title>
      </Head>

      <PageWrapper>
        <div className='relative z-10 h-screen w-full flex flex-col p-6 md:p-8 lg:p-12'>
          <HeaderWeb />
          <main className='grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 h-96'>
            <LeftContent events={events as { events: FormDataProps[] }} />
            <CenterContent />
            <RightContent />
          </main>
          <Footer />
        </div>
      </PageWrapper>
    </>
  );
};

export default UltraModernMeditation;
