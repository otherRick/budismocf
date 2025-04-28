import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className='flex justify-between items-center pt-6 border-t border-gray-700/50'
    >
      <div>
        <p className='text-sm text-blue-300/80'>© {new Date().getFullYear()} ZenRio Meditação</p>
        <p className='text-xs text-blue-400/50'>Cabo Frio · Região dos Lagos · RJ</p>
      </div>

      <div className='flex space-x-6'>
        {['Instagram', 'WhatsApp', 'YouTube'].map((social) => (
          <a
            key={social}
            href='#'
            className='text-sm text-blue-300/80 hover:text-white transition-colors relative group'
          >
            {social}
            <span className='absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300'></span>
          </a>
        ))}
      </div>
    </motion.footer>
  );
}
