import React from 'react'
import assets from '../assets/assets.jpg'
import plans from '../assets/plans.js'

const BuyCredit = () => {
  return (
    <div className="min-h-[80vh] bg-gray-50 py-16 px-6">
  {/* Heading */}
  <div className="text-center">
    <button className="px-5 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
      Our Plans
    </button>

    <h1 className="text-4xl font-bold mt-5">
      Choose the plan that's right for you
    </h1>

    <p className="text-gray-500 mt-3">
      Select a plan that fits your needs and start removing backgrounds
      effortlessly.
    </p>
  </div>

  {/* Cards */}
  <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {plans.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border hover:-translate-y-2"
      >
        <img
          src={assets}
          alt="Plan"
          className="w-12 h-12 mx-auto mb-5"
        />

        <h2 className="text-2xl font-bold">{item.name}</h2>

        <p className="text-gray-500 mt-2">{item.description}</p>

        <h3 className="text-4xl font-bold text-purple-600 mt-6">
          {item.price}
        </h3>

        <p className="text-gray-600 mt-2">
          {item.credits} Credits
        </p>

        <ul className="mt-6 space-y-2 text-left">
          {item.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">✔</span>
              {feature}
            </li>
          ))}
        </ul>

        <button className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:scale-105 transition duration-300">
          Purchase
        </button>
      </div>
    ))}
  </div>
</div>
  )
}

export default BuyCredit