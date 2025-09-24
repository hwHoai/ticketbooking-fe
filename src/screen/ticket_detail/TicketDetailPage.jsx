import { useParams } from 'react-router-dom';
import BookingCard from './components/BookingCard';
import Accordion from './components/Accordion';
import Header from '../../components/common/Header';
import { ticketInfoContext } from '../../components/provider/ticketInfoProvider';

export const TicketDetailPage = () => {
  const { id: ticketId, ticketType } = useParams();
  if (!ticketType || !ticketId) return <div>Không tìm thấy vé!</div>;

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
