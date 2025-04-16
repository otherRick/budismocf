import React from 'react';

const Header = () => {
  return (
    <header className='flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 py-16 px-6 text-center text-white'>
      {/* Título Principal */}
      <h1 className='text-4xl md:text-5xl font-extrabold leading-tight mb-4'>
        Meditação Online em Cabo Frio – Prática ao Vivo
      </h1>

      {/* Subtítulo */}
      <p className='text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto'>
        Reduza o estresse, aumente seu foco e encontre equilíbrio interior em nossa prática de
        meditação online, guiada por especialistas. Participe agora!
      </p>

      {/* Botão de Ação */}
      <a
        href='#inscricao'
        className='px-8 py-3 bg-yellow-500 text-black font-semibold text-lg rounded-full shadow-lg hover:bg-yellow-400 transition duration-300'
      >
        Participe Agora
      </a>
    </header>
  );
};

export default Header;
