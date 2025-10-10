import { busTickets, concertTickets, eventTickets } from '../../../data/tickets';
import TicketGrid from '../../../components/common/TicketGrid';

const HomeTicketSection = () => {
  const latestBusTickets = [...busTickets].sort((a, b) => b.id - a.id).slice(0, 6);
  const latestConcertTickets = [...concertTickets].sort((a, b) => b.id - a.id).slice(0, 6);
  const latestEventTickets = [...eventTickets].sort((a, b) => b.id - a.id).slice(0, 6);

  const sections = [
    { id: 1, title: 'BUS TICKETS', page: '/bus-tickets', tickets: latestBusTickets },
    { id: 2, title: 'CONCERT TICKETS', page: '/concert-tickets', tickets: latestConcertTickets },
    { id: 3, title: 'EVENT TICKETS', page: '/event-tickets', tickets: latestEventTickets }
  ];
  return (
    <>
      {sections.map((section) => (
        <div key={section.id} className='container mx-auto mt-8 p-4'>
          <div className='relative mb-4 flex items-center justify-center'>
            <h2 className='text-2xl font-bold'>{section.title}</h2>
            <a href={section.page} className='text-project-300 absolute top-0 right-0 bottom-0 hover:underline'>
              See All
            </a>
          </div>
          <TicketGrid tickets={section.tickets} />
        </div>
      ))}
    </>
  );
};

export default HomeTicketSection;
