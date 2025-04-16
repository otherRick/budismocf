import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What makes your approach unique?',
    answer:
      'We blend traditional Buddhist teachings with modern psychology and neuroscience to create accessible practices for contemporary life.'
  },
  {
    question: 'Do I need prior meditation experience?',
    answer:
      'Not at all. Our resources are designed for both beginners and experienced practitioners.'
  },
  {
    question: 'Is this associated with a specific Buddhist tradition?',
    answer:
      'We draw from various Buddhist traditions but remain non-sectarian, focusing on universal principles of mindfulness and compassion.'
  },
  {
    question: 'How often should I practice?',
    answer:
      'Even a few minutes daily can be beneficial. Consistency is more important than duration.'
  }
];

export default function AboutSection() {
  return (
    <section className='relative h-screen flex items-center justify-center bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4'>
            About MindfulPath
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Our mission is to make the transformative power of Buddhist meditation accessible to
            all.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <motion.img
              src='/images/meditation.jpg'
              alt='Meditation'
              className='rounded-xl shadow-md w-full h-auto'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div>
            <p className='text-gray-600 mb-8'>
              Founded in 2023, MindfulPath brings together decades of monastic training and
              contemporary teaching experience. We believe that the wisdom of Buddhism, when
              practiced sincerely, can bring profound peace and clarity to modern lives.
            </p>

            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FAQ = {
  question: string;
  answer: string;
};

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className='border border-gray-200 rounded-lg overflow-hidden'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center'
      >
        <span className='font-medium text-gray-800'>{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <svg
            className='w-5 h-5 text-amber-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='px-4 py-3 text-gray-600'
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
