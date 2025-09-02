import { useState } from 'react';

const ChevronIcon = ({ open, color = '#000000' }) => (
  <svg
    width={20}
    height={20}
    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path d='M6 9l6 6 6-6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const Accordion = ({ ticket }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  if (!ticket) return null;

  return (
    <div className='space-y-5'>
      <div className='container mx-auto rounded bg-white shadow'>
        <button
          className='bg-project-100 flex w-full items-center justify-between rounded-t-sm pr-4 text-left text-lg font-bold focus:outline-none'
          onClick={() => setIsAboutOpen((prev) => !prev)}
        >
          <span className='p-4'>About</span>
          <ChevronIcon open={isAboutOpen} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isAboutOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='rounded-b-sm p-4 pt-2 text-gray-700'>{ticket.about}</div>
        </div>
      </div>
      {/* Organizer */}
      <div className='container mx-auto rounded bg-white shadow'>
        <button
          className='bg-project-100 flex w-full items-center justify-between rounded-t-sm pr-4 text-left text-lg font-bold focus:outline-none'
          onClick={() => setIsOrganizerOpen((prev) => !prev)}
        >
          <span className='p-4'>Organizer</span>
          <ChevronIcon open={isOrganizerOpen} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOrganizerOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='p-4 pt-2 text-gray-700'>{ticket.organizer}</div>
        </div>
      </div>
      {/* Policy */}
      <div className='container mx-auto rounded bg-white shadow'>
        <button
          className='bg-project-100 flex w-full items-center justify-between rounded-t-sm pr-4 text-left text-lg font-bold focus:outline-none'
          onClick={() => setIsPolicyOpen((prev) => !prev)}
        >
          <span className='p-4'>Policy</span>
          <ChevronIcon open={isPolicyOpen} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isPolicyOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='p-4 pt-2 text-gray-700'>{ticket.policy}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
