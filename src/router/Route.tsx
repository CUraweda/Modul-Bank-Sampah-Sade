import { lazy, Suspense, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginStore } from "../store/Store";
import Layout from "../component/Layout";
import Login from "../pages/login";
// guru
import LessonPlan from "../pages/guru/LessonPlan";
import ODFYC from "../pages/guru/ODFYC";
import Pengumuman from "../pages/guru/Pengumuman";
import Prestasi from "../pages/guru/Prestasi";
import Presensi from "../pages/guru/Presensi";

const RoutHome = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/guru/leson-plan"
          element={
            <Layout>
              <LessonPlan />
            </Layout>
          }
        />
        <Route
          path="/guru/pengumuman"
          element={
            <Layout>
              <Pengumuman />
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
        <Route
          path="/guru/prestasi"
          element={
            <Layout>
              <Prestasi />
            </Layout>
          }
        />
        <Route
          path="/guru/presensi"
          element={
            <Layout>
              <Presensi />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
