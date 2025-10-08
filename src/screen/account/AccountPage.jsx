import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/layout/Header';
import { User, Shield, Bell, CreditCard, CalendarDays } from 'lucide-react';
import { BillingTab } from './components/BillingTab';
import { ProfileTab } from './components/ProfileTab';
import { SecurityTab } from './components/SecurityTab';
import { NotificationTab } from './components/NotificationTab';
import { CreateEventTab } from './components/CreateEventTab';
import { UserAuthenticationService } from '../../service/user/user.authentication.service';
import { Cookie } from '../../util/cookie.util';
import { REFRESH_TOKEN_KEY } from '../../constant/common';

export const AccountPage = () => {
  const { userName, userAvatar } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'create_event', label: 'Create Event', icon: CalendarDays }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationTab />;
      case 'billing':
        return <BillingTab />;
      case 'create_event':
        return <CreateEventTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-200 p-20'>
      <Header />

      <div className='container mx-auto mt-6 max-w-6xl'>
        {/* Page Header */}
        <div className='mb-6 rounded-lg bg-gray-100 p-6 shadow-md'>
          <div className='flex items-center gap-4'>
            <img
              src={userAvatar || '../../../assets/img/default_user.png'}
              alt='Profile'
              className='border-project-300 h-16 w-16 rounded-full border-2 object-cover'
              onError={(e) => {
                e.currentTarget.src = '../../../assets/img/default_user.png';
              }}
              referrerPolicy='no-referrer'
            />
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>{userName}</h1>
              <p className='text-gray-600'>Manage your account settings</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6 lg:flex-row'>
          {/* Sidebar Navigation */}
          <div className='lg:w-64'>
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <nav className='space-y-2'>
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id ? 'bg-project-300 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};
