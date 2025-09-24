import { AlignLeft, Tag, Type } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const BasicInfoForm = ({ errors }) => {
  const { register } = useFormContext();
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-medium text-gray-900'>Basic Event Information</h3>
        <div className='grid grid-cols-1 gap-6'>
          {/* Event Title */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Type size={16} className='mr-2 inline' />
              Event Title *
            </label>
            <input
              type='text'
              {...register('title')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Enter event title'
            />
            {errors.title && <p className='mt-1 text-sm text-red-600'>{errors.title}</p>}
          </div>

          {/* Event Description */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <AlignLeft size={16} className='mr-2 inline' />
              Event Description *
            </label>
            <textarea
              {...register('description')}
              rows={6}
              className={`focus:ring-project-300 w-full resize-none rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Describe your event in detail...'
            />
            {errors.description && <p className='mt-1 text-sm text-red-600'>{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Tag size={16} className='mr-2 inline' />
              Category *
            </label>
            <select
              {...register('category')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value=''>Select category</option>
              <option value='music'>Music & Concert</option>
              <option value='sports'>Sports & Recreation</option>
              <option value='conference'>Conference & Meeting</option>
              <option value='workshop'>Workshop & Training</option>
              <option value='festival'>Festival & Fair</option>
              <option value='exhibition'>Exhibition & Show</option>
              <option value='food'>Food & Drink</option>
              <option value='networking'>Networking</option>
              <option value='other'>Other</option>
            </select>
            {errors.category && <p className='mt-1 text-sm text-red-600'>{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Tag size={16} className='mr-2 inline' />
              Tags
            </label>
            <input
              type='text'
              {...register('tags')}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2'
              placeholder='Enter tags separated by commas (e.g., music, outdoor, family)'
            />
            <p className='mt-1 text-xs text-gray-500'>Tags help users find your event more easily</p>
          </div>
        </div>
      </div>
    </div>
  );
};
