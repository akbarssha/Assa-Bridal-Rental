import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Footer from './components/Footer'
import Bridecollection from './components/Bridecollection'
import Login from './components/Login'
import Register from './components/Register'
import Outfits from './components/Outfits'
import BookOutfit from './components/BookOutfit'
import VendorBookings from './components/VendorBookings'
import PaymentDashboard from './components/PaymentDashboard'
import MyBookings from './components/MyBookings'
import Bridepage from './components/Bridepage'
import Groompage from './components/Groompage'
import Allbookings from './components/Allbookings'
import BookingsHome from './components/BookingsHome'
import Contact from './components/Contact'
import About from './components/About'
import Navbartwo from './components/Navbartwo'
import HomeUsertwo from './components/HomeUsertwo'
import Allbookingstwo from './components/Allbookingstwo'
import Bookingshometwo from './components/Bookingshometwo'
import VendorBookingstwo from './components/VendorBookingstwo'
import BookOutfittwo from './components/BookOutfittwo'
import Groomcollection from './components/Groomcollection'
import Update from './components/Update'
import Edit from './components/Edit'
import HomeUserthree from './components/HomeUserthree'
import HomeUser from './components/HomeUser'
import Bridepagethree from './components/Bridepagethree'
import Groompagethree from './components/Groompagethree'
import Cartpage from './components/Cartpage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <ToastContainer position="top-right" autoClose={3000} />
  <Routes>
    
    <Route path='/n' element={<Navbar/>}/>
    <Route path='/nt' element={<Navbartwo/>}/>
    <Route path='/f' element={<Footer/>}/>
    <Route path='/b' element={<Bridecollection/>}/>
    <Route path='/gc' element={<Groomcollection/>}/>
    <Route path='/l' element={<Login/>}/>
    <Route path='/r' element={<Register/>}/>
    <Route path='/o' element={<Outfits/>}/>
    <Route path='/bp' element={<Bridepage/>}/>
    <Route path='/bpt' element={<Bridepagethree/>}/>
    <Route path='/gp' element={<Groompage/>}/>
    <Route path='/gpt' element={<Groompagethree/>}/>
    <Route path="/bo/:id" element={<BookOutfit />} />
    <Route path="/bot/:id" element={<BookOutfittwo />} />
    <Route path='/mb' element={<MyBookings/>}/>
    <Route path='/vb' element={<VendorBookings/>}/>
    <Route path='/' element={<HomeUser/>}/>
    <Route path='/hut' element={<HomeUsertwo/>}/>
    <Route path='/huth' element={<HomeUserthree/>}/>
    <Route path='/ab' element={<Allbookings/>}/>
    <Route path='/bh' element={<BookingsHome/>}/>
    <Route path='/c' element={<Contact/>}/>
    <Route path='/a' element={<About/>}/>
    <Route path='/abt' element={<Allbookingstwo/>}/>
    <Route path='/bht' element={<Bookingshometwo/>}/>
    <Route path='/vbt' element={<VendorBookingstwo/>}/>
    <Route path='/u' element={<Update/>}/>
    <Route path='/e/:id' element={<Edit/>}/>
    <Route path="/payments" element={<PaymentDashboard/>} />
    <Route path="/cp" element={<Cartpage/>} />
    
  </Routes>
  </BrowserRouter>
  )
}

export default App
