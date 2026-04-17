import  Nav  from "./component/layout/Nav"
import Home from "./page/Home"
import { BrowserRouter as Router, Navigate, Route, Routes,Outlet } from 'react-router-dom';

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
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="attendeedetails" element={<AttendeeDetails />} />
          <Route path="ticketready" element={<TicketReady />} />
          <Route path="selectticket" element={<SelectTicket />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App