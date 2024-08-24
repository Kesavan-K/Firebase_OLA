"use client";
import { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Importing icons from react-icons library

const MyImageGallery = () => {
  const images = [
    '/C1.jpg',
    '/C2.jpg',
    '/C3.jpg',
    '/C4.jpg',
    '/C5.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]); // Start with the first image

  // Carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
    }, 3000); // Move to next image every 3 seconds

    return () => clearInterval(interval);
  }, [selectedImage, images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="md:mt-32 mt-28 md:px-20 px-3 rounded-md">
      {/* Big Image */}
      <div className="relative h-[60vh] mb-4 rounded">
        <img
          className='w-full h-full object-cover rounded'
          src={selectedImage}
          alt="Big Image"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4 md:flex hidden">
          <button className="hover:text-white text-white text-opacity-40 bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-70 transition duration-300 focus:outline-none" onClick={() => handleImageClick(images[(images.indexOf(selectedImage) + images.length - 1) % images.length])}>
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <button className="hover:text-white text-white text-opacity-40 bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-70 transition duration-300 focus:outline-none" onClick={() => handleImageClick(images[(images.indexOf(selectedImage) + 1) % images.length])}>
            <FaArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Small Images as Cards */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer">
            <div
              className={`relative h-32 rounded-lg overflow-hidden ${image === selectedImage ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageClick(image)}
            >
              <img
                className='w-full h-full object-cover'
                src={image}
                alt={`Image ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyImageGallery;
