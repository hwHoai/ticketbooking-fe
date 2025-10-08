import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Image as ImageIcon, Calendar, Save, Eye, ArrowLeft, FileText, Map } from 'lucide-react';
import { BasicInfoForm } from './components/forms/BasicInfoForm';
import { DetailForm } from './components/forms/DetailForm';
import { ImageForm } from './components/forms/ImageForm';
import { LocationAndMapForm } from './components/forms/LocationAndMapForm';
import { FormProvider, useForm } from 'react-hook-form';

export const CreateNewEventPage = () => {
  const navigate = useNavigate();
  const eventData = useSelector((state) => state.eventForm);
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm();

  const onSubmit = (data) => {
    console.log('Form Data Submitted:', data);
  };
  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'location', label: 'Location & Map', icon: Map },
    { id: 'details', label: 'Details', icon: Calendar }
  ];

  const validateCurrentTab = () => {
    const newErrors = {};

    switch (activeTab) {
      case 'basic':
        if (!eventData.title.trim()) newErrors.title = 'Event title is required';
        if (!eventData.description.trim()) newErrors.description = 'Event description is required';
        if (!eventData.category) newErrors.category = 'Category is required';
        break;

      case 'images':
        if (!eventData.images.thumbnail) newErrors.thumbnail = 'Thumbnail image is required';
        if (!eventData.images.banner) newErrors.banner = 'Banner image is required';
        break;

      case 'location':
        if (!eventData.venue.trim()) newErrors.venue = 'Venue name is required';
        if (!eventData.address.trim()) newErrors.address = 'Address is required';
        break;

      case 'details':
        if (!eventData.startDate) newErrors.startDate = 'Start date is required';
        if (!eventData.endDate) newErrors.endDate = 'End date is required';
        if (!eventData.startTime) newErrors.startTime = 'Start time is required';
        if (!eventData.endTime) newErrors.endTime = 'End time is required';

        if (eventData.startDate && eventData.endDate && eventData.startDate > eventData.endDate) {
          newErrors.endDate = 'End date cannot be before start date';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAllTabs = () => {
    const newErrors = {};

    // Basic Info
    if (!eventData.title.trim()) newErrors.title = 'Event title is required';
    if (!eventData.description.trim()) newErrors.description = 'Event description is required';
    if (!eventData.category) newErrors.category = 'Category is required';

    // Images
    if (!eventData.images.thumbnail) newErrors.thumbnail = 'Thumbnail image is required';
    if (!eventData.images.banner) newErrors.banner = 'Banner image is required';

    // Location
    if (!eventData.venue.trim()) newErrors.venue = 'Venue name is required';
    if (!eventData.address.trim()) newErrors.address = 'Address is required';

    // Details
    if (!eventData.startDate) newErrors.startDate = 'Start date is required';
    if (!eventData.endDate) newErrors.endDate = 'End date is required';
    if (!eventData.startTime) newErrors.startTime = 'Start time is required';
    if (!eventData.endTime) newErrors.endTime = 'End time is required';

    if (eventData.startDate && eventData.endDate && eventData.startDate > eventData.endDate) {
      newErrors.endDate = 'End date cannot be before start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (status) => {
    if (!validateAllTabs()) {
      // Find the first tab with errors and navigate to it
      const tabsWithErrors = ['basic', 'images', 'location', 'details'];
      for (const tabId of tabsWithErrors) {
        setActiveTab(tabId);
        if (!validateCurrentTab()) {
          break;
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append event data
      Object.keys(eventData).forEach((key) => {
        if (key === 'tags') {
          formData.append(
            key,
            eventData[key]
              .split(',')
              .map((tag) => tag.trim())
              .join(',')
          );
        } else {
          formData.append(key, eventData[key]);
        }
      });

      // Append images
      if (eventData.images.thumbnail) formData.append('thumbnail', eventData.images.thumbnail);
      if (eventData.images.banner) formData.append('banner', eventData.images.banner);

      // Append map data
      if (eventData.mapData.drawnArea && eventData.mapData.drawnArea.length > 0) {
        formData.append('mapData', JSON.stringify(eventData.mapData));
      }

      formData.append('status', status);

      console.log('Event Data:', { eventData, status });

      // TODO: Implement API call
      // const response = await createEvent(formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (status === 'published') {
        alert('Event published successfully!');
      } else if (status === 'draft') {
        alert('Event saved as draft!');
      }

      // Navigate back or to event list
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoForm errors={errors} />;
      case 'images':
        return <ImageForm errors={errors} />;
      case 'location':
        return <LocationAndMapForm errors={errors} />;
      case 'details':
        return <DetailForm errors={errors} />;
      default:
        return <BasicInfoForm errors={errors} />;
    }
  };

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className='min-h-screen bg-gray-200'>
      <Header />

      <div className='container mx-auto mt-19 max-w-6xl px-4 py-8'>
        {/* Header */}
        <div className='mb-4 flex items-center gap-4'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800'
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        <div className='flex flex-col gap-6 lg:flex-row'>
          {/* Tab Navigation */}
          <div className='lg:w-80'>
            <div className='rounded-lg bg-white p-4 shadow-md'>
              <nav className='space-y-2'>
                {tabs.map((tab, index) => {
                  const IconComponent = tab.icon;
                  const hasErrors = Object.keys(errors).some((key) => {
                    switch (tab.id) {
                      case 'basic':
                        return ['title', 'description', 'category'].includes(key);
                      case 'images':
                        return ['thumbnail', 'banner'].includes(key);
                      case 'location':
                        return ['venue', 'address'].includes(key);
                      case 'details':
                        return ['startDate', 'endDate', 'startTime', 'endTime'].includes(key);
                      default:
                        return false;
                    }
                  });

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-project-300 text-white'
                          : hasErrors
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                            activeTab === tab.id
                              ? 'text-project-300 bg-white'
                              : hasErrors
                                ? 'bg-red-100 text-red-600'
                                : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <IconComponent size={20} />
                      </div>
                      <div className='flex flex-row gap-2'>
                        <div className='font-medium'>{tab.label}</div>
                        {hasErrors && <div className='text-md text-red-500'>*</div>}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            <div className='rounded-lg bg-gray-100 p-8 shadow-md'>
              <div className='flex flex-col items-center justify-center gap-2 pb-6'>
                <h1 className='text-project-300 text-3xl font-bold'>Create New Event</h1>
                <p className='text-gray-600'>Fill in the details to create your event</p>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {renderTabContent()}
                  <div className='flex gap-3'>
                    {currentTabIndex === tabs.length - 1 ? (
                      // Final tab - show submit buttons
                      <>
                        <button
                          type='button'
                          onClick={() => handleSubmit('draft')}
                          disabled={isSubmitting}
                          className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          <Save size={16} />
                          {isSubmitting ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <button
                          type='button'
                          onClick={() => handleSubmit('preview')}
                          disabled={isSubmitting}
                          className='border-project-300 text-project-300 hover:bg-project-50 flex items-center gap-2 rounded-lg border bg-white px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-project-300 hover:bg-project-400 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          {isSubmitting ? 'Publishing...' : 'Publish Event'}
                        </button>
                      </>
                    ) : (
                      // Not final tab - show next button
                      <button
                        type='button'
                        onClick={handleNext}
                        className='bg-project-300 hover:bg-project-400 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors'
                      >
                        Next
                        <ArrowLeft size={16} className='rotate-180' />
                      </button>
                    )}
                  </div>
                </form>
              </FormProvider>

              {/* Navigation Buttons */}
              <div className='mt-8 flex items-center justify-between border-t pt-6'>
                <button
                  type='button'
                  onClick={handlePrevious}
                  disabled={currentTabIndex === 0}
                  className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
