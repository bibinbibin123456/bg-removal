import React from 'react'
import testimonials from '../assets/assets'

const Testimonials = () => {
  return (
    <section className="py-20 px-6 lg:px-44 bg-gray-50">
      {/* Title */}
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Customer Testimonials
      </h1>

      <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
        See why thousands of users trust our AI-powered background remover for
        fast, accurate, and professional-quality results.
      </p>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {testimonials.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <p className="text-5xl text-purple-600 font-bold">“</p>

              <p className="text-gray-600 mt-2">{item.review}</p>

              <div className="flex items-center mt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;