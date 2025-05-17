'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import EventList from '@/components/EventList';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import useIsMobile from '@/hooks/useIsMobile';
import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.admin_token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  try {
    // Verificar JWT
    verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // Token válido, permitir acesso
    return { props: {} };
  } catch (error) {
    // Token inválido, redirecionar para login
    console.log('Token inválido, redirecionando para login', error);

    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

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
    <div className='flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative'>
      {/* Mobile Header */}
      {isMobile && (
        <div className='bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg md:hidden'>
          <div className='flex items-center'>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='mr-3 p-2 rounded-lg hover:bg-gray-700/50'
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
              ZenRio Admin
            </h1>
          </div>
          <div>
            <button
              onClick={() => router.push('/')}
              className='p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg'
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-0 z-20 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`
            : 'relative'
        } w-64 bg-gray-800 text-white p-4 shadow-lg md:translate-x-0`}
      >
        {!isMobile && (
          <div className='mb-8 p-4'>
            <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
              ZenRio Admin
            </h1>
            <p className='text-sm text-blue-300/80'>Painel de Controle</p>
          </div>
        )}

        <nav className='space-y-2 mt-4 md:mt-0'>
          {navItems.map((item) => (
            <Link
              href={`/admin?tab=${item.tab}`}
              key={item.name}
              onClick={() => isMobile && setSidebarOpen(false)}
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

        {!isMobile && (
          <div className='absolute bottom-4 left-4 right-4'>
            <button
              onClick={() => router.push('/')}
              className='flex items-center w-full p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all'
            >
              <FiLogOut className='mr-3' />
              <span>Voltar ao Site</span>
            </button>
          </div>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-10'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className='flex-1 p-4 md:p-8 overflow-auto mt-0 md:mt-0'>
        {activeTab === 'dashboard' && (
          <div className='space-y-6'>
            <h1 className='text-2xl md:text-3xl font-bold text-white'>Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
                <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
                  Artigos Recentes
                </h2>
                <div className='space-y-3 md:space-y-4'>
                  {artigos.slice(0, 3).map((artigo) => (
                    <div key={artigo.slug} className='p-3 bg-gray-700/30 rounded-lg'>
                      <p className='text-white font-medium text-sm md:text-base truncate'>
                        {artigo.title}
                      </p>
                    </div>
                  ))}
                  <Link
                    href='/admin?tab=articles'
                    className='inline-block px-3 py-1.5 md:px-4 md:py-2 bg-amber-600 text-white text-sm md:text-base rounded-lg hover:bg-amber-700 transition-colors'
                  >
                    Ver Todos
                  </Link>
                </div>
              </div>
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
                <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
                  Ações Rápidas
                </h2>
                <div className='grid grid-cols-2 gap-2 md:gap-4'>
                  <Link
                    href='/admin?tab=articles'
                    className='p-3 md:p-4 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-center text-sm md:text-base'
                  >
                    Novo Artigo
                  </Link>
                  <Link
                    href='/admin?tab=events'
                    className='p-3 md:p-4 bg-amber-600/20 text-amber-400 rounded-lg hover:bg-amber-600/30 transition-colors text-center text-sm md:text-base'
                  >
                    Novo Evento
                  </Link>
                  <Link
                    href='/admin?tab=analytics'
                    className='p-3 md:p-4 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-center text-sm md:text-base'
                  >
                    Ver Analytics
                  </Link>
                  <Link
                    href='/'
                    className='p-3 md:p-4 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-center text-sm md:text-base'
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
            <h1 className='text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6'>
              Gerenciar Artigos
            </h1>

            <form
              onSubmit={handleSubmit(onArticleSubmit)}
              className='space-y-4 md:space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'
            >
              <h2 className='text-lg md:text-xl font-semibold text-white'>
                {editingSlug ? 'Editar Artigo' : 'Criar Novo Artigo'}
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
                <div>
                  <label className='block font-semibold mb-1 md:mb-2 text-white text-sm md:text-base'>
                    Título
                  </label>
                  <input
                    type='text'
                    {...register('title', { required: true })}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    placeholder='Título do artigo'
                  />
                </div>

                <div>
                  <label className='block font-semibold mb-1 md:mb-2 text-white text-sm md:text-base'>
                    Slug (URL)
                  </label>
                  <input
                    type='text'
                    {...register('slug', { required: true })}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    placeholder='exemplo-do-artigo'
                  />
                </div>
              </div>

              <div>
                <label className='block font-semibold mb-1 md:mb-2 text-white text-sm md:text-base'>
                  URL da Imagem
                </label>
                <input
                  type='text'
                  {...register('image_url')}
                  className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                  placeholder='https://exemplo.com/imagem.jpg'
                />
              </div>

              <div>
                <label className='block font-semibold mb-1 md:mb-2 text-white text-sm md:text-base'>
                  Descrição (SEO)
                </label>
                <textarea
                  {...register('description')}
                  className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                  placeholder='Descrição para SEO'
                  rows={2}
                />
              </div>

              <div>
                <label className='block font-semibold mb-1 md:mb-2 text-white text-sm md:text-base'>
                  Conteúdo (Markdown)
                </label>
                <MdEditor
                  style={{ height: isMobile ? '200px' : '300px' }}
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
                    className='px-3 py-1.5 md:px-4 md:py-2 bg-gray-600 text-white rounded mr-2 text-sm md:text-base'
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-4 py-1.5 md:px-6 md:py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 text-sm md:text-base'
                >
                  {isSubmitting ? 'Salvando...' : editingSlug ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
              <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
                Artigos Existentes
              </h2>
              {artigos.length === 0 ? (
                <p className='text-gray-400 text-sm md:text-base'>Nenhum artigo encontrado.</p>
              ) : (
                <div className='space-y-3 md:space-y-4'>
                  {artigos.map((artigo) => (
                    <div
                      key={artigo.slug}
                      className={`p-3 md:p-4 bg-gray-700/30 rounded-lg ${
                        isMobile ? 'flex flex-col space-y-2' : 'flex justify-between items-center'
                      }`}
                    >
                      <div>
                        <p className='text-white font-medium text-sm md:text-base'>
                          {artigo.title}
                        </p>
                        <p className='text-xs md:text-sm text-gray-400'>{artigo.slug}</p>
                      </div>
                      <div className={`flex gap-2 ${isMobile ? 'mt-2' : ''}`}>
                        <button
                          onClick={() => handleArticleEdit(artigo)}
                          className='px-2 py-1 md:px-3 md:py-1 bg-amber-600 text-white rounded hover:bg-amber-700 text-xs md:text-sm'
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleArticleDelete(artigo.slug)}
                          className='px-2 py-1 md:px-3 md:py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm'
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
            <h1 className='text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6'>
              Gerenciar Eventos
            </h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
              <form
                onSubmit={handleEventSubmit}
                className='space-y-3 md:space-y-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'
              >
                <h2 className='text-lg md:text-xl font-semibold text-white'>Criar Novo Evento</h2>

                <div>
                  <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                    Título do Evento
                  </label>
                  <input
                    type='text'
                    name='title'
                    required
                    value={eventFormData.title}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                  />
                </div>

                <div className='grid grid-cols-2 gap-2 md:gap-4'>
                  <div>
                    <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                      Data
                    </label>
                    <input
                      type='date'
                      name='date'
                      required
                      value={eventFormData.date}
                      onChange={handleEventChange}
                      className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    />
                  </div>
                  <div>
                    <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                      Hora
                    </label>
                    <input
                      type='time'
                      name='hour'
                      required
                      value={eventFormData.hour}
                      onChange={handleEventChange}
                      className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                    Link da Reunião
                  </label>
                  <input
                    type='url'
                    name='meeting_link'
                    value={eventFormData.meeting_link}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    placeholder='https://zoom.us/j/...'
                  />
                </div>

                <div>
                  <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                    CEP
                  </label>
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
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                    placeholder='00000-000'
                  />
                </div>

                <div>
                  <label className='block text-xs md:text-sm font-medium text-white mb-1'>
                    Descrição
                  </label>
                  <textarea
                    name='description'
                    rows={isMobile ? 2 : 3}
                    value={eventFormData.description}
                    onChange={handleEventChange}
                    className='w-full p-2 border rounded bg-gray-700 text-white border-gray-600 text-sm md:text-base'
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='px-4 py-1.5 md:px-6 md:py-2 bg-amber-600 text-white rounded hover:bg-amber-700 text-sm md:text-base'
                  >
                    Criar Evento
                  </button>
                </div>
              </form>

              <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
                <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
                  Eventos Existentes
                </h2>
                <div className='max-h-[400px] md:max-h-[500px] overflow-y-auto pr-1'>
                  <EventList />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>

      <ToastContainer
        position={isMobile ? 'bottom-center' : 'bottom-right'}
        autoClose={3000}
        hideProgressBar={isMobile}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        style={{ fontSize: isMobile ? '14px' : '16px' }}
      />
    </div>
  );
}
