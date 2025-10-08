import PropTypes from 'prop-types';
import { tickets } from '../../../data/tickets';
import { useContext } from 'react';
import { ticketInfoContext } from '../../../components/provider/ticketInfoProvider';

const BookingCard = () => {
  const { ticketId, ticketType } = useContext(ticketInfoContext);
  console.log(ticketId, ticketType);
  const ticket = tickets.filter((t) => t.type === ticketType.split('_')[0]).find((t) => t.id === Number(ticketId));

  return (
    <div className='container mx-auto my-10 flex'>
      <div className='poster w-4xl'>
        <img
          src={ticket.image || ticket.poster || 'https://via.placeholder.com/400x300'}
          alt={ticket.name || 'Event Poster'}
          className='h-100 w-full rounded-lg bg-gray-300 object-cover shadow-2xs'
        />
        <button className='my-5 h-15 w-full rounded-lg bg-amber-400 py-3 text-lg font-bold text-white transition-colors hover:bg-amber-300'>
          BOOK NOW
        </button>
      </div>
      <div className='ticket-info flex flex-col justify-center p-10'>
        <div className='text-3xl font-bold'>{ticket.name}</div>
        {/* time, place */}
        {ticket.time && <div>{ticket.time}</div>}
        {!ticket.time && ticket.description && <div>{ticket.description}</div>}
      </div>
    </div>
  );
};

BookingCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    details: PropTypes.shape({
      title: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      poster: PropTypes.string,
      guests: PropTypes.string
    }).isRequired
  }).isRequired,
  isDetailPage: PropTypes.bool
};

export default BookingCard;
