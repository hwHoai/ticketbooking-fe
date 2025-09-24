import { Calendar, Camera, Edit3, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const ProfileTab = () => {
  const { id } = useParams();
  const { userName, userAvatar, isAuthenticated } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: userName || '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bio: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return;
    }
    // Fetch user data based on ID if needed
    setUserInfo((prev) => ({
      ...prev,
      name: userName || ''
    }));
  }, [isAuthenticated, userName, id]);
  const handleSave = () => {
    // TODO: Implement save functionality with API call
    console.log('Saving user info:', userInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserInfo((prev) => ({
      ...prev,
      name: userName || ''
    }));
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-xl font-semibold text-gray-800'>Profile Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className='bg-project-300 hover:bg-project-400 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors'
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className='flex gap-2'>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600'
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600'
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-6 md:flex-row'>
        {/* Avatar Section */}
        <div className='flex flex-col items-center'>
          <div className='relative'>
            <img
              src={userAvatar || '../../../assets/img/default_user.png'}
              alt='Profile'
              className='border-project-300 h-32 w-32 rounded-full border-4 object-cover'
              onError={(e) => {
                e.currentTarget.src = '../../../assets/img/default_user.png';
              }}
            />
            {isEditing && (
              <button className='bg-project-300 hover:bg-project-400 absolute right-0 bottom-0 rounded-full p-2 text-white transition-colors'>
                <Camera size={16} />
              </button>
            )}
          </div>
          <p className='mt-2 text-center text-sm text-gray-500'>
            {isEditing ? 'Click camera to change photo' : 'Profile Photo'}
          </p>
        </div>

        {/* Profile Form */}
        <div className='grid flex-1 grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <User size={16} className='mr-2 inline' />
              Full Name
            </label>
            <input
              type='text'
              value={userInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Mail size={16} className='mr-2 inline' />
              Email
            </label>
            <input
              type='email'
              value={userInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Phone size={16} className='mr-2 inline' />
              Phone Number
            </label>
            <input
              type='tel'
              value={userInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Calendar size={16} className='mr-2 inline' />
              Date of Birth
            </label>
            <input
              type='date'
              value={userInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <MapPin size={16} className='mr-2 inline' />
              Address
            </label>
            <input
              type='text'
              value={userInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              className='focus:ring-project-300 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Bio</label>
            <textarea
              value={userInfo.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className='focus:ring-project-300 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 disabled:bg-gray-100'
              placeholder='Tell us about yourself...'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
