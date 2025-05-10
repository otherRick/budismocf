'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiEye, FiClock, FiArrowUp, FiArrowDown, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

// Mock data for analytics that matches our API response format
const mockAnalyticsData = {
  visitors: {
    count: 1245,
    change: 12.5
  },
  pageViews: {
    count: 3890,
    change: 8.2
  },
  avgTimeOnSite: {
    count: '2m 45s',
    change: -3.1
  },
  topPages: [
    { path: '/', views: 1250, title: 'Home' },
    { path: '/blog', views: 820, title: 'Blog' },
    { path: '/eventos', views: 645, title: 'Eventos' },
    { path: '/sabedorias', views: 430, title: 'Sabedorias' }
  ],
  topSources: [
    { name: 'Google', visitors: 780, percentage: 45 },
    { name: 'Direct', visitors: 540, percentage: 30 },
    { name: 'Instagram', visitors: 320, percentage: 15 },
    { name: 'Facebook', visitors: 210, percentage: 10 }
  ],
  topCountries: [
    { name: 'Brasil', visitors: 850, percentage: 70 },
    { name: 'Portugal', visitors: 120, percentage: 10 },
    { name: 'Estados Unidos', visitors: 100, percentage: 8 },
    { name: 'Outros', visitors: 150, percentage: 12 }
  ],
  visitorsByDay: [
    { day: 'Seg', visitors: 120 },
    { day: 'Ter', visitors: 145 },
    { day: 'Qua', visitors: 132 },
    { day: 'Qui', visitors: 160 },
    { day: 'Sex', visitors: 180 },
    { day: 'Sáb', visitors: 190 },
    { day: 'Dom', visitors: 170 }
  ]
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData);
  const isMobile = useIsMobile();

  // Fetch real analytics data from our API endpoint
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/analytics?timeRange=${timeRange}`);

        if (!response.ok) {
          // If we get a 500 error, it might be because we're in development mode
          // or the Vercel API token is not configured correctly
          console.warn('Could not fetch analytics data. Using mock data instead.');
          // We'll continue using the mock data
          return;
        }

        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        // Keep using the existing data if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  return (
    <div className='space-y-6 md:space-y-8'>
      <div
        className={`${isMobile ? 'flex flex-col space-y-3' : 'flex justify-between items-center'}`}
      >
        <h1 className='text-2xl md:text-3xl font-bold text-white'>Analytics</h1>
        <div className='flex space-x-1 md:space-x-2 bg-gray-700 rounded-lg p-1 self-start md:self-auto'>
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg transition-all text-xs md:text-sm ${
                timeRange === range ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {range === '7d' ? 'Semana' : range === '30d' ? 'Mês' : 'Trimestre'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6'>
        <StatCard
          title='Visitantes'
          value={analyticsData.visitors.count}
          change={analyticsData.visitors.change}
          icon={<FiUsers className='w-5 h-5 md:w-6 md:h-6' />}
          isLoading={isLoading}
          isMobile={isMobile}
        />
        <StatCard
          title='Visualizações'
          value={analyticsData.pageViews.count}
          change={analyticsData.pageViews.change}
          icon={<FiEye className='w-5 h-5 md:w-6 md:h-6' />}
          isLoading={isLoading}
          isMobile={isMobile}
        />
        <StatCard
          title='Tempo Médio'
          value={analyticsData.avgTimeOnSite.count}
          change={analyticsData.avgTimeOnSite.change}
          icon={<FiClock className='w-5 h-5 md:w-6 md:h-6' />}
          isLoading={isLoading}
          isMobile={isMobile}
        />
      </div>

      {/* Charts and Tables */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6'>
        {/* Visitors Chart */}
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
            Visitantes por Dia
          </h2>
          <div className='h-48 md:h-64 flex items-end justify-between space-x-1 md:space-x-2'>
            {analyticsData.visitorsByDay.map((day) => (
              <div key={day.day} className='flex flex-col items-center flex-1'>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.visitors / 200) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className='w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg'
                />
                <div className='mt-2 text-gray-400 text-xs md:text-sm'>{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
            Páginas Mais Visitadas
          </h2>
          <div className='space-y-3 md:space-y-4'>
            {analyticsData.topPages.map((page, index) => (
              <div key={page.path} className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 md:mr-3 text-xs md:text-sm'>
                    {index + 1}
                  </div>
                  <div>
                    <div className='text-white font-medium text-sm md:text-base'>{page.title}</div>
                    <div className='text-gray-400 text-xs md:text-sm'>{page.path}</div>
                  </div>
                </div>
                <div className='text-amber-400 font-medium text-sm md:text-base'>
                  {page.views} views
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sources */}
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
            Principais Fontes
          </h2>
          <div className='space-y-3 md:space-y-4'>
            {analyticsData.topSources.map((source) => (
              <div key={source.name} className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 md:mr-3'>
                    <FiGlobe className='w-3 h-3 md:w-4 md:h-4' />
                  </div>
                  <div className='text-white font-medium text-sm md:text-base'>{source.name}</div>
                </div>
                <div className='text-amber-400 font-medium text-sm md:text-base'>
                  {source.visitors} visitas
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
            Principais Países
          </h2>
          <div className='space-y-3 md:space-y-4'>
            {analyticsData.topCountries.map((country) => (
              <div key={country.name} className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 md:mr-3'>
                    <FiGlobe className='w-3 h-3 md:w-4 md:h-4' />
                  </div>
                  <div className='text-white font-medium text-sm md:text-base'>{country.name}</div>
                </div>
                <div className='flex items-center'>
                  <div className='w-16 md:w-32 bg-gray-700 rounded-full h-1.5 md:h-2 mr-2 md:mr-3'>
                    <div
                      className='bg-amber-500 h-1.5 md:h-2 rounded-full'
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <div className='text-amber-400 font-medium text-sm md:text-base'>
                    {country.visitors}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vercel Analytics Info */}
        <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 md:p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-white mb-3 md:mb-4'>
            Vercel Analytics
          </h2>
          <p className='text-gray-300 mb-3 md:mb-4 text-sm md:text-base'>
            {/* We can't check server-side env vars from the client, so we'll provide a generic message */}
            Os dados mostrados podem ser simulados se você estiver em ambiente de desenvolvimento.
            Para ver dados reais, configure as variáveis de ambiente VERCEL_API_TOKEN e
            VERCEL_PROJECT_ID e faça o deploy para o Vercel.
          </p>
          <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex space-x-3'}`}>
            <a
              href='https://vercel.com/dashboard'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block px-3 py-1.5 md:px-4 md:py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm md:text-base text-center'
            >
              Abrir Vercel Dashboard
            </a>
            <a
              href='https://vercel.com/account/tokens'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm md:text-base text-center'
            >
              Gerar Token
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  isLoading: boolean;
  isMobile: boolean;
}

