import { useParams } from 'react-router-dom';
import BookingCard from './components/BookingCard';
import Accordion from './components/Accordion';
import Header from '../../components/layout/Header';
import { ticketInfoContext } from '../../components/provider/ticketInfoProvider';
//import RecommendedTicket from '../../components/common/RecommededTicket';

const TicketDetailPage = () => {
  const { id: ticketId, ticketType } = useParams();
  if (!ticketType || !ticketId) return <div>Ticket not found</div>;

  return (
    <div className='min-h-screen bg-gray-100 p-20'>
      <ticketInfoContext.Provider value={{ ticketId, ticketType }}>
        <Header />
        <BookingCard />
        <Accordion />
      </ticketInfoContext.Provider>
    </div>
  );
};

export default TicketDetailPage;
