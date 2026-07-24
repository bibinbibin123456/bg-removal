import React, { useState } from 'react';
import imagebg from '../assets/imagewithbg.jpg';
import imagewithoutbg from '../assets/imagewithoutbg.png';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div>
      {/*---Title---*/}
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Remove Background With High
        <br />
        Quality And Accuracy
      </h2>
     <div className="flex justify-center items-center mt-10">
      <div className="relative w-80">
  {/* Background Image */}
  <img
    src={imagebg}
    alt="image"
    className="w-80 h-auto rounded-lg shadow-lg"
    style={{
      clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`,
    }}
  />

  {/* Foreground Image */}
  <img
    src={imagewithoutbg}
    alt=""
    className="absolute top-0 left-0 w-80 h-auto rounded-lg shadow-lg"
    style={{
      clipPath: `inset(0 0 0 ${sliderPosition}%)`,
    }}
  />

  {/* Slider */}
  <input
    type="range"
    min={0}
    max={100}
    value={sliderPosition}
    onChange={handleSliderChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
  />

  {/* Vertical Divider */}
  <div
  className="absolute top-0 bottom-0 w-0.5 bg-white"
  style={{ left: `${sliderPosition}%` }}
></div>
</div>
</div>
    </div>
  );
};

export default BgSlider;