import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import assets from '../assets/assets.jpg'
import plans from '../assets/plans.js'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {

  const {backendUrl, loadCreditsData, user}= useContext(AppContext)

  const navigate= useNavigate()

  const token = localStorage.getItem("token")
  const [creatingOrderFor, setCreatingOrderFor] = useState(null)

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payments',
      description: 'Credits Payments',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log('razorpay response', response);
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-payment',
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success('Credit Added');
          } else {
            toast.error(data.message || 'Payment verification failed');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || error.message);
        }
      },
      modal: {
        ondismiss: () => {
          toast.info('Payment cancelled by user');
        },
      },
      prefill: {
        email: user?.email || '',
      },
      theme: {
        color: '#6D28D9',
      },
    };

    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded. Try again later.');
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error('Razorpay payment failed', response.error);
      toast.error(response.error?.description || 'Payment failed. Please try again.');
    });
    rzp.open();
  };
  const paymentRazorpay = async (planId) => {
    if (!token) {
      toast.info('Please sign in to purchase credits');
      navigate('/signIn');
      return;
    }

    // map numeric plan ids to server-side plan keys
    const planMap = {
      1: 'Basic',
      2: 'Pro',
      3: 'Premium',
    };
    const planKey = planMap[planId] || planId;

    setCreatingOrderFor(planId)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/create-order',
        { planId: planKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.order) {
        console.log('order created', data.order);
        toast.info('Payment order created. Opening checkout...');
        initPay(data.order);
      } else {
  console.log("CREATE ORDER RESPONSE:", data);
  alert(JSON.stringify(data));
  toast.error(data.message || 'Unable to create payment order');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Payment failed');
    } finally {
      setCreatingOrderFor(null)
    }
  };
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

        <p className="text-gray-600 mt-2">{item.credits}</p>

        <button
          onClick={() => paymentRazorpay(item.id)}
          disabled={creatingOrderFor === item.id}
          className={`w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold transition duration-300 ${creatingOrderFor === item.id ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {creatingOrderFor === item.id ? 'Processing...' : 'Purchase'}
        </button>
      </div>
    ))}
  </div>
</div>
  )
}

export default BuyCredit