import Carousel from './Carousel';
import SearchForm from '../../components/common/SearchForm';
import TicketSection from './TicketSection';
import Header from '../../components/common/Header';

export const HomePage = () => {
  return (
    <div className='text-black-900 relative'>
      <Header />
      <div id='banner' className='h-81 bg-gray-300'></div>
      <SearchForm className={`absolute top-100 left-1/2 z-10 -translate-x-1/2 transform`} />
      <Carousel />
      <TicketSection />
    </div>
  );
};
