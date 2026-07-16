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

import TestDB from './pages/test-db'
import CertificatesPage from './pages/Certificates/CertificatesPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/test-db" element={<TestDB />} />

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