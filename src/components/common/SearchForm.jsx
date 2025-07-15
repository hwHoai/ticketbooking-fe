import React, { useState, useRef, useEffect } from 'react';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';

const SearchForm = () => {
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');
  const [selectedValues, setSelectedValues] = useState({
    origin: '',
    destination: '',
    type: '',
    location: '',
    ticketType: ''
  });

  const [startDate, setStartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [startTime, setStartTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tab: activeTab,
      origin: selectedValues.origin,
      destination: selectedValues.destination,
      location: selectedValues.location,
      tripType: selectedValues.type,
      startDate: startDate,
      returnDate: selectedValues.type === 'Round-trip' ? returnDate : null,
      startTime: e.target.startTime?.value,
      ticketType: selectedValues.ticketType,
      startTime: startTime
    };
    console.log(formData);
  };

  const CustomDropdown = ({ options, placeholder, name, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelect = (option) => {
      setSelectedValues((prev) => ({ ...prev, [name]: option }));
      if (name === 'type') {
        setTripType(option === 'Round-trip' ? 'round-trip' : 'one-way');
      }
      setIsOpen(false);
      setSearchTerm('');
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className='relative w-full' ref={dropdownRef}>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='focus:ring-project-500 hover:border-project-400 flex w-full items-center justify-between rounded-md border border-gray-300 p-3 text-left transition-all duration-300 focus:border-transparent focus:ring-1'
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>{value || placeholder}</span>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        {isOpen && (
          <div className='absolute z-50 mt-1 max-h-60 w-56 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg'>
            {name !== 'type' && name !== 'ticketType' && (
              <input
                className='h-8 w-full border-b border-gray-300 px-3 text-sm focus:bg-gray-50 focus:outline-none'
                type='search'
                placeholder='Search…'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            {(name === 'type' ? options : filteredOptions).map((option, index) => (
              <button
                key={index}
                type='button'
                onClick={() => handleSelect(option)}
                className='h-8 w-full px-3 text-left text-sm transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              >
                {option}
              </button>
            ))}
            {name !== 'type' && filteredOptions.length === 0 && (
              <div className='flex h-8 w-full items-center px-3 text-sm text-gray-500'>No results found</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='w-full'>
      <div className='h-81 bg-gray-300'>
        <div></div>
      </div>
      <div className='container mx-auto -mt-26 max-w-7xl px-2'>
        {/* Tab */}
        <div className='mb-0'>
          <button
            onClick={() => setActiveTab('bus')}
            className={`rounded-2xl rounded-b-none px-4 py-2 ${
              activeTab === 'bus' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'
            }`}
          >
            Bus Tickets
          </button>
          <button
            onClick={() => setActiveTab('concert')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${
              activeTab === 'concert' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'
            }`}
          >
            Concert Tickets
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`rounded-2xl rounded-b-none px-4 py-2 transition ${
              activeTab === 'event' ? 'bg-project-600 text-white' : 'bg-project-200 hover:bg-project-100'
            }`}
          >
            Event Tickets
          </button>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className='animate-flip-down flex transform flex-col items-end gap-4 rounded-lg rounded-tl-none bg-white px-3 py-4 shadow-md transition-all duration-500 ease-out xl:flex-row'
        >
          {/* Bus Tab */}
          {activeTab === 'bus' && (
            <>
              {/* Place of Origin */}
              <div className='animate-slide-down w-full min-w-0 xl:w-50'>
                <CustomDropdown
                  placeholder='Origin'
                  options={[
                    'TP Hà Nội',
                    'TP Huế',
                    'Quảng Ninh',
                    'Cao Bằng',
                    'Lạng Sơn',
                    'Lai Châu',
                    'Điện Biên',
                    'Sơn La',
                    'Thanh Hóa',
                    'Nghệ An',
                    'Hà Tĩnh',
                    'Tuyên Quang',
                    'Lào Cai',
                    'Thái Nguyên',
                    'Phú Thọ',
                    'Bắc Ninh',
                    'Hưng Yên',
                    'TP Hải Phòng',
                    'Ninh Bình',
                    'Quảng Trị',
                    'TP Đà Nẵng',
                    'Quảng Ngãi',
                    'Gia Lai',
                    'Khánh Hòa',
                    'Lâm Đồng',
                    'Đắk Lắk',
                    'TPHCM',
                    'Đồng Nai',
                    'Tây Ninh',
                    'TP Cần Thơ',
                    'Vĩnh Long',
                    'Đồng Tháp',
                    'Cà Mau',
                    'An Giang'
                  ]}
                  name='origin'
                  value={selectedValues.origin}
                />
              </div>

              {/* Destination */}
              <div className='animate-slide-down w-full min-w-0 xl:w-50'>
                <CustomDropdown
                  placeholder='Destination'
                  options={[
                    'TP Hà Nội',
                    'TP Huế',
                    'Quảng Ninh',
                    'Cao Bằng',
                    'Lạng Sơn',
                    'Lai Châu',
                    'Điện Biên',
                    'Sơn La',
                    'Thanh Hóa',
                    'Nghệ An',
                    'Hà Tĩnh',
                    'Tuyên Quang',
                    'Lào Cai',
                    'Thái Nguyên',
                    'Phú Thọ',
                    'Bắc Ninh',
                    'Hưng Yên',
                    'TP Hải Phòng',
                    'Ninh Bình',
                    'Quảng Trị',
                    'TP Đà Nẵng',
                    'Quảng Ngãi',
                    'Gia Lai',
                    'Khánh Hòa',
                    'Lâm Đồng',
                    'Đắk Lắk',
                    'TPHCM',
                    'Đồng Nai',
                    'Tây Ninh',
                    'TP Cần Thơ',
                    'Vĩnh Long',
                    'Đồng Tháp',
                    'Cà Mau',
                    'An Giang'
                  ]}
                  name='destination'
                  value={selectedValues.destination}
                />
              </div>

              {/* Type */}
              <div className='animate-slide-down w-full min-w-0 xl:w-50'>
                <CustomDropdown
                  placeholder='Type'
                  options={['One-way', 'Round-trip']}
                  name='type'
                  value={selectedValues.type}
                />
              </div>

              {/* Start Date */}
              <div className='animate-slide-down w-full min-w-0 xl:w-58'>
                <CustomDatePicker value={startDate} onChange={setStartDate} placeholder='Start Date' />
              </div>

              {/* Return Date */}
              <div className='animate-slide-down w-full min-w-0 xl:w-58'>
                {selectedValues.type === 'Round-trip' ? (
                  <CustomDatePicker value={returnDate} onChange={setReturnDate} placeholder='Return Date' />
                ) : (
                  <div className='w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-center text-gray-500'>
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
              <div className='animate-slide-down w-full min-w-0 xl:w-100'>
                <CustomDropdown
                  placeholder='Location'
                  options={[
                    'TP Hà Nội',
                    'TP Huế',
                    'Quảng Ninh',
                    'Cao Bằng',
                    'Lạng Sơn',
                    'Lai Châu',
                    'Điện Biên',
                    'Sơn La',
                    'Thanh Hóa',
                    'Nghệ An',
                    'Hà Tĩnh',
                    'Tuyên Quang',
                    'Lào Cai',
                    'Thái Nguyên',
                    'Phú Thọ',
                    'Bắc Ninh',
                    'Hưng Yên',
                    'TP Hải Phòng',
                    'Ninh Bình',
                    'Quảng Trị',
                    'TP Đà Nẵng',
                    'Quảng Ngãi',
                    'Gia Lai',
                    'Khánh Hòa',
                    'Lâm Đồng',
                    'Đắk Lắk',
                    'TPHCM',
                    'Đồng Nai',
                    'Tây Ninh',
                    'TP Cần Thơ',
                    'Vĩnh Long',
                    'Đồng Tháp',
                    'Cà Mau',
                    'An Giang'
                  ]}
                  name='location'
                  value={selectedValues.location}
                />
              </div>

              {/* Date */}
              <div className='animate-slide-down w-full min-w-0 xl:w-60'>
                <CustomDatePicker value={startDate} onChange={setStartDate} placeholder='Date' />
              </div>

              {/* Start Time */}
              <div className='animate-slide-down w-full min-w-0 xl:w-60'>
                <CustomTimePicker value={startTime} onChange={setStartTime} placeholder='Time' />
              </div>

              {/* Ticket Type */}
              <div className='animate-slide-down w-full min-w-0 xl:w-50'>
                <CustomDropdown
                  placeholder='Type'
                  options={['Regular', 'VIP']}
                  name='ticketType'
                  value={selectedValues.ticketType}
                />
              </div>
            </>
          )}

          {/* Event Tab */}
          {activeTab === 'event' && (
            <>
              {/* Location */}
              <div className='animate-slide-down w-full min-w-0 xl:w-100'>
                <CustomDropdown
                  placeholder='Location'
                  options={[
                    'TP Hà Nội',
                    'TP Huế',
                    'Quảng Ninh',
                    'Cao Bằng',
                    'Lạng Sơn',
                    'Lai Châu',
                    'Điện Biên',
                    'Sơn La',
                    'Thanh Hóa',
                    'Nghệ An',
                    'Hà Tĩnh',
                    'Tuyên Quang',
                    'Lào Cai',
                    'Thái Nguyên',
                    'Phú Thọ',
                    'Bắc Ninh',
                    'Hưng Yên',
                    'TP Hải Phòng',
                    'Ninh Bình',
                    'Quảng Trị',
                    'TP Đà Nẵng',
                    'Quảng Ngãi',
                    'Gia Lai',
                    'Khánh Hòa',
                    'Lâm Đồng',
                    'Đắk Lắk',
                    'TPHCM',
                    'Đồng Nai',
                    'Tây Ninh',
                    'TP Cần Thơ',
                    'Vĩnh Long',
                    'Đồng Tháp',
                    'Cà Mau',
                    'An Giang'
                  ]}
                  name='location'
                  value={selectedValues.location}
                />
              </div>

              {/* Date */}
              <div className='animate-slide-down w-full min-w-0 xl:w-60'>
                <CustomDatePicker value={startDate} onChange={setStartDate} placeholder='Date' />
              </div>

              {/* Start Time */}
              <div className='animate-slide-down w-full min-w-0 xl:w-60'>
                <CustomTimePicker value={startTime} onChange={setStartTime} placeholder='Time' />
              </div>

              {/* Ticket Type */}
              <div className='animate-slide-down w-full min-w-0 xl:w-50'>
                <CustomDropdown
                  placeholder='Type'
                  options={['Regular', 'VIP']}
                  name='ticketType'
                  value={selectedValues.ticketType}
                />
              </div>
            </>
          )}

          {/* Button */}
          <div className='w-full min-w-0 xl:w-auto'>
            <button
              type='submit'
              className='bg-project-400 hover:bg-project-300 w-full rounded-md px-6 py-3 font-medium whitespace-nowrap text-white transition-colors xl:w-auto'
            >
              Find
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      0% {
        transform: translateY(-10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .animate-slide-down {
      animation: slideDown 0.4s ease-out;
    }
  `;
  document.head.appendChild(style);
}

export default SearchForm;
