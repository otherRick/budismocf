'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DrckAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin?tab=events');
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <p className='text-gray-800 text-xl'>Redirecionando para o novo painel administrativo...</p>
    </div>
  );
}
