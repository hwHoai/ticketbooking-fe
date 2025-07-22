import { useState, useEffect } from 'react';
import Select from 'react-select';
import CustomDatePicker from './CustomDatePicker';
import { locationOptions, typeOptions, timeOptions } from '../../constant/selectOptions';
import selectStyles from '../../constant/selectStyles';
import SearchTicket from './SearchTicket';

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState('bus');
  const [selectedValues, setSelectedValues] = useState({
    origin: null,
    destination: null,
    location: null,
    ticketType: ''
  });
  const [tripType, setTripType] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    if (!document.getElementById('search-form-animations')) {
      const style = document.createElement('style');
      style.id = 'search-form-animations';
      style.textContent = `
        @keyframes slideDown {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slideDown 0.4s ease-out; }
        @keyframes flipDown {
          0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
          100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
        }
        .animate-flip-down { animation: flipDown 0.5s ease-out; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tab: activeTab,
      origin: selectedValues.origin?.value || '',
      destination: selectedValues.destination?.value || '',
      location: selectedValues.location?.value || '',
      tripType: tripType ? tripType.value : '', // sửa: lấy value từ object
      startDate: startDate,
      returnDate: tripType && tripType.value === 'Round-trip' ? returnDate : null,
      startTime: startTime,
      ticketType: selectedValues.ticketType
    };
    console.log(formData);
  };

  return (
    <div className='search-form text-xs'>
      <div className='h-81 bg-gray-300'></div>
      <div className='container mx-auto -mt-26'>
        {/* Tabs */}
        <div className='mb-0'>
          <button
            onClick={() => setActiveTab('bus')}
            className={`rounded-2xl rounded-b-none px-4 py-2 ${activeTab === 'bus' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'}`}
          >
            Bus Tickets
          </button>
          <button
            onClick={() => setActiveTab('concert')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'concert' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'}`}
          >
            Concert Tickets
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${activeTab === 'event' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'}`}
          >
            Event Tickets
          </button>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className='animate-flip-down container flex flex-wrap justify-between gap-3 rounded-lg rounded-tl-none bg-gray-100 p-4 shadow-lg 2xl:flex-nowrap'
        >
          {/* Bus Tab */}
          {activeTab === 'bus' && (
            <>
              <div className='animate-slide-down w-full min-w-0 2xl:w-70'>
                <Select
                  options={locationOptions}
                  value={selectedValues.origin}
                  onChange={(option) => setSelectedValues((prev) => ({ ...prev, origin: option }))}
                  placeholder='Origin'
                  isClearable={false}
                  isSearchable
                  styles={selectStyles}
                />
              </div>
              <div className='animate-slide-down w-full min-w-0 2xl:w-70'>
                <Select
                  options={locationOptions}
                  value={selectedValues.destination}
                  onChange={(option) => setSelectedValues((prev) => ({ ...prev, destination: option }))}
                  placeholder='Destination'
                  isClearable={false}
                  isSearchable
                  styles={selectStyles}
                />
              </div>
              <div className='animate-slide-down w-full min-w-0 2xl:w-70'>
                <Select
                  options={typeOptions}
                  value={tripType}
                  onChange={setTripType}
                  placeholder='Type'
                  isClearable={false}
                  styles={selectStyles}
                />
              </div>
              <div className='animate-slide-down w-full min-w-0 2xl:w-74'>
                <CustomDatePicker
                  value={startDate ? new Date(startDate) : null}
                  onChange={(date) => setStartDate(date.toISOString().slice(0, 10))}
                  placeholder='Start Date'
                />
              </div>
              <div className='animate-slide-down w-full min-w-0 2xl:w-74'>
                {tripType && tripType.value === 'Round-trip' ? (
                  <CustomDatePicker
                    value={returnDate ? new Date(returnDate) : null}
                    onChange={(date) => setReturnDate(date.toISOString().slice(0, 10))}
                    placeholder='Return Date'
                  />
                ) : (
                  <div className='h-16 w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-center text-gray-300'>
                    ---
                  </div>
                )}
              </div>
            </>
          )}

          {/* Concert Tab */}
          {activeTab === 'concert' && (
            <SearchTicket
              locationOptions={locationOptions}
              selectedLocation={selectedValues.location}
              setSelectedLocation={(option) => setSelectedValues((prev) => ({ ...prev, location: option }))}
              startDate={startDate}
              setStartDate={setStartDate}
              timeOptions={timeOptions}
              startTime={startTime}
              setStartTime={setStartTime}
              selectStyles={selectStyles}
            />
          )}

          {/* Event Tab */}
          {activeTab === 'event' && (
            <SearchTicket
              locationOptions={locationOptions}
              selectedLocation={selectedValues.location}
              setSelectedLocation={(option) => setSelectedValues((prev) => ({ ...prev, location: option }))}
              startDate={startDate}
              setStartDate={setStartDate}
              timeOptions={timeOptions}
              startTime={startTime}
              setStartTime={setStartTime}
              selectStyles={selectStyles}
            />
          )}

          {/* Button */}
          <div className='w-full min-w-0 xl:w-full 2xl:w-auto'>
            <button
              type='submit'
              className='bg-project-400 hover:bg-project-300 w-full rounded-md px-6 py-3 text-white transition-colors'
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
