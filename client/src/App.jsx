import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App