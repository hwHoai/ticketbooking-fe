import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { logger } from '../../util/logger';

const SearchForm = () => {
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');

  return (
    <div className='w-full bg-white py-15'>
      <div className='container mx-auto flex justify-center'>
        <div className='relative'>
          <div className='mb-0 flex space-x-0 bg-white'>
            <button
              onClick={() => setActiveTab('bus')}
              className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'bus' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              Bus Tickets
            </button>
            <button
              onClick={() => setActiveTab('concert')}
              className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'concert' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              Concert Tickets
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'event' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              Event Tickets
            </button>
          </div>
          <div className='border-secondary-300 min-w-full rounded-lg rounded-tl-none border bg-white px-3 py-2'>
            <div className='flex flex-col flex-wrap items-end gap-1 sm:flex-row'>
              {activeTab === 'bus' && (
                <>
                  <div className='relative w-50'>
                    <select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                    >
                      <option value='' disabled selected>
                        Type
                      </option>
                      <option value='one-way'>One Way</option>
                      <option value='round-trip'>Round Trip</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  <div className='relative w-70'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Place of origin
                      </option>
                      <option value='hanoi'>Hanoi</option>
                      <option value='hcm'>Ho Chi Minh City</option>
                      <option value='danang'>Da Nang</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  <div className='relative w-70'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Destination
                      </option>
                      <option value='hanoi'>Hanoi</option>
                      <option value='hcm'>Ho Chi Minh City</option>
                      <option value='danang'>Da Nang</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  <div className='relative w-60'>
                    <input
                      type='date'
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                      defaultValue='2025-07-11'
                      placeholder='Departure Date'
                    />
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div className='relative w-60'>
                    {tripType === 'round-trip' ? (
                      <input
                        type='date'
                        className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                        defaultValue='2025-07-18'
                        placeholder='Return Date'
                      />
                    ) : (
                      <div className='border-secondary-300 text-secondary-400 flex w-full items-center rounded-lg border bg-white px-4 py-3 text-sm'>
                        ---
                      </div>
                    )}
                    <svg
                      className={`pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform ${
                        tripType === 'round-trip' ? 'text-secondary-300' : 'text-secondary-400'
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                </>
              )}
              {activeTab === 'concert' && (
                <>
                  <div className='relative w-101'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Location
                      </option>
                      <option value='hanoi'>Hanoi</option>
                      <option value='hcm'>Ho Chi Minh City</option>
                      <option value='danang'>Da Nang</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  <div className='relative w-80'>
                    <input
                      type='date'
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                      defaultValue='2025-07-11'
                      placeholder='Date'
                    />
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div className='relative w-80'>
                    <input
                      type='time'
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                      defaultValue='19:00'
                      placeholder='Start time'
                    />
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div className='relative w-50'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Type
                      </option>
                      <option value='regular'>Regular</option>
                      <option value='vip'>VIP</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </>
              )}
              {activeTab === 'event' && (
                <>
                  <div className='relative w-101'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Location
                      </option>
                      <option value='hanoi'>Hanoi</option>
                      <option value='hcm'>Ho Chi Minh City</option>
                      <option value='danang'>Da Nang</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                  <div className='relative w-80'>
                    <input
                      type='date'
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                      defaultValue='2025-07-11'
                      placeholder='Date'
                    />
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div className='relative w-80'>
                    <input
                      type='time'
                      className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'
                      defaultValue='19:00'
                      placeholder='Start time'
                    />
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div className='relative w-50'>
                    <select className='border-secondary-300 focus:ring-secondary-200 w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 py-3 text-sm text-black focus:border-transparent focus:ring-1 focus:outline-none'>
                      <option value='' disabled selected>
                        Type
                      </option>
                      <option value='regular'>Regular</option>
                      <option value='vip'>VIP</option>
                    </select>
                    <svg
                      className='text-secondary-300 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </>
              )}
              <button className='rounded-lg border border-transparent bg-blue-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-100 hover:bg-blue-600'>
                Find Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
