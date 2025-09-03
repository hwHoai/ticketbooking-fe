import { busTickets, concertTickets, eventTickets } from '../../data/tickets';
import TicketSection from './TicketSection';

const RecommendedTicket = () => {
  return (
    <>
      <TicketSection title='BUS TICKETS' link='/bus-tickets' linkText='View more' tickets={busTickets} />
      <TicketSection title='CONCERT TICKETS' link='/concert-tickets' linkText='View more' tickets={concertTickets} />
      <TicketSection title='EVENT TICKETS' link='/event-tickets' linkText='View more' tickets={eventTickets} />
    </>
  );
};

export default RecommendedTicket;
