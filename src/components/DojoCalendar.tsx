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

interface DojoCalendarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function DojoCalendar({ value, onChange, onClose }: DojoCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [temporaryDate, setTemporaryDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : new Date()
  );

  // Atualizar o valor selecionado quando o componente é montado
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  // Navegar para o mês anterior
  const previousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  // Navegar para o próximo mês
  const nextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  // Confirmar a seleção da data
  const confirmSelection = () => {
    if (temporaryDate) {
      setSelectedDate(temporaryDate);
      onChange(format(temporaryDate, 'yyyy-MM-dd'));
      onClose();
    }
  };

  // Gerar os dias do mês atual
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Verificar se uma data é hoje
  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  // Verificar se uma data está no mês atual
  const isCurrentMonth = (date: Date) => {
    return isSameMonth(date, currentDate);
  };

  // Verificar se uma data está selecionada
  const isSelected = (date: Date) => {
    if (temporaryDate) {
      return isSameDay(date, temporaryDate);
    }
    if (selectedDate) {
      return isSameDay(date, selectedDate);
    }
    return false;
  };

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
      <div className='grid grid-cols-7 gap-1 md:gap-2 mb-4 md:mb-6'>
        {/* Weekday Headers */}
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
          <div
            key={index}
            className='text-center text-xs md:text-sm font-medium text-cyan-400 p-1 md:p-2'
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {daysInMonth.map((date, index) => {
          const isSelectedDay = isSelected(date);
          const isTodayDay = isToday(date);
          const isCurrentMonthDay = isCurrentMonth(date);

          return (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`relative aspect-square p-1 md:p-2 rounded-lg md:rounded-xl text-center transition-all
                ${isSelectedDay ? 'bg-cyan-500/30 text-cyan-300' : ''}
                ${isTodayDay ? 'border border-cyan-400/50' : ''}
                ${isCurrentMonthDay ? 'text-cyan-200 hover:bg-slate-700/40' : 'text-slate-500'}
              `}
              onClick={() => setTemporaryDate(date)}
            >
              <div className='flex flex-col items-center justify-center h-full'>
                <span className={`text-xs md:text-sm ${isSelectedDay ? 'font-bold' : ''}`}>
                  {format(date, 'd')}
                </span>
                <LunarPhase date={date} />
              </div>
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
          whileTap={{ scale: 0.95 }}
          onClick={confirmSelection}
          className='px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg flex items-center transition-all'
          disabled={!temporaryDate}
        >
          <FiCheck className='mr-2' />
          <span>Confirmar</span>
        </motion.button>
      </div>
    </div>
  );
}
