import { Link } from 'react-router-dom';

const TicketSection = ({ title, link, linkText, tickets }) => (
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

export default TicketSection;
