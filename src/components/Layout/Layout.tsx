    import type { ReactNode } from 'react'
    import Navbar from '../Navbar/Navbar'
    import Footer from '../Footer/Footer'

    interface LayoutProps {
    children: ReactNode
    }

    const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="app">
        <Navbar />
        <main className="main-content">
            {children}
        </main>
        <Footer />
        </div>
    )
    }

    export default Layout