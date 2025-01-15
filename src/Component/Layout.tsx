import React, { FC } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../index.css";

interface Props {
  children?: React.ReactNode;
  name?: string;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div
        className="flex h-screen w-full flex-col overflow-hidden"
        data-theme="light"
      >
        <div className="flex flex-grow">
          <div className="z-50 xl:w-fit">
            <Sidebar />
          </div>
          <div className="h-screen w-full bg-color-1">
            <div className="">
              <Navbar />
            </div>
            <div className="max-w-5/4 max-h-[90%] overflow-auto p-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
