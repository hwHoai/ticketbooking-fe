import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Pagination from '../../../components/common/Pagination';
import TicketGrid from '../../../components/common/TicketGrid';
import { busTickets, concertTickets, eventTickets } from '../../../data/tickets';

const ticketsPerPage = 30;

const TicketList = ({ title = 'ALL TICKETS' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const allTickets = useMemo(() => {
    switch (title) {
      case 'BUS TICKETS':
        return [...busTickets].sort((a, b) => b.id - a.id);
      case 'CONCERT TICKETS':
        return [...concertTickets].sort((a, b) => b.id - a.id);
      case 'EVENT TICKETS':
        return [...eventTickets].sort((a, b) => b.id - a.id);
      default:
        return [...busTickets, ...concertTickets, ...eventTickets].sort((a, b) => b.id - a.id);
    }
  }, [title]);

  const totalTickets = allTickets.length;
  const totalPages = Math.ceil(totalTickets / ticketsPerPage);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * ticketsPerPage;
    setTickets(allTickets.slice(startIdx, startIdx + ticketsPerPage));
  }, [currentPage, allTickets]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <TicketGrid tickets={tickets} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default TicketList;
