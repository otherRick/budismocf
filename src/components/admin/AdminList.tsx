import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Admin = {
  id: number;
  username: string;
  is_master: boolean;
  last_login: string;
};

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/auth/admins');
        if (!res.ok) throw new Error('Falha ao carregar administradores');
        const data = await res.json();
        setAdmins(data);
      } catch (error) {
        toast.error('Erro ao carregar administradores');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500'></div>
      </div>
    );
  }

  if (admins.length === 0) {
    return <p className='text-gray-400 text-center py-4'>Nenhum administrador encontrado.</p>;
  }

  return (
    <div className='space-y-3'>
      {admins.map((admin) => (
        <div
          key={admin.id}
          className='bg-gray-700/30 rounded-lg p-3 flex justify-between items-center'
        >
          <div>
            <p className='text-white font-medium'>
              {admin.username}{' '}
              {admin.is_master && <span className='text-amber-400 text-xs ml-2'>(Master)</span>}
            </p>
            <p className='text-gray-400 text-xs'>
              Último login:{' '}
              {admin.last_login ? new Date(admin.last_login).toLocaleString() : 'Nunca'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
