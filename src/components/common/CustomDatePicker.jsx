import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ChevronDown, Minus } from 'lucide-react';
import PropTypes from 'prop-types';

function CustomDatePicker({ value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative w-full' ref={ref}>
      <button
        type='button'
        className={`h-12 w-full rounded-md border border-gray-300 bg-gray-100 pr-3 pl-3 text-left text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${!isOpen ? 'hover:border-gray-400' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className='text-lg text-gray-500'>
          {value ? value.toLocaleDateString() : placeholder || 'Select date'}
        </span>
        <Minus
          className='pointer-events-none absolute top-52/100 right-10 h-25 w-15 -translate-y-1/2 rotate-90 text-gray-300'
          strokeWidth={1.2}
        />
        <ChevronDown
          className={`pointer-events-auto absolute top-1/2 right-5 h-8 w-8 -translate-y-1/2 cursor-pointer transition-colors ${isOpen ? 'text-gray-500' : 'text-gray-300'} hover:text-gray-600`}
          strokeWidth={3}
        />
      </button>
      {isOpen && (
        <div className='absolute left-0 z-50 mt-1 rounded-md border bg-white shadow-lg'>
          <DayPicker
            mode='single'
            selected={value}
            onSelect={(date) => {
              setIsOpen(false);
              onChange(date || null);
            }}
          />
        </div>
      )}
    </div>
  );
}

CustomDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default CustomDatePicker;
