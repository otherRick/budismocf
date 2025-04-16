// pages/drckadm.tsx
import dynamic from 'next/dynamic';
import Head from 'next/head';

const AdminEvents = dynamic(() => import('./admin/events'), { ssr: false });

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Administração | ZenRio</title>
      </Head>
      <main>
        <AdminEvents />
      </main>
    </>
  );
}
