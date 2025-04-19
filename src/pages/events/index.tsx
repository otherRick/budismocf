import { query } from '@/lib/db';

export default async function EventsPage() {
  const { rows: events } = await query('SELECT * FROM events ORDER BY date, hour');

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Próximos Eventos de Meditação</h1>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {events.map((event) => (
          <div key={event.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='p-6'>
              <h2 className='text-xl font-bold mb-2'>{event.title}</h2>
              <p className='text-gray-600 mb-4'>
                {new Date(event.date).toLocaleDateString('pt-BR')} às {event.hour}
              </p>
              <p className='text-gray-700 mb-4'>{event.description}</p>

              <div className='space-y-2'>
                {event.meeting_link && (
                  <a
                    href={event.meeting_link}
                    target='_blank'
                    className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Link da Reunião
                  </a>
                )}
                {event.map_link && (
                  <a
                    href={event.map_link}
                    target='_blank'
                    className='inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2'
                  >
                    Ver no Mapa
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Eventos de Meditação em Cabo Frio | ZenRio',
    description: 'Confira nossos próximos encontros de meditação em Cabo Frio e online.',
    openGraph: {
      title: 'Eventos de Meditação em Cabo Frio | ZenRio',
      description: 'Confira nossos próximos encontros de meditação em Cabo Frio e online.',
      url: 'https://www.zenriocabofrio.com.br/events',
      images: [
        {
          url: 'https://www.zenriocabofrio.com.br/images/events-og.jpg',
          width: 1200,
          height: 630
        }
      ]
    }
  };
}
