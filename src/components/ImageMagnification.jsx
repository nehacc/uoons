import React, { useRef, useState } from "react";

const ImageMagnification = ({ mainImage, thumbnailImages }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [lensVisible, setLensVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageContainerRef = useRef(null);
  const zoomLensRef = useRef(null);

  const handleMouseMove = (e) => {
    const { top, left, width, height } = imageContainerRef.current.getBoundingClientRect();
    const lensWidth = zoomLensRef.current.offsetWidth;
    const lensHeight = zoomLensRef.current.offsetHeight;

    let x = e.pageX - left - lensWidth / 2;
    let y = e.pageY - top - lensHeight / 2;

    if (x > width - lensWidth) x = width - lensWidth;
    if (x < 0) x = 0;
    if (y > height - lensHeight) y = height - lensHeight;
    if (y < 0) y = 0;

    zoomLensRef.current.style.left = `${x}px`;
    zoomLensRef.current.style.top = `${y}px`;

    const zoomFactor = 3;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `-${x * zoomFactor}px -${y * zoomFactor}px`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`
    });
  };

  const handleMouseEnter = () => {
    setLensVisible(true);
  };

  const handleMouseLeave = () => {
    setLensVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex">
        <div
          ref={imageContainerRef}
          className="relative w-full max-w-lg"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={selectedImage}
            alt="Main"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div
            ref={zoomLensRef}
            className={`absolute bg-white bg-opacity-30 border border-gray-400 rounded-full transition-opacity duration-300 ${lensVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: '20%', height: '20%' }}
          ></div>
        </div>
        <div
          className={`absolute  right-[-845px] top-[-24px] z-50 w-[700px] h-[500px] bg-no-repeat bg-cover ml-4 border border-gray-300 rounded-lg shadow-lg ${lensVisible ? 'block' : 'hidden'}`}
          style={
            
            {
            ...zoomStyle ,backgroundColor: 'white'
          }}
        ></div>
      </div>
      <div className="flex mt-4 space-x-2 overflow-scroll">
        {thumbnailImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 h-16 object-cover cursor-pointer border-2 border-transparent rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageMagnification;
