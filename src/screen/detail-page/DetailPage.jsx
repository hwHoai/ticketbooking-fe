import { useParams } from 'react-router-dom';
import { tickets } from '../../data/tickets';
import BookingCard from '../../components/common/BookingCard';
import Accordion from '../../components/common/Accordion';
import Header from '../../components/common/Header';

export const DetailPage = () => {
  const { id } = useParams();
  const ticket = tickets.find((t) => t.id === Number(id));

  if (!ticket) return <div>Không tìm thấy vé!</div>;

  return (
    <div className='text-black-900'>
      <Header />
      <BookingCard ticket={ticket} isDetailPage />
      <Accordion ticket={ticket} />
    </div>
  );
};
