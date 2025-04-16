// components/Testimonials.tsx
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Joana Silva',
    feedback:
      'A prática de meditação foi transformadora! Consegui reduzir significativamente o estresse e agora me sinto mais focada e em paz.',
    rating: 5
  },
  {
    name: 'Carlos Oliveira',
    feedback:
      'Participar da meditação online foi uma das melhores decisões que tomei. Estou muito mais relaxado e com uma sensação de leveza.',
    rating: 5
  },
  {
    name: 'Fernanda Lima',
    feedback:
      'Recomendo a prática para todos! Ela tem me ajudado muito a melhorar meu sono e a lidar melhor com as dificuldades do dia a dia.',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className='py-16 px-6 bg-gray-50'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-semibold text-gray-800 mb-4'>
          O Que Dizem Nossos Participantes
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Confira o que outros participantes estão dizendo sobre nossa prática de meditação online.
          Seus depoimentos podem ser a inspiração que você precisa para se juntar a nós!
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className='flex flex-col items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className='mb-4'>
              <span className='text-2xl text-yellow-400'>{'★'.repeat(testimonial.rating)}</span>
            </div>
            <p className='text-gray-600 italic mb-4'>"{testimonial.feedback}"</p>
            <h3 className='text-lg font-semibold text-gray-800'>{testimonial.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
