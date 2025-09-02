import Carousel from '../../components/common/carousel';
import SearchForm from '../../components/common/SearchForm';
import HomeTicketSection from '../../components/common/HomeTicketSection';
import Header from '../../components/common/Header';

export const HomePage = () => {
  return (
    <div className='text-black-900'>
      <Header />
      <SearchForm />
      <Carousel />
      <HomeTicketSection />
    </div>
  );
};
