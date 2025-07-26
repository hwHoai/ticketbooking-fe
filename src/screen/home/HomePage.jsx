import { logger } from '../../util/logger';
import Carousel from '../../components/common/carousel';
import SearchForm from '../../components/common/SearchForm';
import TicketSection from '../../components/common/TicketSection';
import Header from '../../components/common/Header';

export const HomePage = () => {
  logger.info('HomePage rendered', 'HomePage');
  return (
    <div className='text-black-900'>
      <Header />
      <SearchForm />
      <Carousel />
      <TicketSection />
    </div>
  );
};
