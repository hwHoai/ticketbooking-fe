import { useAuth0 } from '@auth0/auth0-react';
import { logger } from '../../util/logger';
import Heading from '../../components/common/Heading';
import Carousel from '../../components/common/carousel';
import SearchForm from '../../components/common/SearchForm';
import TicketSection from '../../components/common/TicketSection';

export const HomePage = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bus');
  const [tripType, setTripType] = useState('One-way');
  const { loginWithRedirect } = useAuth0();

  logger.info('HomePage rendered', 'HomePage');

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className='text-black-900'>
      <Heading
        handleLogin={handleLogin}
        isAccountDropdownOpen={isAccountDropdownOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
      />
      <SearchForm activeTab={activeTab} setActiveTab={setActiveTab} tripType={tripType} setTripType={setTripType} />
      <Carousel />
      <TicketSection />
    </div>
  );
};
