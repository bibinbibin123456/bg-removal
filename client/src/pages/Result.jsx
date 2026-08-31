import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const navigate = useNavigate()
  const { resultImage, image, isRemovingBg } = useContext(AppContext)
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
            <div className="relative bg-gray-100 rounded-lg p-4 min-h-[320px] flex justify-center items-center">
              {isRemovingBg && !resultImage ? (
                <div className="flex flex-col items-center gap-4 text-gray-600">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-lg font-medium">Processing image...</p>
                </div>
              ) : resultImage ? (
                <img
                  src={resultImage}
                  alt="Background Removed"
                  className="max-w-full rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>No result available yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
      {/*-Buttons-*/}
      
    <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-8">
  <button
    onClick={() => navigate('/')}
    className="px-6 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition duration-300"
  >
    Try Another Image
  </button>

  <a
    href={resultImage || '#'}
    download={resultImage ? 'result.png' : undefined}
    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
  >
    Download Image
  </a>
</div>
    </div>
    
  )
}

export default Result