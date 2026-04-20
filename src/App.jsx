import  Nav  from "./component/layout/Nav"
import Home from "./pages/Home"
import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';
import ProductListing from "./pages/ProductListing";
import Order from "./pages/Order";
import Tracking from "./pages/Tracking";
import Support from "./pages/Support";
import Sidebar from "./component/layout/Sidebar";

const Layout = ()=>{
  return (
    <div className="font-manrope">
      <Nav />
      <div className="flex bg-[#f3f3f5] min-h-screen gap-8 py-12 px-6">
        <div className="">
           <Sidebar />
        </div>
       
        <Outlet />
      </div>
      
      
    </div>
  )
}

const App=()=> {

  return (
    <Router className='font-manrope bg-[#f5f5f5]'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
           <Route path="/productlisting" element={<ProductListing />} /> 
          <Route path="/orderplacement" element={<Order />} />
          <Route path="/liveordertracking" element={<Tracking />} /> 
          <Route path="/support" element={<Support />} /> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App