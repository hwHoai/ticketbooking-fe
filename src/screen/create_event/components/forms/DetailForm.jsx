import { Calendar, Clock, DollarSign } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const DetailForm = ({ errors }) => {
  const { register } = useFormContext();
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-medium text-gray-900'>Event Schedule & Pricing</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Start Date */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Calendar size={16} className='mr-2 inline' />
              Start Date *
            </label>
            <input
              type='date'
              {...register('startDate')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.startDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.startDate && <p className='mt-1 text-sm text-red-600'>{errors.startDate}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Calendar size={16} className='mr-2 inline' />
              End Date *
            </label>
            <input
              type='date'
              {...register('endDate')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.endDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.endDate && <p className='mt-1 text-sm text-red-600'>{errors.endDate}</p>}
          </div>

          {/* Start Time */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Clock size={16} className='mr-2 inline' />
              Start Time *
            </label>
            <input
              type='time'
              {...register('startTime')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.startTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.startTime && <p className='mt-1 text-sm text-red-600'>{errors.startTime}</p>}
          </div>

          {/* End Time */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Clock size={16} className='mr-2 inline' />
              End Time *
            </label>
            <input
              type='time'
              {...register('endTime')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.endTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.endTime && <p className='mt-1 text-sm text-red-600'>{errors.endTime}</p>}
          </div>

          {/* Price */}
          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <DollarSign size={16} className='mr-2 inline' />
              Ticket Price ($)
            </label>
            <input
              type='number'
              {...register('price')}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2'
              placeholder='0.00'
              min='0'
              step='0.01'
            />
            <p className='mt-1 text-xs text-gray-500'>Leave empty for free events</p>
          </div>
        </div>
      </div>
    </div>
  );
};
