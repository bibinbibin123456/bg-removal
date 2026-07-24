import React from "react";
import upload from "../assets/upload.jpg";
import remove from "../assets/remove.jpg";
import download from "../assets/download.jpg";

const Steps = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="mx-4 lg:mx-44">
        {/* Heading */}
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Remove Image Backgrounds <br /> in Just Seconds
        </h1>

        <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
          Remove backgrounds from your photos instantly with AI.
        </p>

        {/* Three Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          {/* Box 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <img
              src={upload}
              alt="Upload"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h3 className="text-2xl font-bold mt-5">Upload Image</h3>
            <p className="text-gray-600 mt-3">
              Upload any image from your device with one click.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <img
              src={remove}
              alt="Remove"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h3 className="text-2xl font-bold mt-5">Remove Background</h3>
            <p className="text-gray-600 mt-3">
              AI automatically removes the background in seconds.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <img
              src={download}
              alt="Download"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h3 className="text-2xl font-bold mt-5">Download Image</h3>
            <p className="text-gray-600 mt-3">
              Download your transparent image in high quality.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Steps;