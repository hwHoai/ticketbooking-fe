export const NotificationTab = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-6 text-xl font-semibold text-gray-800'>Notification Preferences</h3>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium text-gray-700'>Email Notifications</h4>
            <p className='text-sm text-gray-500'>Receive updates about your bookings and account</p>
          </div>
          <input type='checkbox' className='text-project-300 h-5 w-5' defaultChecked />
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium text-gray-700'>SMS Notifications</h4>
            <p className='text-sm text-gray-500'>Get booking confirmations via SMS</p>
          </div>
          <input type='checkbox' className='text-project-300 h-5 w-5' />
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium text-gray-700'>Marketing Updates</h4>
            <p className='text-sm text-gray-500'>Receive promotional offers and news</p>
          </div>
          <input type='checkbox' className='text-project-300 h-5 w-5' />
        </div>
      </div>
    </div>
  );
};
