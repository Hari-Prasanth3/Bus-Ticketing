import React, { useState, useEffect } from 'react';
import '.././index.css'; // import the CSS file

const images = [
  'https://source.unsplash.com/random/800x600/?travel,beach',
  'https://source.unsplash.com/random/800x600/?travel,mountains',
  'https://source.unsplash.com/random/800x600/?travel,forest',
  'https://source.unsplash.com/random/800x600/?travel,desert',
  'https://source.unsplash.com/random/800x600/?travel,city'
];

const TravelCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // advance the slide every 5 seconds

    return () => {
      clearInterval(interval); // clear the interval when the component unmounts
    };
  }, [currentImage]);

  return (
    <div className="carousel">
      <button onClick={prevImage}>Previous</button>
      <img src={images[currentImage]} alt="" />
      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default TravelCarousel;