import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // For single-page navigation
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <nav className='fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='#' onClick={() => handleNavClick('home')} className='flex items-center'>
              <span className='text-xl font-serif font-medium text-gray-800'>MindfulPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {['home', 'teachings', 'meditation', 'about'].map((item) => (
              <Link
                key={item}
                href='#'
                onClick={() => handleNavClick(item)}
                className={`px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            <button className='bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
              Join Session
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-gray-600 hover:text-amber-500 focus:outline-none'
            >
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {menuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className='md:hidden bg-white shadow-lg'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {['home', 'teachings', 'meditation', 'about'].map((item) => (
              <Link
                key={item}
                href='#'
                onClick={() => handleNavClick(item)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === item
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-500'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            <button className='w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-200'>
              Join Session
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
