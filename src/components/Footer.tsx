// components/Footer.tsx
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
          {/* Coluna 1: Informações de Contato */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>Contato</h3>
            <p className='text-gray-400'>Email: contato@meditacaocabofrio.com</p>
            <p className='text-gray-400'>Telefone: +55 22 98765-4321</p>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>Siga-nos</h3>
            <div className='flex justify-center space-x-6'>
              <motion.a
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors duration-300'
                whileHover={{ scale: 1.2 }}
              >
                <FaInstagram size={30} />
              </motion.a>
              <motion.a
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors duration-300'
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebook size={30} />
              </motion.a>
              <motion.a
                href='https://wa.me/5522987654321'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors duration-300'
                whileHover={{ scale: 1.2 }}
              >
                <FaWhatsapp size={30} />
              </motion.a>
            </div>
          </div>

          {/* Coluna 3: Links rápidos */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>Links Rápidos</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/privacidade'
                  className='text-gray-400 hover:text-white transition-colors duration-300'
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href='/termos'
                  className='text-gray-400 hover:text-white transition-colors duration-300'
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href='/sobre'
                  className='text-gray-400 hover:text-white transition-colors duration-300'
                >
                  Sobre
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-gray-400 mt-12'>
          <p>&copy; 2025 Meditação Cabo Frio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
