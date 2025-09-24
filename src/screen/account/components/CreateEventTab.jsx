import { CreateEventBtn } from '../../../components/common/CreateEventBtn';

export const CreateEventTab = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-6 text-xl font-semibold text-gray-800'>Create Event</h3>
      <div className='space-y-6'>
        <div>
          <h4 className='mb-4 font-medium text-gray-700'>Event Creation</h4>
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
            <p className='mb-4 text-gray-500'>Create and manage your events easily</p>
            <CreateEventBtn className='bg-project-300 hover:bg-project-400 rounded-lg px-4 py-2 text-white transition-colors' />
          </div>
        </div>
      </div>
    </div>
  );
};
