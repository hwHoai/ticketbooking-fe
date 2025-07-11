import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { logger } from '../../util/logger';
// import logo from '../../assets/landing-page/logo.png'; // Uncomment when you have the logo

export const HomePage = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loginWithRedirect } = useAuth0();

  logger.info('HomePage rendered', 'HomePage');

  // Dữ liệu mẫu cho carousel
  const carouselData = [
    {
      id: 1,
      title: 'Summer Travel Deal',
      image: '',
      description: 'Get 30% off on all summer destinations'
    },
    {
      id: 2,
      title: 'Concert Series 2024',
      image: '',
      description: 'Book early and save on popular concerts'
    },
    {
      id: 3,
      title: 'Weekend Express',
      image: '',
      description: 'Fast and comfortable weekend trips'
    },
    {
      id: 4,
      title: 'Event Highlights',
      image: '',
      description: "Don't miss these amazing events"
    },
    {
      id: 5,
      title: 'Night Journey',
      image: '',
      description: 'Comfortable night travel options'
    },
    {
      id: 6,
      title: 'Family Package',
      image: '',
      description: 'Special deals for family trips'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselData.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(carouselData.length / 2)) % Math.ceil(carouselData.length / 2));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className='text-black-900'>
      {/* Navigation */}
      <nav className='bg-teal-500 p-4 text-white'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='text-xl font-bold'>Ticket Booking</div>
          </div>

          <div className='relative flex'>
            <input
              type='text'
              placeholder='Search...'
              className='w-48 rounded-l-lg bg-white px-3 py-1 text-sm text-gray-700 placeholder-gray-500 outline-none md:w-64 lg:w-80 xl:w-96'
            />
            <button className='rounded-r-lg bg-blue-900 px-3 py-1 outline-none hover:bg-blue-500'>
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

          <div className='flex items-center space-x-4 lg:space-x-8'>
            <a href='/landing' className='hover:underline'>
              Home
            </a>
            <a href='/bus-tickets' className='hover:underline'>
              Bus
            </a>
            <a href='/concert-tickets' className='hover:underline'>
              Concert
            </a>
            <a href='/event-tickets' className='hover:underline'>
              Event
            </a>

            {/* Account Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className='flex items-center space-x-1 hover:underline'
              >
                <span>Account</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {isAccountDropdownOpen && (
                <div className='absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg'>
                  <a href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    Profile
                  </a>
                  <a href='/bookings' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    My Bookings
                  </a>
                  <button
                    onClick={handleLogin}
                    className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Login
                  </button>
                  <a href='/logout' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Form */}
      <div className='bg-white-200 w-full'>
        <div className='container mx-auto flex justify-center pt-8'>
          <div className='relative'>
            {/* Tab buttons */}
            <div className='mb-0 flex space-x-4'>
              <button
                onClick={() => setActiveTab('bus')}
                className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'bus' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Bus Tickets
              </button>
              <button
                onClick={() => setActiveTab('concert')}
                className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'concert' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Concert Tickets
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'event' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Event Tickets
              </button>
            </div>

            {/* Form tìm kiếm */}
            <div className='min-w-full rounded-lg rounded-tl-none border-1 border-gray-200 bg-white px-3 py-2'>
              <div className='flex flex-col flex-wrap items-end gap-1 sm:flex-row'>
                {activeTab === 'bus' && (
                  <>
                    <div className='relative w-50'>
                      <select
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                        className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-1 focus:ring-gray-200 focus:outline-none'
                      >
                        <option value='' disabled selected>
                          Type
                        </option>
                        <option value='one-way'>One Way</option>
                        <option value='round-trip'>Round Trip</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>

                    <div className='relative w-70'>
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-1 focus:ring-gray-200 focus:outline-none'>
                        <option value='' disabled selected>
                          Place of origin
                        </option>
                        <option value='hanoi'>Hanoi</option>
                        <option value='hcm'>Ho Chi Minh City</option>
                        <option value='danang'>Da Nang</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>

                    <div className='relative w-70'>
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-1 focus:ring-gray-200 focus:outline-none'>
                        <option value='' disabled selected>
                          Destination
                        </option>
                        <option value='hanoi'>Hanoi</option>
                        <option value='hcm'>Ho Chi Minh City</option>
                        <option value='danang'>Da Nang</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                        className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-1 focus:ring-gray-200 focus:outline-none'
                        defaultValue='2025-07-11'
                        placeholder='Departure Date'
                      />
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none'
                          defaultValue='2025-07-18'
                          placeholder='Return Date'
                        />
                      ) : (
                        <div className='flex w-full items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500'>
                          ---
                        </div>
                      )}
                      <svg
                        className={`pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform ${
                          tripType === 'round-trip' ? 'text-gray-400' : 'text-gray-300'
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
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'>
                        <option value='' disabled selected>
                          Location
                        </option>
                        <option value='hanoi'>Hanoi</option>
                        <option value='hcm'>Ho Chi Minh City</option>
                        <option value='danang'>Da Nang</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                        className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'
                        defaultValue='2025-07-11'
                        placeholder='Date'
                      />
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                        className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'
                        defaultValue='19:00'
                        placeholder='Start time'
                      />
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'>
                        <option value='' disabled selected>
                          Type
                        </option>
                        <option value='regular'>Regular</option>
                        <option value='vip'>VIP</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'>
                        <option value='' disabled selected>
                          Location
                        </option>
                        <option value='hanoi'>Hanoi</option>
                        <option value='hcm'>Ho Chi Minh City</option>
                        <option value='danang'>Da Nang</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                        className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'
                        defaultValue='2025-07-11'
                        placeholder='Date'
                      />
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                        className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'
                        defaultValue='19:00'
                        placeholder='Start time'
                      />
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
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
                      <select className='w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none'>
                        <option value='' disabled selected>
                          Type
                        </option>
                        <option value='regular'>Regular</option>
                        <option value='vip'>VIP</option>
                      </select>
                      <svg
                        className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  </>
                )}

                <button className='rounded-lg bg-blue-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600'>
                  Find Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='pb-8'></div>
      </div>

      {/* What's New Carousel */}
      <div className='container mx-auto mt-8 p-4'>
        <h2 className='mb-6 text-center text-2xl font-bold'>WHAT'S NEW</h2>

        <div className='relative'>
          {/* Carousel Container */}
          <div className='overflow-hidden rounded-lg'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(carouselData.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className='flex w-full flex-shrink-0 gap-4'>
                  {carouselData.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                    <div key={item.id} className='w-1/2 overflow-hidden rounded-lg bg-white'>
                      <img src={item.image} alt={item.title} className='h-48 w-full object-cover' />
                      <div className='p-4'>
                        <h3 className='mb-2 text-lg font-semibold'>{item.title}</h3>
                        <p className='text-sm text-gray-600'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all'
          >
            <svg className='h-5 w-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all'
          >
            <svg className='h-5 w-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className='mt-4 flex justify-center space-x-2'>
            {Array.from({ length: Math.ceil(carouselData.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bus Tickets Section */}
      <div className='container mx-auto mt-8 p-4'>
        <div className='relative mb-4 flex items-center justify-end'>
          <h2 className='absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold'>BUS TICKETS</h2>
          <a href='/bus-tickets' className='text-teal-500 hover:underline'>
            View more
          </a>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='flex aspect-[4/3] items-center justify-center bg-gray-100'>
              {/* Placeholder for Bus Tickets */}
            </div>
          ))}
        </div>
      </div>

      {/* Concert Tickets Section */}
      <div className='container mx-auto mt-8 p-4'>
        <div className='relative mb-4 flex items-center justify-end'>
          <h2 className='absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold'>CONCERT TICKETS</h2>
          <a href='/concert-tickets' className='text-teal-500 hover:underline'>
            View more
          </a>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='flex aspect-[4/3] items-center justify-center bg-gray-100'>
              {/* Placeholder for Concert Tickets */}
            </div>
          ))}
        </div>
      </div>

      {/* Event Tickets Section */}
      <div className='container mx-auto mt-8 p-4'>
        <div className='relative mb-4 flex items-center justify-end'>
          <h2 className='absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold'>EVENT TICKETS</h2>
          <a href='/event-tickets' className='text-teal-500 hover:underline'>
            View more
          </a>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='flex aspect-[4/3] items-center justify-center bg-gray-100'>
              {/* Placeholder for Event Tickets */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
