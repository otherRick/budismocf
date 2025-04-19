'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    hour: '',
    meeting_link: '',
    map_link: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Evento criado com sucesso!');
        setFormData({
          title: '',
          date: '',
          hour: '',
          meeting_link: '',
          map_link: '',
          description: ''
        });
      } else {
        throw new Error('Falha ao criar evento');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <div className='p-8'>
          <div className='text-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Adicionar Novo Evento</h1>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Título do Evento
              </label>
              <input
                type='text'
                name='title'
                id='title'
                required
                value={formData.title}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='date' className='block text-sm font-medium text-gray-700'>
                  Data
                </label>
                <input
                  type='date'
                  name='date'
                  id='date'
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                />
              </div>
              <div>
                <label htmlFor='hour' className='block text-sm font-medium text-gray-700'>
                  Hora
                </label>
                <input
                  type='time'
                  name='hour'
                  id='hour'
                  required
                  value={formData.hour}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                />
              </div>
            </div>

            <div>
              <label htmlFor='meeting_link' className='block text-sm font-medium text-gray-700'>
                Link da Reunião (Zoom, etc.)
              </label>
              <input
                type='url'
                name='meeting_link'
                id='meeting_link'
                value={formData.meeting_link}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
              />
            </div>

            <div>
              <label htmlFor='map_link' className='block text-sm font-medium text-gray-700'>
                Link do Mapa (Google Maps)
              </label>
              <input
                type='url'
                name='map_link'
                id='map_link'
                value={formData.map_link}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
              />
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                Descrição
              </label>
              <textarea
                name='description'
                id='description'
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
              />
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              >
                Criar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
