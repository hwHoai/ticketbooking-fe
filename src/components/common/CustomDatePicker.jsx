import React, { useState, useRef, useEffect } from 'react';

const daysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysArray(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const arr = [];
  for (let i = 0; i < firstDay; i++) arr.push(null);
  for (let i = 1; i <= daysInMonth; i++) arr.push(i);
  return arr;
}

const CustomDatePicker = ({ value, onChange, placeholder = 'Pick a date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selected, setSelected] = useState(value ? new Date(value) : null);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const days = getDaysArray(current.year, current.month);

  const handleSelect = (day) => {
    if (!day) return;
    const d = new Date(current.year, current.month, day);
    setSelected(d);
    onChange && onChange(d);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrent({ year: today.getFullYear(), month: today.getMonth() });
    setSelected(today);
    onChange && onChange(today);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
    onChange && onChange(null);
    setIsOpen(false);
  };

  return (
    <div className='relative w-full' ref={ref}>
      <div className='flex items-center'>
        <span className='pointer-events-none absolute left-3 text-gray-500'>
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
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </span>
        <input
          onClick={() => setIsOpen((v) => !v)}
          value={selected ? selected.toLocaleDateString() : ''}
          placeholder={placeholder}
          readOnly
          className='focus:ring-project-500 hover:border-project-400 w-full rounded-md border border-gray-300 p-3 pl-10 text-left text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-1 focus:outline-none'
        />
      </div>
      {isOpen && (
        <div className='absolute left-1/2 z-50 mt-2 w-[240px] -translate-x-1/2 rounded-2xl border border-gray-300 bg-white px-4 py-7'>
          <div className='text-project-500 flex w-full items-center justify-between rounded-xl border border-gray-300 py-0.5'>
            <button
              className='hover:bg-project-200 hover:text-project-500 rounded-lg p-2 text-gray-900'
              aria-label='Previous month'
              tabIndex={0}
              onClick={() =>
                setCurrent((c) => {
                  const d = new Date(c.year, c.month - 1, 1);
                  return { year: d.getFullYear(), month: d.getMonth() };
                })
              }
              type='button'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M10.0002 11.9999L6 7.99978L10.0025 3.99725'
                  stroke='currentcolor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <span className='font-semibold'>
              {new Date(current.year, current.month).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              className='text-project-500 rounded-lg p-2'
              aria-label='Next month'
              tabIndex={0}
              onClick={() =>
                setCurrent((c) => {
                  const d = new Date(c.year, c.month + 1, 1);
                  return { year: d.getFullYear(), month: d.getMonth() };
                })
              }
              type='button'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M6.00236 3.99707L10.0025 7.99723L6 11.9998'
                  stroke='currentcolor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <table className='mx-auto'>
            <thead>
              <tr className='flex gap-2'>
                {daysShort.map((d) => (
                  <td key={d} className='flex h-10 w-10 items-center justify-center'>
                    <span className='flex h-full w-full items-center justify-center rounded-full text-sm font-medium text-gray-900'>
                      {d}
                    </span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIdx) => (
                <tr className='flex gap-2' key={rowIdx}>
                  {days.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => {
                    const isSelected =
                      day &&
                      selected &&
                      selected.getDate() === day &&
                      selected.getMonth() === current.month &&
                      selected.getFullYear() === current.year;
                    return (
                      <td key={colIdx} className='flex h-10 w-10 items-center justify-center'>
                        {day ? (
                          <button
                            type='button'
                            tabIndex={0}
                            className={`flex h-full w-full items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                              isSelected
                                ? 'bg-project-400 text-white'
                                : 'hover:bg-project-200 hover:text-project-500 text-gray-900'
                            }`}
                            onClick={() => handleSelect(day)}
                          >
                            {day}
                          </button>
                        ) : (
                          <span />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-4 flex justify-between gap-2'>
            <button
              type='button'
              className='bg-project-100 text-project-600 hover:bg-project-200 flex-1 rounded-lg px-3 py-2 text-sm font-medium transition'
              onClick={handleToday}
            >
              Today
            </button>
            <button
              type='button'
              className='flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200'
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
