// components/CTA.tsx
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className='py-16 px-6 bg-teal-500 text-center text-white'>
      <h2 className='text-3xl md:text-4xl font-semibold mb-6'>Pronto para começar?</h2>
      <p className='text-lg mb-8 max-w-2xl mx-auto'>
        Participe da nossa prática de meditação online ao vivo. Experimente os benefícios de
        relaxamento profundo e equilíbrio mental. Clique abaixo para entrar na sala!
      </p>

      {/* Botão CTA com animação */}
      <motion.a
        href='#inscricao'
        className='inline-block px-10 py-4 bg-yellow-500 text-black text-xl font-bold rounded-full shadow-xl transform transition duration-300 hover:bg-yellow-400 hover:scale-105 active:scale-95'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Participe Agora
      </motion.a>
    </section>
  );
};

export default CTA;
