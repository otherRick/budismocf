'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

import ReactMarkdown from 'react-markdown';

type FormData = {
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url?: string; // Campo opcional para a URL da imagem
};

export default function AdminPage() {
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [artigos, setArtigos] = useState<FormData[]>([]);

  useEffect(() => {
    const fetchArtigos = async () => {
      const res = await fetch('/api/artigos');
      const data = await res.json();
      setArtigos(data);
    };
    fetchArtigos();
  }, []);

  const content = watch('content');

  const onSubmit = async (data: FormData) => {
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

  const handleEdit = (artigo: FormData) => {
    setEditingSlug(artigo.slug);
    setValue('title', artigo.title);
    setValue('slug', artigo.slug); // Se quiser desabilitar edição do slug, use `disabled`
    setValue('description', artigo.description || '');
    setValue('content', artigo.content);
    setValue('image_url', artigo.image_url || '');
  };

  const handleDelete = async (slug: string) => {
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

  return (
    <div className='min-h-screen p-8 bg-gray-900'>
      <h1 className='text-3xl font-bold mb-8 text-white'>Painel Admin - Criar Artigo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Título */}
        <div>
          <label className='block font-semibold mb-2 text-white'>Título</label>
          <input
            type='text'
            {...register('title', { required: true })}
            className='w-full p-2 border rounded'
            placeholder='Título do artigo'
          />
        </div>

        {/* Slug */}
        <div>
          <label className='block font-semibold mb-2 text-white'>Slug (URL amigável)</label>
          <input
            type='text'
            {...register('slug', { required: true })}
            className='w-full p-2 border rounded'
            placeholder='exemplo-do-artigo'
          />
        </div>

        {/* URL da Imagem */}
        <div>
          <label htmlFor='image_url' className='block text-white'>
            URL da Imagem
          </label>
          <input
            type='text'
            {...register('image_url')}
            className='w-full p-2 border rounded'
            placeholder='URL da imagem (ex: https://exemplo.com/imagem.jpg)'
          />
        </div>

        {/* Descrição para SEO */}
        <div>
          <label className='block font-semibold mb-2 text-white'>Descrição (para SEO)</label>
          <textarea
            {...register('description')}
            className='w-full p-2 border rounded'
            placeholder='Pequena descrição para SEO'
          />
        </div>

        {/* Editor de Conteúdo (Markdown) */}
        <div>
          <label className='block font-semibold mb-2 text-white'>Conteúdo (Markdown)</label>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setValue('content', text)}
            value={content}
          />
        </div>

        {/* Botão de envio */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Artigo'}
        </button>
      </form>
      <hr className='my-8 border-gray-700' />

      <h2 className='text-2xl font-semibold mb-4 text-white'>Artigos Existentes</h2>
      <ul className='space-y-4'>
        {artigos.map((artigo) => (
          <li
            key={artigo.slug}
            className='p-4 bg-gray-800 rounded flex justify-between items-center'
          >
            <div>
              <p className='text-white font-medium'>{artigo.title}</p>
              <p className='text-sm text-gray-400'>{artigo.slug}</p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => handleEdit(artigo)}
                className='px-3 py-1 bg-yellow-500 text-white rounded'
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(artigo.slug)}
                className='px-3 py-1 bg-red-600 text-white rounded'
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer position='bottom-right' />
    </div>
  );
}
