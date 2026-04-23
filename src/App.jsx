import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';
import ProductListing from "./pages/ProductListing";
import Order from "./pages/Order";
import Tracking from "./pages/Tracking";
import TrackingPage from "./pages/TrackingPage"
import Support from "./pages/Support";
import Sidebar from "./component/layout/Sidebar";
import AIChatPage from './pages/AIChatPage'
import Navbar from "./component/layout/NavBar";

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
                     <Route path="/productlisting" element={<ProductListing />} /> 
          <Route path="/orderplacement" element={<Order />} />
          <Route path="/liveordertracking" element={<Tracking />} /> 
          <Route path="/support" element={<Support />} /> 
          <Route  path='/aichat' element={<AIChatPage />}/>
        </Route>
        <Route path='/trackingpage' element={<TrackingPage />} />
      </Routes>
    </Router>
  )
}

export default App