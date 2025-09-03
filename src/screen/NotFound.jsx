import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='from-project-100 to-project-200 flex min-h-screen items-center justify-center bg-gradient-to-br px-4'>
      <div className='w-full max-w-md text-center'>
        {/* 404 Number */}
        <div className='mb-8'>
          <h1 className='text-project-400 mb-4 text-9xl font-bold'>404</h1>
          <div className='bg-project-300 mx-auto h-1 w-32 rounded-full'></div>
        </div>

        {/* Error Message */}
        <div className='mb-8'>
          <h2 className='text-project-500 mb-4 text-2xl font-semibold'>Oops! Page Not Found</h2>
          <p className='mb-6 text-gray-600'>
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry, it happens to the
            best of us!
          </p>
        </div>

        {/* Action Buttons */}
        <div className='mb-8 flex flex-col space-y-4'>
          <Link
            to='/'
            className='bg-project-300 hover:bg-project-400 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white no-underline transition-all duration-200 hover:scale-105'
          >
            <Home size={20} />
            Go to Homepage
          </Link>

          <button
            onClick={handleGoBack}
            className='bg-secondary-200 hover:bg-secondary-300 text-secondary-400 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 hover:scale-105'
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className='mb-8'>
          <p className='mb-4 text-sm text-gray-500'>Try these popular pages:</p>
          <div className='flex flex-wrap justify-center gap-2'>
            <Link
              to='/bus-tickets'
              className='text-project-300 hover:text-project-400 hover:bg-project-50 rounded-full bg-white px-3 py-1 text-sm no-underline transition-all duration-200'
            >
              Bus Tickets
            </Link>
            <Link
              to='/concert-tickets'
              className='text-project-300 hover:text-project-400 hover:bg-project-50 rounded-full bg-white px-3 py-1 text-sm no-underline transition-all duration-200'
            >
              Concert Tickets
            </Link>
            <Link
              to='/event-tickets'
              className='text-project-300 hover:text-project-400 hover:bg-project-50 rounded-full bg-white px-3 py-1 text-sm no-underline transition-all duration-200'
            >
              Event Tickets
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='bg-project-200/30 absolute top-10 left-10 h-20 w-20 rounded-full blur-xl'></div>
        <div className='bg-accent-200/20 absolute right-10 bottom-10 h-32 w-32 rounded-full blur-xl'></div>
        <div className='bg-secondary-200/40 absolute top-1/2 left-5 h-16 w-16 rounded-full blur-lg'></div>
      </div>
    </div>
  );
};

export default NotFound;
