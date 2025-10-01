import Header from '../../components/layout/Header';
import TicketList from './components/TicketList';
import SearchForm from '../../components/common/SearchForm';

export const TicketListPage = () => {
  return (
    <div className='text-black-900 relative'>
      <Header />
      <div className='pt-70 pb-20'>
        <SearchForm />
      </div>
      <TicketList />
    </div>
  );
};
