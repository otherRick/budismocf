import { motion } from 'framer-motion';
import EnjoyBtn from '../buttons/EnjoyBtn';

export default function MobileHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex justify-between items-center mb-4 z-10'
    >
      <div>
        <h1 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500'>
          ZenRio
        </h1>
        <p className='text-xs text-blue-300/80'>Cabo Frio · RJ</p>
      </div>

      <EnjoyBtn />
    </motion.header>
  );
}
