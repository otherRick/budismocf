import { useState } from 'react';
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

  const content = watch('content');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/artigos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success('Artigo criado com sucesso!');
        reset();
      } else {
        const erro = await res.json();
        toast.error(`Erro: ${erro.error || 'Falha ao salvar.'}`);
      }
    } catch (error) {
      console.error('Erro inesperado ao salvar:', error);
      toast.error('Erro inesperado ao salvar.');
    } finally {
      setIsSubmitting(false);
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

      <ToastContainer position='bottom-right' />
    </div>
  );
}
