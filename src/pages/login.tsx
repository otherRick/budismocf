import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Redirecionar para o painel admin
      router.push('/admin');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Administrativo</title>
      </Head>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 w-full max-w-md'>
          <h1 className='text-2xl font-bold text-white mb-6'>Acesso Administrativo</h1>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-white mb-2'>Usuário</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full p-3 bg-gray-700 text-white rounded-lg'
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-white mb-2'>Senha</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 bg-gray-700 text-white rounded-lg'
                required
              />
            </div>

            {error && <p className='text-red-400 mb-4'>{error}</p>}

            <button
              type='submit'
              disabled={loading}
              className='w-full p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50'
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
