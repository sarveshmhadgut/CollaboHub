import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
  return (
    <div className=' backdrop-blur-sm bg-black/80 shadow-xl w-full flex flex-col items-center min-h-screen'>
        <div className="w-full sticky top-0 z-50"><Navbar /></div>


      <div className="w-full flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
