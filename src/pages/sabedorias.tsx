import HeaderWeb from '@/components/HeaderWeb';
import { StarField } from '@/components/magic-ui/StarField';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// import { StarField } from './components/magic-ui';

export default function WisdomPage() {
  const [activeTeaching, setActiveTeaching] = useState(0);
  type ViewMode = 'teachings' | 'sutras' | 'meditation';
  const [viewMode, setViewMode] = useState<ViewMode>('teachings');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeaching((prev) => (prev + 1) % teachings.length);
    }, 12000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teachings = [
    {
      title: 'Rio da Existência',
      content:
        'Assim como a água se molda ao vaso, a mente sábia se adapta à verdade impermanente.',
      symbol: '🌊'
    },
    {
      title: 'Silêncio das Montanhas',
      content:
        'Na quietude encontra-se o eco do universo - escuta com o coração, não com os ouvidos.',
      symbol: '🗻'
    },
    {
      title: 'Dança das Folhas',
      content: 'O apego é como tentar segurar folhas ao vento; abra a mão e encontre a liberdade.',
      symbol: '🍃'
    }
  ];

  return (
    <div className='relative'>
      <div className='p-10 fixed z-50 w-full'>
        <HeaderWeb />
      </div>
      <div className='relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800 md:pt-20'>
        <StarField className='fixed inset-0 opacity-20' />
        {/* Floating Elements */}
        <div className='fixed top-1/4 left-1/3 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-float'></div>
        <div className='fixed top-1/2 right-20 w-32 h-32 bg-blue-300/5 rounded-full blur-xl animate-float-delayed'></div>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className='relative container mx-auto px-4 py-20 overflow-y-auto scroll-hidden h-screen'
        >
          {/* Title Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='text-center mb-20'
          >
            <h1 className='md:text-6xl text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 bg-clip-text text-transparent mb-6'>
              Jardim da Sabedoria Eterna
            </h1>
            <p className='text-blue-300/80  text-lg max-w-2xl mx-auto'>
              Nas brumas do entendimento, cada passo revela novos caminhos - caminhe com leveza e
              olhos abertos
            </p>
          </motion.div>

          {/* Interactive Mode Selector */}
          <div className='flex justify-center md:gap-6 gap-1 mb-16'>
            {['teachings', 'sutras', 'meditation'].map((mode) => (
              <motion.button
                key={mode}
                whileHover={{ scale: 1.05 }}
                onClick={() => setViewMode(mode as ViewMode)}
                className={`md:px-8 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'bg-slate-800/30 text-blue-300/60 hover:bg-slate-700/40'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Main Content Area */}
          <AnimatePresence mode='wait'>
            {viewMode === 'teachings' && (
              <motion.section
                key='teachings'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='max-w-4xl mx-auto'
              >
                <div className='relative h-[600px] bg-slate-800/20 backdrop-blur-xl rounded-3xl border border-slate-700/30 shadow-2xl overflow-hidden scroll-hidden '>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={activeTeaching}
                      initial={{ opacity: 0, rotateX: 15 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: -15 }}
                      transition={{ duration: 1.2, ease: 'backInOut' }}
                      className='p-12 h-full flex flex-col justify-center items-center text-center'
                    >
                      <div className='text-9xl mb-8 opacity-40'>
                        {teachings[activeTeaching].symbol}
                      </div>
                      <h2 className='text-4xl font-medium text-cyan-300 mb-6'>
                        {teachings[activeTeaching].title}
                      </h2>
                      <p className='text-xl text-blue-200/80 leading-relaxed max-w-2xl'>
                        {teachings[activeTeaching].content}
                      </p>
                      <div className='absolute bottom-12 flex gap-3'>
                        {teachings.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTeaching(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              activeTeaching === idx
                                ? 'bg-cyan-400 w-6 rounded-lg'
                                : 'bg-slate-600/50 hover:bg-slate-500'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.section>
            )}

            {/* Other sections would follow similar patterns */}
          </AnimatePresence>

          {/* Wisdom Path Visualization */}
          <motion.div
            className='mt-24 border-t border-slate-700/40 pt-24'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className='text-2xl font-medium text-cyan-400 text-center mb-12'>
              Os Oito Caminhos Entrelaçados
            </h3>
            <div className='flex justify-center gap-8 flex-wrap'>
              {[
                'Visão',
                'Intenção',
                'Fala',
                'Ação',
                'Meio',
                'Esforço',
                'Presença',
                'Concentração'
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 3 : -3 }}
                  className='p-4 bg-slate-800/30 backdrop-blur-lg rounded-xl border border-slate-700/50 hover:border-cyan-400/30 cursor-pointer'
                >
                  <div className='text-cyan-400/80 text-lg'>{item}</div>
                  <div className='text-slate-500 text-sm mt-2'>Passo {idx + 1}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
