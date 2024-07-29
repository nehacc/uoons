import React from 'react';
import ImageMagnification from '../components/ImageMagnification';

const productData = {
  mainImage: "https://m.media-amazon.com/images/I/41e+MOmzCTL._SY300_SX300_.jpg",
  thumbnailImages: [
    "https://m.media-amazon.com/images/I/41e+MOmzCTL._SY300_SX300_.jpg",
    "https://m.media-amazon.com/images/I/41e+MOmzCTL._SY300_SX300_.jpg",
    "https://m.media-amazon.com/images/I/41e+MOmzCTL._SY300_SX300_.jpg"
  ]
};

const App = () => {
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Image Magnification</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ImageMagnification 
          mainImage={productData.mainImage} 
          thumbnailImages={productData.thumbnailImages} 
        />
      </div>
    </div>
  );
};

export default App;
