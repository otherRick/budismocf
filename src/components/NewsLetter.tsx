import { FiSend } from 'react-icons/fi';

export default function NewLetter() {
  return (
    <div className='mt-6'>
      <h3 className='text-sm text-blue-300 mb-2'>Receba lembretes</h3>
      <div className='flex rounded-lg overflow-hidden'>
        <input
          type='email'
          placeholder='Seu email'
          className='flex-1 px-3 py-2 bg-gray-700/50 text-white placeholder-gray-400 text-sm focus:outline-none'
        />
        <button className='bg-amber-500 hover:bg-amber-600 text-white px-3 flex items-center justify-center transition-colors'>
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}
