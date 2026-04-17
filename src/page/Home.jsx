import Nav from "../component/layout/Nav";
import Home from '../page/Home.jsx'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;