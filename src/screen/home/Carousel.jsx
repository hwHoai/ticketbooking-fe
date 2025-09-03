import { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    { id: 1, title: 'Summer Travel Deal', image: 'src/assets/home-page/1.png' },
    { id: 2, title: 'Concert Series 2024', image: 'src/assets/home-page/2.png' },
    { id: 3, title: 'Weekend Express', image: 'src/assets/home-page/3.png' },
    { id: 4, title: 'Event Highlights', image: 'src/assets/home-page/4.png' },
    { id: 5, title: 'Night Journey', image: 'src/assets/home-page/5.png' },
    { id: 6, title: 'Family Package', image: 'src/assets/home-page/6.png' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselData.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(carouselData.length / 2)) % Math.ceil(carouselData.length / 2));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='container mx-auto mt-8 p-4'>
      <h2 className='mb-6 text-center text-2xl font-bold'>WHAT&apos;S NEW</h2>

      <div className='relative'>
        {/* Carousel Container */}
        <div className='overflow-hidden rounded-lg'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(carouselData.length / 2) }).map((_, slideIndex) => (
              <div key={slideIndex} className='flex w-full flex-shrink-0 gap-4'>
                {carouselData.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                  <div key={item.id} className='w-1/2 overflow-hidden rounded-lg bg-white'>
                    <div className='aspect-[16/9]'>
                      <img src={item.image} alt={item.title} className='h-full w-full object-cover' />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all'
        >
          <svg className='h-5 w-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all'
        >
          <svg className='h-5 w-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Dots */}
        <div className='mt-4 flex justify-center space-x-2'>
          {Array.from({ length: Math.ceil(carouselData.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
