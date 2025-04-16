// src/pages/admin/index.tsx
import EventForm from '@/components/admin/EventForm';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();

  async function handleSubmit(data: {
    title: string;
    date: string;
    time: string;
    location: string;
    link: string;
    description: string;
  }) {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o evento');
      }

      // Redireciona ou atualiza a página após o sucesso
      router.push('/admin');
    } catch (error) {
      console.error(error);
      // Trate o erro conforme necessário
    }
  }

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Criar Novo Evento</h1>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
