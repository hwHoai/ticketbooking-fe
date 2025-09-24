export const SecurityTab = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-6 text-xl font-semibold text-gray-800'>Security Settings</h3>
      <div className='space-y-6'>
        <div className='border-b pb-4'>
          <h4 className='mb-2 font-medium text-gray-700'>Change Password</h4>
          <p className='mb-4 text-sm text-gray-500'>Update your password to keep your account secure.</p>
          <button className='bg-project-300 hover:bg-project-400 rounded-lg px-4 py-2 text-white transition-colors'>
            Change Password
          </button>
        </div>

        <div className='border-b pb-4'>
          <h4 className='mb-2 font-medium text-gray-700'>Two-Factor Authentication</h4>
          <p className='mb-4 text-sm text-gray-500'>Add an extra layer of security to your account.</p>
          <button className='rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300'>
            Enable 2FA
          </button>
        </div>

        <div>
          <h4 className='mb-2 font-medium text-gray-700'>Login Sessions</h4>
          <p className='mb-4 text-sm text-gray-500'>Manage your active login sessions.</p>
          <button className='rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600'>
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>
  );
};