function StatCard({ title, value, change, icon, isLoading }: StatCardProps) {
  return (
    <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-3 md:p-6'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-gray-400 text-xs md:text-sm'>{title}</h3>
          {isLoading ? (
            <div className='h-6 md:h-8 w-16 md:w-24 bg-gray-700 animate-pulse rounded mt-1'></div>
          ) : (
            <p className='text-xl md:text-2xl font-bold text-white mt-1'>{value}</p>
          )}
        </div>
        <div className='p-2 md:p-3 bg-gray-700/50 rounded-lg'>{icon}</div>
      </div>
      {!isLoading && (
        <div className='mt-3 md:mt-4 flex items-center'>
          {change >= 0 ? (
            <FiArrowUp className='text-green-500 mr-1 w-3 h-3 md:w-4 md:h-4' />
          ) : (
            <FiArrowDown className='text-red-500 mr-1 w-3 h-3 md:w-4 md:h-4' />
          )}
          <span
            className={`${change >= 0 ? 'text-green-500' : 'text-red-500'} text-xs md:text-sm`}
          >
            {Math.abs(change)}%
          </span>
          <span className='text-gray-400 text-xs md:text-sm ml-1 md:ml-2'>
            vs. período anterior
          </span>
        </div>
      )}
    </div>
  );
}
