import { t } from 'i18next';
import { logger } from '../../util/logger';
import { useAuth0 } from '@auth0/auth0-react';

export const HomePage = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect();
  };
  logger.info('NewFeedPage rendered', 'HomePage');
  return (
    <div className='bg-primary-400 h-[30000px] w-full text-9xl'>
      {t('example.hello_world')}
      <button onClick={handleLogin}>login</button>
    </div>
  );
};
