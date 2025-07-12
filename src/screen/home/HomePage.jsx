import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { logger } from '../../util/logger';
import Nav from '../../components/common/nav';
import Carousel from '../../components/common/carousel';
import SearchForm from '../../components/common/SearchForm';
import TicketSection from '../../components/common/TicketSection';

export const HomePage = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [tripType, setTripType] = useState('');
  const [activeTab, setActiveTab] = useState('bus');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loginWithRedirect } = useAuth0();

  logger.info('HomePage rendered', 'HomePage');

  const carouselData = [
    { id: 1, title: 'Summer Travel Deal', image: '', description: 'Get 30% off on all summer destinations' },
    { id: 2, title: 'Concert Series 2024', image: '', description: 'Book early and save on popular concerts' },
    { id: 3, title: 'Weekend Express', image: '', description: 'Fast and comfortable weekend trips' },
    { id: 4, title: 'Event Highlights', image: '', description: "Don't miss these amazing events" },
    { id: 5, title: 'Night Journey', image: '', description: 'Comfortable night travel options' },
    { id: 6, title: 'Family Package', image: '', description: 'Special deals for family trips' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselData.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(carouselData.length / 2)) % Math.ceil(carouselData.length / 2));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className='text-black-900'>
      <Nav
        handleLogin={handleLogin}
        isAccountDropdownOpen={isAccountDropdownOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
      />
      <SearchForm tripType={tripType} setTripType={setTripType} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Carousel
        carouselData={carouselData}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        goToSlide={goToSlide}
      />
      <TicketSection />
    </div>
  );
};
