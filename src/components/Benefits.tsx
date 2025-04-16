// components/Benefits.tsx
import { motion } from 'framer-motion';

const Benefits = () => {
  // Array com os benefícios
  const benefits = [
    {
      icon: '🧘‍♂️',
      title: 'Redução de Estresse',
      description:
        'A prática regular de meditação ajuda a aliviar o estresse e melhorar o bem-estar geral.'
    },
    {
      icon: '🧠',
      title: 'Melhora no Foco',
      description: 'A meditação estimula o aumento da concentração e clareza mental.'
    },
    {
      icon: '💆‍♂️',
      title: 'Relaxamento Profundo',
      description:
        'Contribui para um estado de relaxamento profundo e melhora a qualidade do sono.'
    },
    {
      icon: '❤️',
      title: 'Aumento da Autocompaixão',
      description: 'Ajuda a aumentar a autocompaixão e melhorar os relacionamentos interpessoais.'
    },
    {
      icon: '🌍',
      title: 'Acessível para Todos',
      description:
        'Prática online, sem necessidade de experiência prévia, acessível em qualquer lugar.'
    }
  ];

  return (
    <section className='py-16 px-6 bg-gray-50'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-semibold text-gray-800 mb-4'>
          Benefícios da Meditação
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          A meditação online é uma maneira simples e eficaz de alcançar o equilíbrio mental,
          reduzir o estresse e melhorar o foco. Confira alguns dos principais benefícios!
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className='flex flex-col items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className='text-4xl mb-4'>{benefit.icon}</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>{benefit.title}</h3>
            <p className='text-gray-600'>{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
