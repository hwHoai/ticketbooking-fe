import { busTickets, concertTickets, eventTickets } from '../../data/tickets';
import TicketSection from './TicketSection';

const HomeTicketSection = () => {
  // Sort each ticket array by id in descending order and take the top 6
  const latestBusTickets = [...busTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  const latestConcertTickets = [...concertTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  const latestEventTickets = [...eventTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <>
      <TicketSection title='BUS TICKETS' link='/bus-tickets' linkText='View more' tickets={latestBusTickets} />
      <TicketSection
        title='CONCERT TICKETS'
        link='/concert-tickets'
        linkText='View more'
        tickets={latestConcertTickets}
      />
      <TicketSection title='EVENT TICKETS' link='/event-tickets' linkText='View more' tickets={latestEventTickets} />
    </>
  );
};

export default HomeTicketSection;
