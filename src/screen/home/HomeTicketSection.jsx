import TicketSection from '../../components/common/TicketSection';

const HomeTicketSection = () => {
  return (
    <>
      <TicketSection title='BUS TICKETS' link='/bus-tickets' linkText='View more' />
      <TicketSection title='CONCERT TICKETS' link='/concert-tickets' linkText='View more' />
      <TicketSection title='EVENT TICKETS' link='/event-tickets' linkText='View more' />
    </>
  );
};

export default HomeTicketSection;
