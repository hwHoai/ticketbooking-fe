import { Link } from 'react-router';

export const CreateEventBtn = ({ className }) => {
  return (
    <Link to='/events/create' className={`${className}`}>
      Create New Event
    </Link>
  );
};
