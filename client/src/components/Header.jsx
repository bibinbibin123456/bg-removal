import React from 'react'
import upload from '../assets/upload.jpg'
import image from '../assets/image.jpg'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {
  const { removeBg, isRemovingBg } = useContext(AppContext)
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 xl:px-36 py-12 gap-12">

  {/*----------- Left Side -----------*/}
  <div className="flex-1">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
      Remove the <br />
      <span className="text-blue-600">background</span> from <br />
      images for free
    </h1>

    <p className="mt-6 text-gray-600 text-base md:text-lg leading-7">
      Remove backgrounds from your images instantly with AI. Upload any photo and get a clean, transparent background in seconds—fast, accurate, and completely free to try.
    </p>

    <div className="mt-8">
      <input onChange={e => !isRemovingBg && removeBg(e.target.files[0])}
        type="file"
        accept='image/*'
        id="imageUpload"
        className="hidden"
      />

      <label
        htmlFor={!isRemovingBg ? "imageUpload" : ""}
        className={`inline-flex items-center gap-3 bg-blue-600 ${isRemovingBg ? 'opacity-70 cursor-not-allowed pointer-events-none' : 'hover:bg-blue-700'} text-white px-6 py-3 rounded-full transition duration-300 shadow-lg ${isRemovingBg ? '' : 'hover:shadow-xl'}`}
      >
        <img src={upload} alt="Upload" className="w-5 h-5" />
        <span className="inline-flex items-center gap-2 font-medium">
          {isRemovingBg && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {isRemovingBg ? 'Processing image...' : 'Upload your image'}
        </span>
      </label>
    </div>
  </div>

  {/*----------- Right Side -----------*/}
  <div className="w-full max-w-md">
    <img src={image} 
      alt="Background Remover"
  className="w-70 h-auto rounded-lg shadow-lg" />


  </div>

</div>
  )
}

export default Header