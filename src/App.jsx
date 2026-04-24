import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';
import ProductListing from "./pages/ProductListing";
import Order from "./pages/Order";
import LiveMap from "./pages/LiveMap";
import TrackingPage from "./pages/TrackingPage"
import Support from "./pages/Support";
import Sidebar from "./component/layout/Sidebar";
import AIChatPage from './pages/AIChatPage'
import Navbar from "./component/layout/NavBar";
import OrderConfirmation from './pages/OrderConfirmation';
import CheckoutPage from './pages/CheckoutPage';

const Layout = ()=>{
  return (
    <div className="font-manrope  ">
      <Navbar />
      <div className='py-10 flex px-10 gap-10'>
        <Sidebar />
 <Outlet />   
      </div>
       
    </div>
  )
}

const App=()=> {

  return (
    <Router className='font-manrope '>
      <Routes>
        <Route path="/" element={<Layout />}>
                    
          <Route path="/orderplacement" element={<Order />} />
          <Route path="/liveordertracking" element={<LiveMap />} /> 
          <Route path="/support" element={<Support />} /> 
          
        </Route>
        <Route path='/trackingpage' element={<TrackingPage />} />
        <Route path='/confirmation' element={<OrderConfirmation />}/>
        <Route path='/checkoutpage' element={<CheckoutPage />}/>
         <Route path="/productlisting" index element={<ProductListing />} /> 
         <Route  path='/aichat' element={<AIChatPage />}/>
      </Routes>
    </Router>
  )
}

export default App