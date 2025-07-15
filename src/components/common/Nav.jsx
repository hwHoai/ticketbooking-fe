import React, { useState } from 'react';

const Nav = ({ handleLogin, isAccountDropdownOpen, setIsAccountDropdownOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='bg-project-300 text-2xl text-white'>
      <div className='container mx-auto flex h-27 items-center justify-between'>
        <div className='flex items-center space-x-10'>
          {/* Logo */}
          <div className='font-bold'>Ticket Booking</div>

          <div className='hidden items-center space-x-0 lg:flex'>
            <a
              href='/'
              className='hover:bg-project-200 px-5 py-9 no-underline transition-all duration-200 hover:scale-110 hover:text-gray-900'
            >
              Home
            </a>
            <a
              href='/bus-tickets'
              className='hover:bg-project-200 px-5 py-9 no-underline transition-all duration-200 hover:scale-110 hover:text-gray-900'
            >
              Bus
            </a>
            <a
              href='/concert-tickets'
              className='hover:bg-project-200 px-5 py-9 no-underline transition-all duration-200 hover:scale-110 hover:text-gray-900'
            >
              Concert
            </a>
            <a
              href='/event-tickets'
              className='hover:bg-project-200 px-5 py-9 no-underline transition-all duration-200 hover:scale-110 hover:text-gray-900'
            >
              Event
            </a>
          </div>
        </div>

        <div className='hidden items-center space-x-2 lg:flex'>
          {/* Search Bar */}
          <div className='relative flex'>
            <input
              type='text'
              placeholder='Search'
              className='w-32 rounded-l-lg bg-white px-3 py-1 text-sm text-gray-700 placeholder-gray-500 outline-none xl:w-80'
            />
            <button className='bg-project-400 hover:bg-project-200 rounded-r-lg px-3 py-1 transition-colors outline-none'>
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

          {/* Account */}
          <div className='relative'>
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className='hover:bg-project-200 flex items-center space-x-1 px-5 py-9 no-underline transition-all duration-200 hover:scale-110 hover:text-gray-900'
            >
              <span className=''>Account</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>

            {isAccountDropdownOpen && (
              <>
                <div className='fixed inset-0 z-10' onClick={() => setIsAccountDropdownOpen(false)} />
                <div className='absolute right-4 z-20 mt-2 w-64 origin-top-right rounded-xl border border-gray-100 bg-white shadow-xl'>
                  <div className='py-1'>
                    <a
                      href='/my-profile'
                      className='group hover:text-project-300 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                    >
                      <svg
                        className='text-project-500 group-hover:text-project-300 mr-3 h-5 w-5'
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
                      <p className='font-medium'>My Profile</p>
                    </a>
                    <a
                      href='/my-bookings'
                      className='group hover:text-project-300 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                    >
                      <svg
                        className='group-hover:text-project-300 mr-3 h-5 w-5 text-gray-400'
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
                      <p className='font-medium'>My Bookings</p>
                    </a>
                    <button
                      onClick={handleLogin}
                      className='group hover:text-project-300 flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'
                    >
                      <svg
                        className='group-hover:text-project-300 mr-3 h-5 w-5 text-gray-400'
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
                      <p className='font-medium'>Sign In</p>
                    </button>
                    <a
                      href='/logout'
                      className='group hover:text-project-300 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                    >
                      <svg
                        className='group-hover:text-project-300 mr-3 h-5 w-5 text-gray-400'
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
                      <p className='font-medium'>Sign Out</p>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='hover:bg-project-200 flex items-center rounded px-3 py-2 text-white lg:hidden'
        >
          <svg className='h-12 w-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            {isMobileMenuOpen ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      {/* Menu */}
      <div
        className={`bg-project-200 fixed top-27 right-0 z-50 h-fit w-fit transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full overflow-y-auto px-10 py-5'>
          {/* Search Bar */}
          <div className='py-5'>
            <div className='flex'>
              <input
                type='text'
                placeholder='Search'
                className='text-project-500 placeholder-project-500 flex-1 rounded-l-lg bg-white px-3 py-2 text-sm outline-none'
              />
              <button className='bg-project-400 hover:bg-project-300 rounded-r-lg px-3 py-2 transition-colors'>
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
          {/* Navigation Links */}
          <div className='border-project-300 border-t pt-2'>
            <a href='/' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              Home
            </a>
            <a href='/bus-tickets' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              Bus
            </a>
            <a href='/concert-tickets' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              Concert
            </a>
            <a href='/event-tickets' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              Event
            </a>
          </div>

          {/* Account Links */}
          <div className='border-project-300 border-t pt-2'>
            <a href='/my-profile' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              My Profile
            </a>
            <a href='/my-bookings' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              My Bookings
            </a>
            <button
              onClick={handleLogin}
              className='hover:bg-project-300 block w-full rounded-md px-3 py-2 text-left text-white'
            >
              Sign In
            </button>
            <a href='/logout' className='hover:bg-project-300 block rounded-md px-3 py-2 text-white'>
              Sign Out
            </a>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='bg-opacity-50 fixed inset-0 z-40 lg:hidden' onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Nav;
