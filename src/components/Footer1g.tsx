// components/Footer.tsx
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-4'>
      <div className='container mx-auto flex justify-center space-x-6'>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-400 hover:text-white transition-colors duration-300'
        >
          <FaInstagram size={30} />
        </a>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-400 hover:text-white transition-colors duration-300'
        >
          <FaFacebook size={30} />
        </a>
        <a
          href='https://wa.me/5522987654321'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-400 hover:text-white transition-colors duration-300'
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
      <div className='text-center text-gray-400 mt-4'>
        <p>&copy; 2025 Meditação Cabo Frio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
