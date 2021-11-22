import { Outlet } from "react-router-dom";
import Navbar from "../components/commons/Navbar";

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default MainLayout;
