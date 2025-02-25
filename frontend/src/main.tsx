import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

// ใช้ React.lazy เพื่อโหลด About component แบบ lazy
const City = lazy(() => import("./pages/City"));
const Country = lazy(() => import("./pages/Country"));
const County = lazy(() => import("./pages/County"));
const CountyCity = lazy(() => import("./pages/CountyCity"));
const Postalcode = lazy(() => import("./pages/Postalcode"));
const Province = lazy(() => import("./pages/Province"));
const Region = lazy(() => import("./pages/Region"));
const SalesTerritory = lazy(() => import("./pages/SalesTerritory"));
const ServiceTerritory = lazy(() => import("./pages/ServiceTerritory"));
const State = lazy(() => import("./pages/State"));
const Territory = lazy(() => import("./pages/Territory"));

const District = lazy(() => import("./pages/District"));
const Subdistrict = lazy(() => import("./pages/Subdistrict"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const DynamicDropdown = lazy(() => import("./pages/DynamicDropdown"));
const DynamicDDdistrict = lazy(() => import("./pages/DynamicDDdistrict"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/city" element={<City />} />
          <Route path="/country" element={<Country />} />
          <Route path="/county" element={<County />} />
          <Route path="/county_city" element={<CountyCity />} />
          <Route path="/postal_code" element={<Postalcode />} />
          <Route path="/province" element={<Province />} />
          <Route path="/region" element={<Region />} />
          <Route path="/sales_territory" element={<SalesTerritory />} />
          <Route path="/service_territory" element={<ServiceTerritory />} />
          <Route path="/state" element={<State />} />
          <Route path="/territory" element={<Territory />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/district" element={<District />} />
          <Route path="/sub_district" element={<Subdistrict />} />

          <Route path="/dynamic_dropdown" element={<DynamicDropdown />} />
          <Route
            path="/dynamic_dropdown_district"
            element={<DynamicDDdistrict />}
          />

          {/* สามารถเพิ่ม Route อื่น ๆ ได้ที่นี่ */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
