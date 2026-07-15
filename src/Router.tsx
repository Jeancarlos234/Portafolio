import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Technologies from './pages/Technologies/Technologies'
import Experience from './pages/Experience/Experience'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'

// Landing Page Corporativa
import LandingPage from './pages/Web/LadingPage/LandingPage'

// WeatherApp
import WeatherApp from './pages/Apps/WeatherApp/WeatherApp'

// Dashboard de Visualización de Datos
import DashboardApp from './pages/Web/DashboardApp/DashboardApp'

// BlogApp
import BlogApp from './pages/Web/BlogApp/BlogApp'

// BookingApp
import BookingsApp from './pages/Web/BookingApp/BookingApp'

// Facturacion
import FacturacionApp from './pages/Web/InvoiceApp/InvoiceApp'

// E-commerce Platform
import ShopApp from './pages/Web/ShopApp/ShopApp'

// Courses Platform
import CoursesApp from './pages/Web/CoursesApp/CoursesApp'

// Inventory App
import InventoryApp from './pages/Web/InventoryApp/InventoryApp'

//RRHH
import HRApp from './pages/Web/HRApp/HRApp'

// ServicesApp
import ServicesApp from './pages/Web/ServicesApp/ServicesApp'

// WorkOrdersApp
import WorkOrdersApp from './pages/Web/WorkOrdersApp/WorkOrdersApp'

// EnterpriseApp
import EnterpriseApp from './pages/Web/EnterpriseApp/EnterpriseApp'

import TestDB from './pages/test-db'
import CertificatesPage from './pages/Certificates/CertificatesPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/test-db" element={<TestDB />} />

        <Route path="/landing" element={<LandingPage />} />

        <Route path="/weather" element={<WeatherApp />} />

        <Route path="/dashboard" element={<DashboardApp />} />

        <Route path="/blog/*" element={<BlogApp />} />
        
        <Route path="/bookings" element={<BookingsApp />} />

        <Route path="/facturacion" element={<FacturacionApp />} />

        <Route path="/shop/*" element={<ShopApp />} />

        <Route path="/courses/*" element={<CoursesApp />} />

        <Route path="/inventory/*" element={<InventoryApp />} />

        <Route path="/hr" element={<HRApp />} />

        <Route path="/services-portal" element={<ServicesApp />} />

        <Route path="/work-orders" element={<WorkOrdersApp />} />

        <Route path="/enterprise" element={<EnterpriseApp />} />

        {/* Páginas del portafolio CON Layout */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout>
            <Projects />
          </Layout>
        } />
        <Route path="/technologies" element={
          <Layout>
            <Technologies />
          </Layout>
        } />
        <Route path="/experience" element={
          <Layout>
            <Experience />
          </Layout>
        } />
        <Route path="/certificates" element={
          <Layout>
            <CertificatesPage />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App