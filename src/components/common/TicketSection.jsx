import React from 'react';

const TicketSection = () => {
  return (
    <>
      {/* Bus Tickets */}
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

      {/* Concert Tickets */}
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

      {/* Event Tickets */}
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
    </>
  );
};

export default TicketSection;
