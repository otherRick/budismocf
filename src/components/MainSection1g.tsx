// components/MainSection.tsx
const MainSection = () => {
  return (
    <section className='relative w-full h-screen flex items-center justify-between px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
      {/* Left Side: Invitation */}
      <div className='w-1/2 space-y-6'>
        <h2 className='text-5xl font-bold'>Prática de Meditação Online</h2>
        <p className='text-lg'>
          Junte-se a nós e experimente o alívio do estresse e maior clareza mental. Prática ao
          vivo, diretamente de Cabo Frio.
        </p>
        <a
          href='#participar'
          className='inline-block bg-yellow-500 text-black px-6 py-3 rounded-full text-2xl font-semibold hover:bg-yellow-600 transition duration-300'
        >
          Participe da Prática
        </a>
      </div>

      {/* Right Side: Teachings */}
      <div className='w-1/2 space-y-6 text-right'>
        <h3 className='text-4xl font-semibold'>Benefícios da Meditação</h3>
        <ul className='space-y-4'>
          <li>Redução do estresse e ansiedade</li>
          <li>Melhora no foco e clareza mental</li>
          <li>Desenvolvimento da paz interior</li>
        </ul>
      </div>
    </section>
  );
};

export default MainSection;
