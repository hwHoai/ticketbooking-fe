import { t } from 'i18next';
import { logger } from '../../util/logger';

export const HomePage = () => {
  logger.info('NewFeedPage rendered', 'HomePage');
  return <div className='bg-primary-400 h-[30000px] w-full text-9xl'>{t('example.hello_world')}</div>;
};
