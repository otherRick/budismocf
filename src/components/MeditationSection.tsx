import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MeditationSection() {
  return (
    <section className='relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
        <h2 className='text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4'>
          Guided Meditation
        </h2>
        <p className='text-lg text-gray-600 mb-12 max-w-2xl mx-auto'>
          Cultivate mindfulness with our simple yet powerful meditation timer.
        </p>

        <MeditationTimer />
      </div>
    </section>
  );
}

function MeditationTimer() {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [selectedDuration, setSelectedDuration] = useState(300);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const durations = [
    { value: 180, label: '3 min' },
    { value: 300, label: '5 min' },
    { value: 600, label: '10 min' },
    { value: 900, label: '15 min' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className='flex flex-col items-center'>
      {/* Hidden audio element for bell sound */}
      <audio ref={audioRef} src='/sounds/bell.mp3' preload='auto' />

      {/* Circular progress */}
      <div className='relative w-64 h-64 mb-8'>
        <svg className='w-full h-full' viewBox='0 0 100 100'>
          {/* Background circle */}
          <circle cx='50' cy='50' r='45' fill='none' stroke='#FEE2E2' strokeWidth='8' />
          {/* Progress circle */}
          <motion.circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#F59E0B'
            strokeWidth='8'
            strokeLinecap='round'
            initial={{ strokeDasharray: '283', strokeDashoffset: '283' }}
            animate={{
              strokeDashoffset: 283 - (283 * progress) / 100
            }}
            transition={{ duration: 1 }}
            transform='rotate(-90 50 50)'
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-4xl font-medium text-gray-800'>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Duration selector */}
      <div className='flex space-x-2 mb-8'>
        {durations.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              setDuration(item.value);
              setTimeLeft(item.value);
              setSelectedDuration(item.value);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedDuration === item.value
                ? 'bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className='flex space-x-4'>
        {!isActive ? (
          <button
            onClick={startTimer}
            className='bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-200 flex items-center'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-md text-lg font-medium transition-colors duration-200 flex items-center'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className='border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md text-lg font-medium transition-colors duration-200 flex items-center'
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}
