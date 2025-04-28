'use client';

import EventList from '@/components/EventList';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    hour: '',
    meeting_link: '',
    description: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  });

  const router = useRouter();

  const fetchAddress = async (cep: string) => {
    // Remove any non-digit characters
    const cleanedCep = cep.replace(/\D/g, '');

    // Check if CEP is complete (8 digits)
    if (cleanedCep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
            // Keep existing values for number and complement
            number: prev.address.number,
            complement: prev.address.complement
          }
        }));
      } else {
        alert('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP');
    }
  };

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

      const data = await response.json();

      if (response.ok) {
        setFormData({
          title: '',
          date: '',
          hour: '',
          meeting_link: '',
          description: '',
          address: {
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: ''
          }
        });

        localStorage.setItem('showEventCreatedToast', 'true');
        window.location.href = '/';
      } else {
        throw new Error(data.error || 'Falha ao criar evento');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
      console.error('Error:', error); // Add logging
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Special handling for CEP field
    if (name === 'address.cep') {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          cep: value
        }
      }));

      // Trigger address lookup when CEP is complete
      if (value.replace(/\D/g, '').length === 8) {
        fetchAddress(value);
      }
      return;
    }

    // Handle nested address fields
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
      return;
    }

    // Handle regular fields
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

            <div className='space-y-4'>
              <div>
                <label htmlFor='cep' className='block text-sm font-medium text-gray-700'>
                  CEP
                </label>
                <input
                  type='text'
                  name='address.cep'
                  id='cep'
                  value={formData?.address?.cep}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                  placeholder='00000-000'
                />
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                  <label htmlFor='street' className='block text-sm font-medium text-gray-700'>
                    Logradouro
                  </label>
                  <input
                    type='text'
                    name='address.street'
                    id='street'
                    value={formData.address.street}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor='number' className='block text-sm font-medium text-gray-700'>
                    Número
                  </label>
                  <input
                    type='text'
                    name='address.number'
                    id='number'
                    value={formData.address.number}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='complement' className='block text-sm font-medium text-gray-700'>
                  Complemento
                </label>
                <input
                  type='text'
                  name='address.complement'
                  id='complement'
                  value={formData.address.complement}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='neighborhood'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Bairro
                  </label>
                  <input
                    type='text'
                    name='address.neighborhood'
                    id='neighborhood'
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                    Cidade
                  </label>
                  <input
                    type='text'
                    name='address.city'
                    id='city'
                    value={formData.address.city}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label htmlFor='state' className='block text-sm font-medium text-gray-700'>
                  Estado
                </label>
                <input
                  type='text'
                  name='address.state'
                  id='state'
                  value={formData.address.state}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500'
                  readOnly
                />
              </div>
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
            <div className='mt-8'>
              <EventList />
            </div>
            <div className='flex space-x-4'>
              <button
                type='button'
                onClick={() => router.push('/')}
                className='flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              >
                Voltar
              </button>
              <button
                type='submit'
                className='flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
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
