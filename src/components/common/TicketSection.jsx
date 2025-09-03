import { Link, useNavigate } from 'react-router-dom';
import { busTickets, concertTickets, eventTickets } from '../../data/tickets';

const TicketSection = ({ title, link, linkText }) => {
  let tickets = [];
  const navigate = useNavigate();

  // Sort each ticket array by id in descending order and take the top 6
  const latestBusTickets = [...busTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  const latestConcertTickets = [...concertTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  const latestEventTickets = [...eventTickets].sort((a, b) => b.id - a.id).slice(0, 6);
  switch (title) {
    case 'BUS TICKETS':
      tickets = latestBusTickets;
      break;
    case 'CONCERT TICKETS':
      tickets = latestConcertTickets;
      break;
    case 'EVENT TICKETS':
      tickets = latestEventTickets;
      break;
    default:
      tickets = [];
      navigate('/*');
      break;
  }
  return (
    <div className='container mx-auto mt-8 p-4'>
      <div className='relative mb-4 flex items-center justify-end'>
        <h2 className='absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold'>{title}</h2>
        <a href={link} className='text-project-300 hover:underline'>
          {linkText}
        </a>
      </div>
      <div className='grid grid-cols-3 gap-x-5 gap-y-10'>
        {tickets.map((ticket) => (
          <Link
            to={`/ticket/${ticket.id}`}
            key={ticket.id}
            className='flex cursor-pointer flex-col items-center justify-center rounded p-4 transition-colors'
          >
            <img src={ticket.image} alt={ticket.name} className='mb-2 h-64 w-full rounded object-cover' />
            <div className='font-bold'>{ticket.name}</div>
            <div className='font-semibold text-amber-600'>From {ticket.price.toLocaleString()}đ</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TicketSection;
