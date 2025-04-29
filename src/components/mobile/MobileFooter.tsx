import { motion } from 'framer-motion';
import { AiFillWechat } from 'react-icons/ai';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

export default function MobileFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='flex justify-between items-center pt-3 border-t border-gray-700/50 text-xs md:hidden'
    >
      <p className='text-blue-300/70'>© {new Date().getFullYear()} ZenRio</p>

      <div className='flex space-x-4'>
        <a href='#' className='text-blue-300 hover:text-amber-400'>
          <FiInstagram size={16} />
        </a>
        <a href='#' className='text-blue-300 hover:text-amber-400'>
          <AiFillWechat size={16} />
        </a>
        <a href='#' className='text-blue-300 hover:text-amber-400'>
          <FiYoutube size={16} />
        </a>
      </div>
    </motion.footer>
  );
}
