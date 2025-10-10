import Carousel from './components/Carousel';
import SearchForm from '../../components/common/SearchForm';
import HomeTicketSection from './components/HomeTicketSection';
import Header from '../../components/layout/Header';
import { Banner } from '../../components/common/Banner';

const HomePage = () => {
  return (
    <div className='container mx-auto flex min-h-screen flex-col'>
      <Header />
      <Banner className={`mt-20 h-96 overflow-hidden`} />
      <SearchForm className={`absolute top-120 left-1/2 z-10 w-[86%] -translate-x-1/2 transform`} />
      <Carousel />
      <HomeTicketSection />
    </div>
  );
};

export default HomePage;
