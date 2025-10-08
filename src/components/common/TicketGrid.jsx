import { Link } from 'react-router-dom';

const TicketGrid = ({ tickets }) => (
  <div className='container mx-auto p-4'>
    <div className='grid grid-cols-3 gap-x-5 gap-y-10'>
      {tickets.map((ticket) => (
        <Link
          to={`/ticket/${ticket.id}`}
          key={ticket.id}
          className='flex cursor-pointer flex-col items-center justify-center rounded p-4 transition-colors'
        >
          <img src={ticket.image} alt={ticket.name} className='mb-2 h-64 w-full rounded object-cover' />
          <div className='font-bold'>{ticket.name}</div>
          <div className='text-project-600 font-semibold'>From {ticket.price.toLocaleString()}đ</div>
        </Link>
      ))}
    </div>
  </div>
);

export default TicketGrid;
