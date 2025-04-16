import { useState } from 'react';
import { motion } from 'framer-motion';

const teachings = [
  {
    title: 'The Four Noble Truths',
    front: 'Understanding suffering and the path to liberation.',
    back: '1. Suffering exists 2. Suffering has a cause 3. Suffering can end 4. The path to end suffering'
  },
  {
    title: 'The Eightfold Path',
    front: 'The practical guideline to ethical conduct and mental discipline.',
    back: 'Right View, Right Intention, Right Speech, Right Action, Right Livelihood, Right Effort, Right Mindfulness, Right Concentration'
  },
  {
    title: 'Impermanence',
    front: 'The fundamental nature of all conditioned things.',
    back: 'All phenomena are in constant flux. Recognizing this brings freedom from attachment and aversion.'
  }
];

export default function TeachingsSection() {
  return (
    <section className='relative h-screen flex items-center justify-center bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4'>
            Core Buddhist Teachings
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Essential wisdom for cultivating peace and understanding in daily life.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {teachings.map((teaching, index) => (
            <TeachingCard key={index} teaching={teaching} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachingCard({ teaching, index }: { teaching: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className='cursor-pointer h-64 perspective-1000'
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className='relative w-full h-full transition-transform duration-500 transform-style-preserve-3d'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className='absolute w-full h-full backface-hidden bg-amber-50 rounded-xl p-6 shadow-md flex flex-col justify-center items-center border border-amber-100'>
          <div className='text-amber-500 mb-4'>
            <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
          </div>
          <h3 className='text-xl font-serif font-medium text-gray-800 mb-2 text-center'>
            {teaching.title}
          </h3>
          <p className='text-gray-600 text-center'>{teaching.front}</p>
          <div className='mt-4 text-sm text-amber-500'>Click to learn more</div>
        </div>

        {/* Back of card */}
        <div className='absolute w-full h-full backface-hidden bg-white rounded-xl p-6 shadow-md flex flex-col justify-center items-center border border-amber-100 transform rotate-y-180'>
          <h3 className='text-xl font-serif font-medium text-gray-800 mb-4 text-center'>
            {teaching.title}
          </h3>
          <p className='text-gray-600 text-center'>{teaching.back}</p>
          <div className='mt-4 text-sm text-amber-500'>Click to return</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
