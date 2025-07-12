import React from 'react';

const Nav = ({ handleLogin, isAccountDropdownOpen, setIsAccountDropdownOpen }) => {
  return (
    <nav className='bg-teal-500 text-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='pr-10 text-xl font-bold'>Ticket Booking</div>
          <div className='flex items-center space-x-0'>
            <a href='/' className='px-5 py-4 no-underline transition-colors hover:bg-teal-400'>
              Home
            </a>
            <a href='/bus-tickets' className='px-5 py-4 no-underline transition-colors hover:bg-teal-400'>
              Bus
            </a>
            <a href='/concert-tickets' className='px-5 py-4 no-underline transition-colors hover:bg-teal-400'>
              Concert
            </a>
            <a href='/event-tickets' className='px-5 py-4 no-underline transition-colors hover:bg-teal-400'>
              Event
            </a>

            {/* Account Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className='flex items-center space-x-0 px-5 py-4 transition-all transition-colors duration-200 hover:bg-teal-400'
              >
                <span className='font-medium'>Account</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isAccountDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div className='fixed inset-0 z-10' onClick={() => setIsAccountDropdownOpen(false)} />

                  {/* Dropdown Content */}
                  <div className='absolute right-0 z-20 mt-6 w-64 origin-top-right rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-200'>
                    {/* Menu Items */}
                    <div className='py-1'>
                      <a
                        href='/my-profile'
                        className='group flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-teal-500'
                      >
                        <svg
                          className='mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-teal-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                          />
                        </svg>
                        <div>
                          <p className='font-medium'>My Profile</p>
                        </div>
                      </a>

                      <a
                        href='/my-bookings'
                        className='group flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-teal-500'
                      >
                        <svg
                          className='mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-teal-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                          />
                        </svg>
                        <div>
                          <p className='font-medium'>My Bookings</p>
                        </div>
                      </a>

                      <button
                        onClick={handleLogin}
                        className='group flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-teal-500'
                      >
                        <svg
                          className='mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-teal-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                          />
                        </svg>
                        <div>
                          <p className='font-medium'>Sign In</p>
                        </div>
                      </button>

                      <a
                        href='/logout'
                        className='group flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-teal-500'
                      >
                        <svg
                          className='mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-teal-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                        <div>
                          <p className='font-medium'>Sign Out</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='relative flex'>
          <input
            type='text'
            placeholder='Search'
            className='w-48 rounded-l-lg bg-white px-3 py-1 text-sm text-gray-700 placeholder-gray-500 outline-none md:w-64 lg:w-80 xl:w-96'
          />
          <button className='rounded-r-lg bg-blue-900 px-3 py-1 transition-colors outline-none hover:bg-blue-600'>
            <svg className='h-4 w-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
