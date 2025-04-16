export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-serif font-medium mb-4'>MindfulPath</h3>
            <p className='text-gray-400'>
              Bringing ancient wisdom to modern life through mindful practices.
            </p>
          </div>

          <div>
            <h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>Resources</h4>
            <ul className='space-y-2'>
              {['Guided Meditations', 'Articles', 'Podcasts', 'Books'].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-amber-400 transition-colors duration-200'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>Community</h4>
            <ul className='space-y-2'>
              {['Retreats', 'Discussion Forum', 'Local Groups', 'Teachers'].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-amber-400 transition-colors duration-200'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-sm font-semibold uppercase tracking-wider mb-4'>Connect</h4>
            <div className='flex space-x-4 mb-4'>
              {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <a
                  key={platform}
                  href='#'
                  className='text-gray-400 hover:text-amber-400 transition-colors duration-200'
                >
                  <span className='sr-only'>{platform}</span>
                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`}
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              ))}
            </div>
            <p className='text-gray-400 text-sm'>
              Subscribe to our newsletter for weekly insights and practices.
            </p>
            <div className='mt-2 flex'>
              <input
                type='email'
                placeholder='Your email'
                className='px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 w-full'
              />
              <button className='bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition-colors duration-200'>
                Join
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            &copy; {new Date().getFullYear()} MindfulPath. All rights reserved.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a
              href='#'
              className='text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200'
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
