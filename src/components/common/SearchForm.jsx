import React, { useState } from 'react';

const SearchForm = () => {
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tab: activeTab,
      origin: e.target.origin?.value,
      destination: e.target.destination?.value,
      location: e.target.location?.value,
      tripType,
      startDate: e.target.startDate?.value,
      returnDate: tripType === 'round-trip' ? e.target.returnDate?.value : null,
      startTime: e.target.startTime?.value,
      ticketType: e.target.ticketType?.value
    };
    console.log(formData);
  };

  return (
    <div className='w-full py-8'>
      <div className='container mx-auto max-w-7xl bg-white px-4'>
        {/* Tab */}
        <div className='mb-0'>
          <button
            onClick={() => setActiveTab('bus')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${
              activeTab === 'bus' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            Bus Tickets
          </button>
          <button
            onClick={() => setActiveTab('concert')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${
              activeTab === 'concert' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            Concert Tickets
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${
              activeTab === 'event' ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            Event Tickets
          </button>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-end gap-4 rounded-lg rounded-tl-none border border-gray-300 bg-white px-3 py-4 shadow-md xl:flex-row'
        >
          {/* Bus Tab */}
          {activeTab === 'bus' && (
            <>
              {/* Place of Origin */}
              <div className='w-full min-w-0 xl:w-50'>
                <select
                  name='origin'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Origin
                  </option>
                  <option value='hanoi'>Hà Nội</option>
                  <option value='saigon'>Sài Gòn</option>
                  <option value='danang'>Đà Nẵng</option>
                </select>
              </div>

              {/* Destination */}
              <div className='w-full min-w-0 xl:w-50'>
                <select
                  name='destination'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Destination
                  </option>
                  <option value='hanoi'>Hà Nội</option>
                  <option value='saigon'>Sài Gòn</option>
                  <option value='danang'>Đà Nẵng</option>
                </select>
              </div>

              {/* Type */}
              <div className='w-full min-w-0 xl:w-50'>
                <select
                  value={tripType}
                  onChange={handleTripTypeChange}
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled>
                    Type
                  </option>
                  <option value='one-way'>One-way</option>
                  <option value='round-trip'>Round-trip</option>
                </select>
              </div>

              {/* Start Date */}
              <div className='w-full min-w-0 xl:w-58'>
                <input
                  type='date'
                  name='startDate'
                  placeholder='dd/mm/yyyy'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Return Date */}
              <div className='w-full min-w-0 xl:w-58'>
                {tripType === 'round-trip' ? (
                  <input
                    type='date'
                    name='returnDate'
                    placeholder='dd/mm/yyyy'
                    className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  />
                ) : (
                  <div className='w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-center text-gray-400'>
                    ---
                  </div>
                )}
              </div>
            </>
          )}

          {/* Concert Tab */}
          {activeTab === 'concert' && (
            <>
              {/* Location */}
              <div className='w-full min-w-0 xl:w-100'>
                <select
                  name='location'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Location
                  </option>
                  <option value='hanoi'>Hà Nội</option>
                  <option value='saigon'>Sài Gòn</option>
                  <option value='danang'>Đà Nẵng</option>
                </select>
              </div>

              {/* Date */}
              <div className='w-full min-w-0 xl:w-60'>
                <input
                  type='date'
                  name='startDate'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Start Time */}
              <div className='w-full min-w-0 xl:w-60'>
                <input
                  type='time'
                  name='startTime'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Ticket Type */}
              <div className='w-full min-w-0 xl:w-50'>
                <select
                  name='ticketType'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Type
                  </option>
                  <option value='regular'>Regular</option>
                  <option value='vip'>VIP</option>
                </select>
              </div>
            </>
          )}

          {/* Event Tab */}
          {activeTab === 'event' && (
            <>
              {/* Location */}
              <div className='w-full min-w-0 xl:w-100'>
                <select
                  name='location'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Location
                  </option>
                  <option value='hanoi'>Hà Nội</option>
                  <option value='saigon'>Sài Gòn</option>
                  <option value='danang'>Đà Nẵng</option>
                </select>
              </div>

              {/* Date */}
              <div className='w-full min-w-0 xl:w-60'>
                <input
                  type='date'
                  name='startDate'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Start Time */}
              <div className='w-full min-w-0 xl:w-60'>
                <input
                  type='time'
                  name='startTime'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Ticket Type */}
              <div className='w-full min-w-0 xl:w-50'>
                <select
                  name='ticketType'
                  className='w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='' disabled selected>
                    Type
                  </option>
                  <option value='regular'>Regular</option>
                  <option value='vip'>VIP</option>
                </select>
              </div>
            </>
          )}

          {/* Button */}
          <div className='w-full min-w-0 xl:w-auto'>
            <button
              type='submit'
              className='w-full rounded-md bg-blue-900 px-6 py-3 font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-700 xl:w-auto'
            >
              Find
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
