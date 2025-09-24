import { ImageIcon, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

export const ImageForm = ({ errors }) => {
  const thumbnailRef = useRef(null);
  const bannerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState({ thumbnail: null, banner: null });
  const handleImageUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview((prev) => ({ ...prev, [type]: null }));
    }
  };
  const removeImage = (type) => {
    setImagePreview((prev) => ({ ...prev, [type]: null }));
  };
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-medium text-gray-900'>Event Images</h3>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Thumbnail Upload */}
          <div>
            <label className='mb-3 block text-sm font-medium text-gray-700'>
              <ImageIcon size={16} className='mr-2 inline' />
              Event Thumbnail *
            </label>
            <div
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                errors.thumbnail ? 'border-red-300 bg-red-50' : 'hover:border-project-300 border-gray-300'
              }`}
              onClick={() => thumbnailRef.current?.click()}
            >
              {imagePreview.thumbnail ? (
                <div className='relative'>
                  <img
                    src={imagePreview.thumbnail}
                    alt='Thumbnail preview'
                    className='mx-auto h-40 w-full rounded-lg object-cover'
                  />
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage('thumbnail');
                    }}
                    className='absolute -top-2 -right-2 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600'
                  >
                    <X size={16} />
                  </button>
                  <div className='mt-3 text-sm text-gray-600'>Click to change thumbnail</div>
                </div>
              ) : (
                <div>
                  <Upload size={48} className='mx-auto mb-4 text-gray-400' />
                  <p className='mb-2 text-base font-medium text-gray-700'>Upload Thumbnail</p>
                  <p className='mb-1 text-sm text-gray-500'>Click to browse files</p>
                  <p className='text-xs text-gray-400'>PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            {errors.thumbnail && <p className='mt-2 text-sm text-red-600'>{errors.thumbnail}</p>}
            <input
              ref={thumbnailRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => handleImageUpload('thumbnail', e.target.files[0])}
            />
          </div>

          {/* Banner Upload */}
          <div>
            <label className='mb-3 block text-sm font-medium text-gray-700'>
              <ImageIcon size={16} className='mr-2 inline' />
              Event Banner *
            </label>
            <div
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                errors.banner ? 'border-red-300 bg-red-50' : 'hover:border-project-300 border-gray-300'
              }`}
              onClick={() => bannerRef.current?.click()}
            >
              {imagePreview.banner ? (
                <div className='relative'>
                  <img
                    src={imagePreview.banner}
                    alt='Banner preview'
                    className='mx-auto h-40 w-full rounded-lg object-cover'
                  />
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage('banner');
                    }}
                    className='absolute -top-2 -right-2 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600'
                  >
                    <X size={16} />
                  </button>
                  <div className='mt-3 text-sm text-gray-600'>Click to change banner</div>
                </div>
              ) : (
                <div>
                  <Upload size={48} className='mx-auto mb-4 text-gray-400' />
                  <p className='mb-2 text-base font-medium text-gray-700'>Upload Banner</p>
                  <p className='mb-1 text-sm text-gray-500'>Click to browse files</p>
                  <p className='text-xs text-gray-400'>PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            {errors.banner && <p className='mt-2 text-sm text-red-600'>{errors.banner}</p>}
            <input
              ref={bannerRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => handleImageUpload('banner', e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
