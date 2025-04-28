import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RightContent() {
  const [activeTeaching, setActiveTeaching] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teachings = [
    {
      title: 'Atenção Plena',
      content:
        'A prática de estar completamente presente no momento atual, sem julgamentos ou distrações.'
    },
    {
      title: 'Impermanência',
      content:
        'Todas as coisas são transitórias. Reconhecer isso nos liberta do apego e reduz o sofrimento.'
    },
    {
      title: 'Compaixão',
      content:
        'Cultivar compaixão por todos os seres, incluindo nós mesmos, é essencial para a paz interior.'
    }
  ];

  const benefits = [
    'Redução do estresse',
    'Foco melhorado',
    'Autoconhecimento',
    'Equilíbrio emocional',
    'Sono de qualidade',
    'Paciência',
    'Clareza mental',
    'Bem-estar geral'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl overflow-hidden'
    >
      <div className='relative'>
        <h2 className='text-xl font-bold text-white mb-6'>
          <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
            Sabedoria Budista
          </span>
        </h2>
        <div className='absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-xl'></div>
      </div>

      <div className='relative h-64 mb-6'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTeaching}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className='absolute inset-0 p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl border border-blue-700/30 backdrop-blur-sm'
          >
            <h3 className='font-bold text-white text-lg mb-3'>
              {teachings[activeTeaching].title}
            </h3>
            <p className='text-blue-200'>{teachings[activeTeaching].content}</p>
            <div className='absolute bottom-4 right-4 flex space-x-2'>
              {teachings.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTeaching(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTeaching === idx ? 'bg-amber-400 w-4' : 'bg-blue-400/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='space-y-4'>
        <h3 className='text-sm font-medium text-blue-300'>Benefícios da Prática</h3>
        <div className='grid grid-cols-2 gap-3'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className='p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-400/30 transition-all'
            >
              <div className='flex items-start'>
                <div className='mt-0.5 mr-2 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0'></div>
                <span className='text-sm text-blue-100'>{benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
