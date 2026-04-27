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
import OrderHistory from './pages/OrderHistory';

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
   <Routes>
  {/* Root redirect */}
  <Route path="/" element={<Navigate to="/productlisting" replace />} />

  {/* Main routes  */}
  <Route path="/productlisting" element={<ProductListing />} />
  <Route path="/checkoutpage"   element={<CheckoutPage />} />
  <Route path="/confirmation"   element={<OrderConfirmation />} />
  <Route path="/trackingpage"   element={<TrackingPage />} />
  <Route path="/aichat"         element={<AIChatPage />} />
  <Route path="/orders" element={<OrderHistory />} />

  {/* Catch-all 404 */}
  <Route path="*" element={
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-sm font-semibold text-gray-500">Page not found.</p>
      <button
        onClick={() => window.location.href = '/productlisting'}
        className="text-xs text-teal-600 hover:underline"
      >
        Go to Products →
      </button>
    </div>
  } />
</Routes>
  )
}

export default App