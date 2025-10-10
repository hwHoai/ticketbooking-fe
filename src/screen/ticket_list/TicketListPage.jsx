import Header from '../../components/layout/Header';
import TicketList from './components/TicketList';
import SearchForm from '../../components/common/SearchForm';

const TicketListPage = () => {
  return (
    <div className='relative text-black'>
      <Header />
      <div className='pt-70 pb-20'>
        <SearchForm />
      </div>
      <TicketList />
    </div>
  );
};

export default TicketListPage;
