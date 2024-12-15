import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// ใช้ React.lazy เพื่อโหลด About component แบบ lazy
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          {/* สามารถเพิ่ม Route อื่น ๆ ได้ที่นี่ */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
