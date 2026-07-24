import React from 'react'
import imagewithbg from '../assets/imagewithbg.jpg'
import imagewithoutbg from '../assets/imagewithoutbg.png'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const {resultImage, image}=useContext(AppContext)
  return (
    <div className="mx-4 lg:mx-44 my-14 min-h-[75vh]">
      <div className="bg-white rounded-xl px-8 py-6 shadow-lg">

        {/* Image Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Left Side */}
          <div>
            <p className="text-lg font-semibold mb-3 text-gray-700">
              Original
            </p>
            <img
              src={image ? URL.createObjectURL(image):''}
              alt="Original"
              className="w-full rounded-lg shadow-md "
            />
          </div>

          {/* Right Side */}
          <div>
            <p className="text-lg font-semibold mb-3 text-gray-700">
              Background Removed
            </p>
            <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center">
              <img
                src={resultImage ? resultImage :""}
                alt="Background Removed"
                className="max-w-full rounded-lg"
              />
            </div>
          </div>

        </div>

      </div>
      {/*-Buttons-*/}
      
    <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-8">
  <button className="px-6 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition duration-300">
    Try Another Image
  </button>

  <a
    href=""
    download
    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
  >
    Download Image
  </a>
</div>
    </div>
    
  )
}

export default Result