import  Nav  from "./component/layout/Nav"
import Home from "./pages/Home"
import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';
import ProductListing from "./pages/ProductListing";
import Order from "./pages/Order";
import Tracking from "./pages/Tracking";
import Support from "./pages/Support";
import Sidebar from "./component/layout/Sidebar";
import AIChatPage from './pages/AIChatPage'

const Layout = ()=>{
  return (
    <div className="font-manrope p-8 ">
        <Outlet />
     
    </div>
  )
}

const App=()=> {

  return (
    <Router className='font-manrope '>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
           <Route path="/productlisting" element={<ProductListing />} /> 
          <Route path="/orderplacement" element={<Order />} />
          <Route path="/liveordertracking" element={<Tracking />} /> 
          <Route path="/support" element={<Support />} /> 
          <Route  path='/aichat' element={<AIChatPage />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App