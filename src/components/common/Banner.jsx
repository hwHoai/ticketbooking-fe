import { useEffect, useRef, useState } from 'react';

export const Banner = ({ className }) => {
  // Get elements size
  const bannerRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);

  useEffect(() => {
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
      setBannerWidth(bannerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
        setBannerWidth(bannerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bannerHeight, bannerWidth]);

  return (
    <div ref={bannerRef} className={`bg-gray-300 object-cover ${className}`}>
      <img src={`https://placehold.co/${bannerWidth}x${bannerHeight}`} alt='Banner' height={96} width={'100%'} />
    </div>
  );
};
