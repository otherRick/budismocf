// src/pages/admin/events.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import EventForm from '@/components/admin/EventForm';

type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  function handleCreate(data: { title: string; date: string; description: string }) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((newEvent) => {
        setEvents((prev) => [...prev, newEvent]);
        setShowForm(false);
      });
  }

  return (
    <>
      <Head>
        <title>Admin - Eventos</title>
        <meta name='robots' content='noindex' />
      </Head>

      <div className='min-h-screen bg-gray-50 p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Eventos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
          >
            {showForm ? 'Fechar' : 'Novo Evento'}
          </button>
        </div>

        {showForm && <EventForm onSubmit={handleCreate} />}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6'>
          {loading ? (
            <p>Carregando eventos...</p>
          ) : events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className='rounded-2xl border p-4 shadow-sm bg-white'>
                <h2 className='text-xl font-semibold'>{event.title}</h2>
                <p className='text-sm text-gray-500'>{event.date}</p>
                <p className='mt-2 text-gray-700'>{event.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhum evento cadastrado.</p>
          )}
        </div>
      </div>
    </>
  );
}
