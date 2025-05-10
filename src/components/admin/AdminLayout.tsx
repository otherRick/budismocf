'use client';

import { ReactNode } from 'react';
import { FiHome, FiFileText, FiCalendar, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: 'dashboard' | 'articles' | 'events' | 'analytics';
}

export default function AdminLayout({ children, activeTab }: AdminLayoutProps) {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/admin', tab: 'dashboard' },
    { name: 'Artigos', icon: <FiFileText />, path: '/admin?tab=articles', tab: 'articles' },
    { name: 'Eventos', icon: <FiCalendar />, path: '/admin?tab=events', tab: 'events' },
    { name: 'Analytics', icon: <FiBarChart2 />, path: '/admin?tab=analytics', tab: 'analytics' }
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
              href={item.path}
              key={item.name}
              className={`flex items-center p-3 rounded-lg transition-all ${
                activeTab === item.tab
                  ? 'bg-amber-600/20 text-amber-400 border-l-4 border-amber-500'
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              <span className='mr-3'>{item.icon}</span>
              <span>{item.name}</span>
              {activeTab === item.tab && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute right-0 w-1 h-8 bg-amber-500 rounded-l'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
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
      <div className='flex-1 p-8 overflow-auto'>{children}</div>
    </div>
  );
}
