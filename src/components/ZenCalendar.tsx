'use client';

import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

const LunarPhase = ({ date }: { date: Date }) => {
  const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const phase = phases[Math.floor(date.getDate() / 4) % 8];

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className='absolute -top-1 -right-1 text-xs bg-slate-800/50 rounded-full p-1'
    >
      {phase}
    </motion.span>
  );
};

interface ZenCalendarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function ZenCalendar({ value, onChange, onClose }: ZenCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [temporaryDate, setTemporaryDate] = useState<Date | null>(value ? new Date(value) : null);

  useEffect(() => {
    setTemporaryDate(value ? new Date(value) : null);
  }, [value]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleConfirm = () => {
    if (temporaryDate) {
      const isoDate = temporaryDate.toISOString().split('T')[0];
      onChange(isoDate);
    }
    onClose();
  };

  const previousMonth = () =>
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  return (
    <div className='p-4 md:p-6 backdrop-blur-lg bg-slate-800/30 rounded-2xl border border-slate-700/50 shadow-xl'>
      {/* Calendar Header */}
      <div className='flex items-center justify-between mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg md:rounded-xl'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={previousMonth}
          className='p-1 md:p-2 text-cyan-300 hover:text-cyan-400 rounded-lg'
        >
          <FiChevronLeft className='w-5 h-5' />
        </motion.button>

        <h2 className='text-lg md:text-xl font-semibold text-cyan-300'>
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={nextMonth}
          className='p-1 md:p-2 text-cyan-300 hover:text-cyan-400 rounded-lg'
        >
          <FiChevronRight className='w-5 h-5' />
        </motion.button>
      </div>

      {/* Calendar Grid */}
      <div className='grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4'>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className='text-center text-xs md:text-sm text-cyan-400/80 p-1 md:p-2'>
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1 md:gap-2 mb-4'>
        {daysInMonth.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected = temporaryDate && isSameDay(date, temporaryDate);
          const isToday = isSameDay(date, new Date());

          return (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`relative aspect-square p-1 md:p-2 rounded-lg md:rounded-xl text-center transition-all
                ${isSelected ? 'bg-cyan-500/30 text-cyan-300' : ''}
                ${isToday ? 'border border-cyan-400/50' : ''}
                ${isCurrentMonth ? 'text-cyan-200 hover:bg-slate-700/40' : 'text-slate-500'}
              `}
              onClick={() => setTemporaryDate(date)}
            >
              <div className='flex flex-col items-center justify-center h-full'>
                <span className={`text-xs md:text-sm ${isSelected ? 'font-bold' : ''}`}>
                  {format(date, 'd')}
                </span>
                <LunarPhase date={date} />
              </div>

              {/* Event Dots */}
              {Math.random() > 0.7 && (
                <div className='absolute bottom-0.5 md:bottom-1 left-1/2 -translate-x-1/2 flex space-x-1'>
                  <div className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400/80'></div>
                  {Math.random() > 0.5 && (
                    <div className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400/80'></div>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Calendar Footer */}
      <div className='flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-700/50 gap-3'>
        <div className='flex items-center justify-center space-x-4 text-cyan-300/80'>
          <div className='flex items-center'>
            <div className='w-2 h-2 rounded-full bg-cyan-400/80 mr-2'></div>
            <span className='text-xs md:text-sm'>Meditação</span>
          </div>
          <div className='flex items-center'>
            <div className='w-2 h-2 rounded-full bg-amber-400/80 mr-2'></div>
            <span className='text-xs md:text-sm'>Palestra</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleConfirm}
          className='px-4 py-2 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 rounded-lg flex items-center gap-2 transition-colors'
        >
          <FiCheck className='flex-shrink-0' />
          <span className='text-sm'>Confirmar Data</span>
        </motion.button>
      </div>
    </div>
  );
}
