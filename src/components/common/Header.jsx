import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserAuthenticationService } from '../../service/user/user.authentication.service';
import {
  Bus,
  Calendar,
  ChevronDown,
  EllipsisVertical,
  Guitar,
  History,
  Home,
  Info,
  LoaderCircle,
  LogOut,
  MoveRight,
  Search,
  ShoppingCart,
  UserRound
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../lib/redux/auth.slice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { isAuthenticated, userName, userAvatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogIn = useCallback(async () => {
    setLoading(true);
    await UserAuthenticationService.login();
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsAccountDropdownOpen(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && userName && userAvatar) {
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, userAvatar]);

  return (
    <nav className='bg-project-300 absolute top-0 left-0 z-50 w-full text-3xl text-white shadow-md'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-10'>
          {/* Logo */}
          <Link to='/' className='font-bold text-white no-underline hover:cursor-pointer'>
            Ticket Booking
          </Link>

          <div className='hidden items-center space-x-0 text-xl text-gray-50 lg:flex'>
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
              <Search size={20} />
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
                <ChevronDown
                  size={28}
                  className={`text-white transition-transform duration-300 ${
                    isAccountDropdownOpen ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
              {isAccountDropdownOpen && (
                <div className='absolute left-[50%] z-50 flex w-64 translate-x-[-50%] flex-col rounded-lg bg-white px-2 py-2 text-sm text-black/85 shadow-sm'>
                  <Link
                    to='/account'
                    onClick={closeDropdown}
                    className='flex flex-row items-center justify-start gap-2 rounded-t-lg px-4 py-2 hover:bg-gray-200'
                  >
                    <UserRound size={20} /> My Account
                  </Link>
                  <Link
                    to='/purchase-history'
                    onClick={closeDropdown}
                    className='flex flex-row items-center justify-start gap-2 px-4 py-2 hover:bg-gray-200'
                  >
                    <History size={20} />
                    Purchase History
                  </Link>
                  <Link
                    to='/cart'
                    onClick={closeDropdown}
                    className='flex flex-row items-center justify-start gap-2 px-4 py-2 hover:bg-gray-200'
                  >
                    <ShoppingCart size={20} /> Cart
                  </Link>
                  <button
                    className='flex flex-row items-center justify-start gap-2 px-4 py-2 text-left hover:bg-gray-200'
                    onClick={() => {
                      dispatch(logout());
                      closeDropdown();
                      navigate('/');
                    }}
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                  <Link
                    to='/help'
                    onClick={closeDropdown}
                    className='flex flex-row items-center justify-start gap-2 rounded-b-lg px-4 py-2 hover:bg-gray-200'
                  >
                    <Info size={20} />
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
                <ShoppingCart size={28} />
              </Link>
              <button
                onClick={handleLogIn}
                className='hover:bg-project-200 flex items-center rounded px-3 py-2 transition-all duration-200 hover:scale-118 hover:cursor-pointer'
              >
                {loading ? <LoaderCircle className='h-6 w-6 animate-spin' /> : 'Log In'}
              </button>
            </div>
          )}
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='hover:bg-project-200 flex items-center rounded px-3 py-2 text-white lg:hidden'
        >
          <EllipsisVertical size={28} className='my-2' />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-project-200 fixed top-0 right-0 z-50 h-screen w-fit transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full overflow-y-auto px-8 py-2'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='flex w-full items-center justify-end rounded py-2 text-white lg:hidden'
          >
            <MoveRight size={28} />
          </button>
          <div
            className='flex w-64 flex-row items-center justify-around gap-2 rounded-lg px-3 py-2 text-white transition-all duration-200 hover:cursor-pointer'
            onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
          >
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
          {/* Navigation Links */}
          <div className='border-project-300 border-t pt-2 text-xl'>
            <Link
              to='/'
              onClick={closeMobileMenu}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <Home />
              <span>Home</span>
            </Link>
            <Link
              to='/bus_tickets'
              onClick={closeMobileMenu}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <Bus />
              <span>Bus</span>
            </Link>
            <Link
              to='/concert_tickets'
              onClick={closeMobileMenu}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <Guitar />
              <span>Concert</span>
            </Link>
            <Link
              to='/event-tickets'
              onClick={closeMobileMenu}
              className='hover:bg-project-300 flex w-full flex-row gap-2 rounded-md px-3 py-2 text-left text-white no-underline'
            >
              <Calendar />
              <span>Event</span>
            </Link>
            <button
              className='flex flex-row items-center justify-start gap-2 px-4 py-2 text-left hover:bg-gray-200'
              onClick={() => {
                dispatch(logout());
                closeDropdown();
                navigate('/');
              }}
            >
              <LogOut size={20} />
              Logout
            </button>
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
