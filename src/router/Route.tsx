import { lazy, Suspense, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginStore } from "../store/Store";
import Layout from "../component/Layout";
import Login from "../pages/login";
import LesonPlan from "../pages/guru/LesonPlan";
import ODFYC from "../pages/guru/ODFYC";

const RoutHome = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/guru/leson-plan"
          element={
            <Layout>
              <LesonPlan />
            </Layout>
          }
        />
        <Route
          path="/guru/odfyc"
          element={
            <Layout>
              <ODFYC />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
