import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { logger } from '../../util/logger';
import Nav from '../../components/common/nav';
import Carousel from '../../components/common/carousel';
import SearchForm from '../../components/common/SearchForm';
import TicketSection from '../../components/common/TicketSection';

export const HomePage = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');
  const { loginWithRedirect } = useAuth0();

  logger.info('HomePage rendered', 'HomePage');

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className='text-black-900'>
      <Nav
        handleLogin={handleLogin}
        isAccountDropdownOpen={isAccountDropdownOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
      />
      <SearchForm tripType={tripType} setTripType={setTripType} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Carousel />
      <TicketSection />
    </div>
  );
};
