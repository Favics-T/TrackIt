import  Nav  from "./component/layout/Nav"
import Home from "./page/Home"
import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';
import ProductListing from "./page/ProductListing";
import Order from "./page/Order";
import Tracking from "./page/Tracking";
import Support from "./page/Support";

const Layout = ()=>{
  return (
    <div className="">
      <Nav />
      <Outlet />
      
    </div>
  )
}

const App=()=> {

  return (
    <Router className='font-manrope'>
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