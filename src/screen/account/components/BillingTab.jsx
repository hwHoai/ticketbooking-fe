import { CreditCard } from 'lucide-react';

export const BillingTab = () => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-6 text-xl font-semibold text-gray-800'>Billing & Payment</h3>
      <div className='space-y-6'>
        <div>
          <h4 className='mb-4 font-medium text-gray-700'>Payment Methods</h4>
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
            <CreditCard size={48} className='mx-auto mb-4 text-gray-400' />
            <p className='mb-4 text-gray-500'>No payment methods added yet</p>
            <button className='bg-project-300 hover:bg-project-400 rounded-lg px-4 py-2 text-white transition-colors'>
              Add Payment Method
            </button>
          </div>
        </div>

        <div>
          <h4 className='mb-4 font-medium text-gray-700'>Billing History</h4>
          <div className='py-8 text-center text-gray-500'>
            <p>No billing history available</p>
          </div>
        </div>
      </div>
    </div>
  );
};
