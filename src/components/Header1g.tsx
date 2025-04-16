// components/Header.tsx
const Header = () => {
  return (
    <header className='absolute top-0 left-0 w-full p-8 bg-transparent text-white flex justify-between items-center z-10'>
      <div className='text-4xl font-bold'>
        <a href='/'>Meditação Online em Cabo Frio</a>
      </div>
      <div>
        <a
          href='#participar'
          className='bg-blue-600 text-white px-6 py-2 rounded-full text-xl hover:bg-blue-700 transition duration-300'
        >
          Participe Agora!
        </a>
      </div>
    </header>
  );
};
export default Header;
