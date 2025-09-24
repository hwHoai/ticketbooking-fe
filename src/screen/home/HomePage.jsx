import Carousel from './components/Carousel';
import SearchForm from '../../components/common/SearchForm';
import HomeTicketSection from './components/HomeTicketSection';
import Header from '../../components/common/Header';

export const HomePage = () => {
  return (
    <div className='text-black-900 relative p-20'>
      <Header />
      <div id='banner' className='h-96 bg-gray-300'></div>
      <SearchForm className={`absolute top-120 left-1/2 z-10 w-[86%] -translate-x-1/2 transform`} />
      <Carousel />
      <HomeTicketSection />
    </div>
  );
};
