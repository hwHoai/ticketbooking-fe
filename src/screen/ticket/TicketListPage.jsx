import { Search } from 'lucide-react';
import Header from '../../components/common/Header';
import TicketList from './TicketList';
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
