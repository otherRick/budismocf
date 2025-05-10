'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { FiHome, FiFileText, FiCalendar, FiBarChart2, FiLogOut } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import EventList from '@/components/EventList';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

// Dynamically import the Markdown editor to avoid SSR issues
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

type FormData = {
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url?: string;
};

type EventFormData = {
  title: string;
  date: string;
  hour: string;
  meeting_link: string;
  description: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

type TabType = 'dashboard' | 'articles' | 'events' | 'analytics';

export default function AdminDashboard() {
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Articles state
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [artigos, setArtigos] = useState<FormData[]>([]);
  const content = watch('content');

  // Events state
  const [eventFormData, setEventFormData] = useState<EventFormData>({
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

  // Set active tab based on URL query parameter
  useEffect(() => {
    if (tab && typeof tab === 'string') {
      setActiveTab(tab as TabType);
    }
  }, [tab]);

  // Fetch articles
  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const res = await fetch('/api/artigos');
        const data = await res.json();
        setArtigos(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Erro ao carregar artigos');
      }
    };

    if (activeTab === 'articles') {
      fetchArtigos();
    }
  }, [activeTab]);

  // Article form submission
  const onArticleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const method = editingSlug ? 'PUT' : 'POST';

    try {
      const res = await fetch(`/api/artigos${editingSlug ? `/${editingSlug}` : ''}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success(`Artigo ${editingSlug ? 'atualizado' : 'criado'} com sucesso!`);
        reset();
        setEditingSlug(null);
        const updated = await fetch('/api/artigos').then((r) => r.json());
        setArtigos(updated);
      } else {
        const erro = await res.json();
        toast.error(`Erro: ${erro.error || 'Falha.'}`);
      }
    } catch (error) {
      toast.error(`Erro inesperado. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Article edit handler
  const handleArticleEdit = (artigo: FormData) => {
    setEditingSlug(artigo.slug);
    setValue('title', artigo.title);
    setValue('slug', artigo.slug);
    setValue('description', artigo.description || '');
    setValue('content', artigo.content);
    setValue('image_url', artigo.image_url || '');
  };

  // Article delete handler
  const handleArticleDelete = async (slug: string) => {
    if (!confirm('Tem certeza que deseja deletar este artigo?')) return;

    try {
      const res = await fetch(`/api/artigos/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Artigo deletado.');
        setArtigos((prev) => prev.filter((a) => a.slug !== slug));
      } else {
        toast.error('Erro ao deletar.');
      }
    } catch (err) {
      toast.error(`Erro inesperado. ${err}`);
    }
  };

  // Event form handlers
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setEventFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
      return;
    }

    // Handle regular fields
    setEventFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventFormData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Evento criado com sucesso!');
        setEventFormData({
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
      } else {
        throw new Error(data.error || 'Falha ao criar evento');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  // Fetch address from CEP
  const fetchAddress = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEventFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
            number: prev.address.number,
            complement: prev.address.complement
          }
        }));
      } else {
        toast.error('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      toast.error('Erro ao buscar CEP');
    }
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, tab: 'dashboard' },
    { name: 'Artigos', icon: <FiFileText />, tab: 'articles' },
    { name: 'Eventos', icon: <FiCalendar />, tab: 'events' },
    { name: 'Analytics', icon: <FiBarChart2 />, tab: 'analytics' }
  ];

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-800 text-white p-4 shadow-lg'>
        <div className='mb-8 p-4'>
          <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
            ZenRio Admin
          </h1>
          <p className='text-sm text-blue-300/80'>Painel de Controle</p>
        </div>

        <nav className='space-y-2'>
          {navItems.map((item) => (
            <Link
              href={`/admin?tab=${item.tab}`}
              key={item.name}
              className={`flex items-center p-3 rounded-lg transition-all ${
                activeTab === item.tab
                  ? 'bg-amber-600/20 text-amber-400 border-l-4 border-amber-500'
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              <span className='mr-3'>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className='absolute bottom-4 left-4 right-4'>
          <button
            onClick={() => router.push('/')}
            className='flex items-center w-full p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all'
          >
            <FiLogOut className='mr-3' />
            <span>Voltar ao Site</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8 overflow-auto'>
        {activeTab === 'dashboard' && (
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'>
                <h2 className='text-xl font-semibold text-white mb-4'>Artigos Recentes</h2>
                <div className='space-y-4'>
                  {artigos.slice(0, 3).map((artigo) => (
                    <div key={artigo.slug} className='p-3 bg-gray-700/30 rounded-lg'>
                      <p className='text-white font-medium'>{artigo.title}</p>
                    </div>
                  ))}
                  <Link
                    href='/admin?tab=articles'
                    className='inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors'
                  >
                    Ver Todos
                  </Link>
                </div>
              </div>
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'>
                <h2 className='text-xl font-semibold text-white mb-4'>Ações Rápidas</h2>
                <div className='grid grid-cols-2 gap-4'>
                  <Link
                    href='/admin?tab=articles'
                    className='p-4 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-center'
                  >
                    Novo Artigo
                  </Link>
                  <Link
                    href='/admin?tab=events'
                    className='p-4 bg-amber-600/20 text-amber-400 rounded-lg hover:bg-amber-600/30 transition-colors text-center'
                  >
                    Novo Evento
                  </Link>
                  <Link
                    href='/admin?tab=analytics'
                    className='p-4 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-center'
                  >
                    Ver Analytics
                  </Link>
                  <Link
                    href='/'
                    className='p-4 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-center'
                  >
                    Ver Site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold text-white mb-6'>Gerenciar Artigos</h1>

            <form
              onSubmit={handleSubmit(onArticleSubmit)}
              className='space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'
            >
              <h2 className='text-xl font-semibold text-white'>
                {editingSlug ? 'Editar Artigo' : 'Criar Novo Artigo'}
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block font-semibold mb-2 text-white'>Título</label>
                  <input
                    type='text'
                    {...register('title', { required: true })}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    placeholder='Título do artigo'
                  />
                </div>

                <div>
                  <label className='block font-semibold mb-2 text-white'>Slug (URL)</label>
                  <input
                    type='text'
                    {...register('slug', { required: true })}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    placeholder='exemplo-do-artigo'
                  />
                </div>
              </div>

              <div>
                <label className='block font-semibold mb-2 text-white'>URL da Imagem</label>
                <input
                  type='text'
                  {...register('image_url')}
                  className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                  placeholder='https://exemplo.com/imagem.jpg'
                />
              </div>

              <div>
                <label className='block font-semibold mb-2 text-white'>Descrição (SEO)</label>
                <textarea
                  {...register('description')}
                  className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                  placeholder='Descrição para SEO'
                  rows={2}
                />
              </div>

              <div>
                <label className='block font-semibold mb-2 text-white'>Conteúdo (Markdown)</label>
                <MdEditor
                  style={{ height: '300px' }}
                  renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                  onChange={({ text }) => setValue('content', text)}
                  value={content || ''}
                />
              </div>

              <div className='flex justify-end'>
                {editingSlug && (
                  <button
                    type='button'
                    onClick={() => {
                      reset();
                      setEditingSlug(null);
                    }}
                    className='px-4 py-2 bg-gray-600 text-white rounded mr-2'
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50'
                >
                  {isSubmitting ? 'Salvando...' : editingSlug ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'>
              <h2 className='text-xl font-semibold text-white mb-4'>Artigos Existentes</h2>
              {artigos.length === 0 ? (
                <p className='text-gray-400'>Nenhum artigo encontrado.</p>
              ) : (
                <div className='space-y-4'>
                  {artigos.map((artigo) => (
                    <div
                      key={artigo.slug}
                      className='p-4 bg-gray-700/30 rounded-lg flex justify-between items-center'
                    >
                      <div>
                        <p className='text-white font-medium'>{artigo.title}</p>
                        <p className='text-sm text-gray-400'>{artigo.slug}</p>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleArticleEdit(artigo)}
                          className='px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700'
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleArticleDelete(artigo.slug)}
                          className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold text-white mb-6'>Gerenciar Eventos</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <form
                onSubmit={handleEventSubmit}
                className='space-y-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'
              >
                <h2 className='text-xl font-semibold text-white'>Criar Novo Evento</h2>

                <div>
                  <label className='block text-sm font-medium text-white mb-1'>
                    Título do Evento
                  </label>
                  <input
                    type='text'
                    name='title'
                    required
                    value={eventFormData.title}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-white mb-1'>Data</label>
                    <input
                      type='date'
                      name='date'
                      required
                      value={eventFormData.date}
                      onChange={handleEventChange}
                      className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-white mb-1'>Hora</label>
                    <input
                      type='time'
                      name='hour'
                      required
                      value={eventFormData.hour}
                      onChange={handleEventChange}
                      className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-white mb-1'>
                    Link da Reunião
                  </label>
                  <input
                    type='url'
                    name='meeting_link'
                    value={eventFormData.meeting_link}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    placeholder='https://zoom.us/j/...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-white mb-1'>CEP</label>
                  <input
                    type='text'
                    name='address.cep'
                    value={eventFormData.address.cep}
                    onChange={(e) => {
                      handleEventChange(e);
                      if (e.target.value.replace(/\D/g, '').length === 8) {
                        fetchAddress(e.target.value);
                      }
                    }}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                    placeholder='00000-000'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-white mb-1'>Descrição</label>
                  <textarea
                    name='description'
                    rows={3}
                    value={eventFormData.description}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600'
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700'
                  >
                    Criar Evento
                  </button>
                </div>
              </form>

              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'>
                <h2 className='text-xl font-semibold text-white mb-4'>Eventos Existentes</h2>
                <EventList />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>

      <ToastContainer position='bottom-right' />
    </div>
  );
}
