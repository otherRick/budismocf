'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TeachingTabProps {
  onWisdon: () => void;
  onBlog: () => void;
}

export default function TeachingTab({ onWisdon, onBlog }: TeachingTabProps) {
  const [activeTeaching, setActiveTeaching] = useState(0);

  const teachings = [
    {
      title: 'Atenção Plena',
      content: 'Pratique estar presente no momento atual, sem julgamentos ou distrações.'
    },
    {
      title: 'Impermanência',
      content: 'Tudo é transitório. Reconhecer isso reduz o apego e o sofrimento.'
    },
    {
      title: 'Compaixão',
      content: 'Cultive compaixão por todos os seres, incluindo você mesmo.'
    }
  ];

  const benefits = [
    'Menos estresse',
    'Mais foco',
    'Autoconhecimento',
    'Equilíbrio',
    'Melhor sono',
    'Paciência'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      key='teachings'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='h-full bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50 overflow-y-auto scroll-hidden '
    >
      <h2 className='px-2'>Sabedoria Budista</h2>

      <div className='relative h-48 mb-6 bg-gray-700/40 rounded-lg p-4 mt-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTeaching}
            onClick={onBlog}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 p-4'
          >
            <h3 className='font-bold text-white text-sm mb-2'>
              {teachings[activeTeaching].title}
            </h3>
            <p className='text-blue-200 text-xs'>{teachings[activeTeaching].content}</p>
          </motion.div>
        </AnimatePresence>
        <div className='absolute bottom-2 right-2 flex space-x-1.5'>
          {teachings.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTeaching(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                activeTeaching === idx ? 'bg-amber-400 w-3' : 'bg-blue-400/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium text-blue-300 mb-2'>Benefícios</h3>
        <div className='grid grid-cols-2 gap-2'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={onWisdon}
              className='p-2 bg-gray-700/40 rounded border border-gray-600/30 text-xs text-blue-100'
            >
              <div className='flex items-center'>
                <div className='mt-0.5 mr-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0'></div>
                <span>{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
