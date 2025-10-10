import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserAuthenticationService } from '../../service/user/user.authentication.service';
import BusIcon from '~icons/lucide/bus';
import CalendarIcon from '~icons/lucide/calendar';
import ChevronDownIcon from '~icons/lucide/chevron-down';
import EllipsisVerticalIcon from '~icons/lucide/ellipsis-vertical';
import GuitarIcon from '~icons/lucide/guitar';
import HistoryIcon from '~icons/lucide/history';
import HomeIcon from '~icons/lucide/home';
import InfoIcon from '~icons/lucide/info';
import LogInIcon from '~icons/lucide/log-in';
import LogOutIcon from '~icons/lucide/log-out';
import MoveRightIcon from '~icons/lucide/move-right';
import SearchIcon from '~icons/lucide/search';
import ShoppingCartIcon from '~icons/lucide/shopping-cart';
import UserRoundIcon from '~icons/lucide/user-round';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { isAuthenticated, userId, userName, userAvatar } = useSelector((state) => state.auth);

  const handleLogIn = useCallback(async () => {
    await UserAuthenticationService.login();
  }, []);

  const handleLogOut = useCallback(async () => {
    await UserAuthenticationService.logout();
  }, []);

  return (
    <nav className='bg-project-300 absolute top-0 left-0 z-50 flex min-h-20 w-full items-center text-gray-50 shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 lg:px-0'>
        <div className='flex items-center space-x-10'>
          {/* Logo */}
          <Link to='/' className='text-3xl font-bold no-underline hover:cursor-pointer'>
            Ticket Booking
          </Link>

          <div className='hidden items-center space-x-0 text-xl lg:flex'>
            <Link
              to='/'
              className='px-5 py-6 no-underline transition-all duration-200 hover:scale-118 hover:text-gray-900'
            >
              Home
            </Link>
            <Link
              to='/bus_tickets'
              className='px-5 py-6 no-underline transition-all duration-200 hover:scale-118 hover:text-gray-900'
            >
              Bus
            </Link>
            <Link
              to='/concert_tickets'
              className='px-5 py-6 no-underline transition-all duration-200 hover:scale-118 hover:text-gray-900'
            >
              Concert
            </Link>
            <Link
              to='/event_tickets'
              className='px-5 py-6 no-underline transition-all duration-200 hover:scale-118 hover:text-gray-900'
            >
              Event
            </Link>
          </div>
        </div>

        <div className='hidden items-center space-x-6 lg:flex'>
          {/* Search Bar */}
          <div className='relative flex'>
            <input
              type='text'
              placeholder='Search'
              className='w-32 rounded-l-lg bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-500 outline-none xl:w-80'
            />
            <button className='bg-project-400 rounded-r-lg px-3 py-2 transition-colors hover:cursor-pointer'>
              <SearchIcon width={20} height={20} />
            </button>
          </div>

          {/* Auth state */}
          {isAuthenticated ? (
            <div className='relative'>
              <div
                className='flex flex-row items-center justify-around gap-2 rounded-lg px-3 py-2 text-white transition-all duration-200 hover:cursor-pointer'
                onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
              >
                <img
                  src={userAvatar}
                  alt='user_avatar'
                  className='h-8 w-8 rounded-full bg-white'
                  loading='lazy'
                  width={'32'}
                  onError={(e) => {
                    e.currentTarget.src = '../../../assets/img/default_user.png';
                  }}
                  referrerPolicy='no-referrer'
                />
                <span className='text-sm'>Welcome, {userName}!</span>
                <ChevronDownIcon
                  width={20}
                  height={20}
                  className={`text-white transition-transform duration-300 ${
                    isAccountDropdownOpen ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
              {isAccountDropdownOpen && (
                <div className='absolute left-[50%] z-50 flex w-64 translate-x-[-50%] flex-col rounded-lg bg-white px-2 py-2 text-sm text-black/85 shadow-sm'>
                  {[
                    { id: 1, link: `/account/${userId}`, name: 'My Account', icon: UserRoundIcon },
                    { id: 2, link: '/purchase-history', name: 'Purchase History', icon: HistoryIcon },
                    { id: 3, link: '/cart', name: 'Cart', icon: ShoppingCartIcon }
                  ].map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onClick={() => setIsAccountDropdownOpen(false)}
                      className='flex flex-row items-center justify-start gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-200'
                    >
                      <item.icon width={20} height={20} /> {item.name}
                    </Link>
                  ))}
                  <button
                    className='flex flex-row items-center justify-start gap-2 px-4 py-2 text-left hover:bg-gray-200'
                    onClick={handleLogOut}
                  >
                    <LogOutIcon width={20} height={20} />
                    Logout
                  </button>
                  <Link
                    to='/help'
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className='flex flex-row items-center justify-start gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-200'
                  >
                    <InfoIcon width={20} height={20} />
                    Help
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className='flex items-center space-x-2 text-2xl'>
              <Link
                to='/cart'
                className='hover:bg-project-200 flex items-center rounded px-3 py-2 no-underline transition-all duration-200'
              >
                <ShoppingCartIcon width={20} height={20} />
              </Link>
              <button
                onClick={handleLogIn}
                className='hover:bg-project-200 flex items-center rounded px-3 py-2 transition-all duration-200 hover:scale-118 hover:cursor-pointer'
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='hover:bg-project-200 flex items-center rounded px-3 py-2 text-white lg:hidden'
        >
          <EllipsisVerticalIcon width={20} height={20} className='my-2' />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-project-200 fixed top-0 right-0 z-50 h-full w-full min-w-[40%] transform transition-transform duration-300 ease-in-out sm:w-fit lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full overflow-y-auto px-8 py-2'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='flex w-full items-center justify-end rounded py-2 text-white lg:hidden'
          >
            <MoveRightIcon width={20} height={20} />
          </button>
          {isAuthenticated && (
            <div className='flex w-64 flex-row items-center justify-around gap-2 rounded-lg px-3 py-2 text-white transition-all duration-200 hover:cursor-pointer'>
              <img
                src={userAvatar}
                alt='user_avatar'
                className='h-10 w-10 rounded-full bg-white'
                loading='lazy'
                width={'40'}
                onError={(e) => {
                  e.currentTarget.src = '../../../assets/img/default_user.png';
                }}
                referrerPolicy='no-referrer'
              />
              <span className='text-sm'>Welcome, {userName}!</span>
            </div>
          )}
          {/* Navigation Links */}
          <div className='border-project-300 border-t pt-2 text-xl'>
            <Link
              to='/'
              onClick={() => setIsMobileMenuOpen(false)}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <HomeIcon width={20} height={20} />
              <span>Home</span>
            </Link>
            <Link
              to='/bus_tickets'
              onClick={() => setIsMobileMenuOpen(false)}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <BusIcon width={20} height={20} />
              <span>Bus</span>
            </Link>
            <Link
              to='/concert_tickets'
              onClick={() => setIsMobileMenuOpen(false)}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <GuitarIcon width={20} height={20} />
              <span>Concert</span>
            </Link>
            <Link
              to='/event-tickets'
              onClick={() => setIsMobileMenuOpen(false)}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <CalendarIcon width={20} height={20} />
              <span>Event</span>
            </Link>
            {isAuthenticated ? (
              <button
                className='flex flex-row items-center justify-start gap-2 px-4 py-2 text-left hover:bg-gray-200'
                onClick={handleLogOut}
              >
                <LogOutIcon width={20} height={20} />
                Logout
              </button>
            ) : (
              <button
                className='flex flex-row items-center justify-start gap-2 px-4 py-2 text-left hover:bg-gray-200'
                onClick={handleLogIn}
              >
                <LogInIcon width={20} height={20} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 bg-gray-950/30 lg:hidden' onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Header;
