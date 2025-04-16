// src/components/admin/EventForm.tsx
import { useState } from 'react';

type Props = {
  onSubmit: (data: {
    title: string;
    date: string;
    time: string;
    location: string;
    link: string;
    description: string;
  }) => void;
  initialData?: {
    title: string;
    date: string;
    time?: string;
    location?: string;
    link?: string;
    description: string;
  };
};

export default function EventForm({ onSubmit, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');
  const [time, setTime] = useState(initialData?.time || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [link, setLink] = useState(initialData?.link || '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date || !description) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setError('');
    onSubmit({ title, date, time, location, link, description });
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 p-4 bg-white rounded-2xl shadow-md'>
      <div>
        <label className='block font-medium mb-1'>Título</label>
        <input
          className='w-full border rounded-lg px-3 py-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block font-medium mb-1'>Data</label>
          <input
            type='date'
            className='w-full border rounded-lg px-3 py-2'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Hora</label>
          <input
            type='time'
            className='w-full border rounded-lg px-3 py-2'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className='block font-medium mb-1'>Local ou Link da Reunião</label>
        <input
          className='w-full border rounded-lg px-3 py-2'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Ex: Sala Zoom ou endereço físico'
        />
      </div>

      <div>
        <label className='block font-medium mb-1'>Link para reserva / contato</label>
        <input
          className='w-full border rounded-lg px-3 py-2'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='Ex: WhatsApp, site de reservas ou Zoom'
        />
      </div>

      <div>
        <label className='block font-medium mb-1'>Descrição</label>
        <textarea
          className='w-full border rounded-lg px-3 py-2'
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Escreva um resumo do evento...'
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        Salvar
      </button>
    </form>
  );
}
