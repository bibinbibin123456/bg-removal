import React from "react";
import upload from "../assets/upload.jpg";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg, isRemovingBg } = useContext(AppContext);
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        See the magic. Try now.
      </h2>

      <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
        Upload your image and let our AI remove the background in seconds.
        Fast, accurate, and completely hassle-free.
      </p>

      {/* Upload Button */}
      <div className="flex justify-center mt-10">
        <input onChange={e => !isRemovingBg && removeBg(e.target.files[0])} type="file" accept="image/*" id="upload2" className="hidden" />

        <label
          htmlFor={!isRemovingBg ? "upload2" : ""}
          className={`inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 ${isRemovingBg ? 'opacity-70 cursor-not-allowed pointer-events-none' : 'hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl hover:scale-105'} text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg`}
        >
          <img
            src={upload}
            alt="Upload"
            className="w-5 h-5 rounded-full"
          />
          <span className="inline-flex items-center gap-2 font-semibold">
            {isRemovingBg && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
            {isRemovingBg ? 'Processing image...' : 'Upload your image'}
          </span>
        </label>
      </div>
    </section>
  );
};

export default Upload;