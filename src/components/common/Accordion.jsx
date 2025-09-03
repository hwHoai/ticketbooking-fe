import { useContext, useState } from 'react';
import { ticketInfoContext } from '../provider/ticketInfoProvider';
import { tickets } from '../../data/tickets';
import { ChevronUp } from 'lucide-react';

const Accordion = () => {
  const { ticketId, ticketType } = useContext(ticketInfoContext);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const ticket = tickets.filter((t) => t.type === ticketType.split('_')[0]).find((t) => t.id === Number(ticketId));

  if (!ticketId || !ticketType) return null;

  return (
    <div className='space-y-5'>
      <div className='container mx-auto rounded bg-white shadow'>
        <button
          className='bg-project-100 flex w-full items-center justify-between rounded-t-sm pr-4 text-left text-lg font-bold focus:outline-none'
          onClick={() => setIsAboutOpen((prev) => !prev)}
        >
          <span className='p-4'>About</span>
          <ChevronUp className={`${isAboutOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
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
          <ChevronUp className={`${isOrganizerOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
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
          <ChevronUp className={`${isPolicyOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
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
