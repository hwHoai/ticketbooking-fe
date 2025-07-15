import React, { useState, useRef, useEffect, useMemo } from 'react';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const ampm = ['AM', 'PM'];

const CustomTimePicker = ({ value, onChange, placeholder = 'Pick a time' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedAMPM, setSelectedAMPM] = useState('AM');
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (selectedHour && selectedAMPM) {
          onChange?.(`${selectedHour.toString().padStart(2, '0')} ${selectedAMPM}`);
        }
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, selectedHour, selectedAMPM, onChange]);

  useEffect(() => {
    if (value && typeof value === 'string') {
      const [time, ampmVal] = value.split(' ');
      if (hours.includes(Number(time)) && ampm.includes(ampmVal)) {
        setSelectedHour(Number(time));
        setSelectedAMPM(ampmVal);
      }
    } else {
      setSelectedHour('');
      setSelectedAMPM('AM');
    }
  }, [value]);

  const displayValue = useMemo(
    () => (selectedHour ? `${selectedHour.toString().padStart(2, '0')} ${selectedAMPM}` : ''),
    [selectedHour, selectedAMPM]
  );

  return (
    <div className='relative w-full' ref={ref}>
      <div className='flex items-center'>
        <span className='pointer-events-none absolute left-3 text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mt-0.5 h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </span>
        <input
          onClick={() => setIsOpen((v) => !v)}
          value={displayValue}
          placeholder={placeholder}
          readOnly
          className='focus:ring-project-500 w-full rounded-md border border-gray-300 p-3 pl-10 text-left text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-1 focus:outline-none'
        />
      </div>
      {isOpen && (
        <div className='absolute left-1/2 z-50 mt-2 flex w-[200px] -translate-x-1/2 justify-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-7 shadow-lg'>
          {/* Hour */}
          <div className='flex-1'>
            <div className='flex max-h-[200px] flex-col gap-1 overflow-y-auto'>
              {hours.map((hour) => (
                <button
                  key={hour}
                  type='button'
                  className={`w-full rounded-md p-2 text-sm font-medium transition-all duration-300 ${
                    Number(selectedHour) === hour
                      ? 'bg-project-400 text-white'
                      : 'hover:bg-project-200 hover:text-project-500 text-gray-900'
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
          {/* AM/PM */}
          <div className='flex-1'>
            {ampm.map((ap) => (
              <button
                key={ap}
                type='button'
                className={`w-full rounded-md p-2 text-sm font-medium transition-all duration-300 ${
                  selectedAMPM === ap
                    ? 'bg-project-400 text-white'
                    : 'hover:bg-project-200 hover:text-project-500 text-gray-900'
                }`}
                onClick={() => setSelectedAMPM(ap)}
              >
                {ap}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
