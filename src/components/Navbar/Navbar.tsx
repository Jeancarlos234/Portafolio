    import { useState, useEffect } from 'react'
    import { Link, NavLink, useLocation } from 'react-router-dom'
    import styles from '../../css/Navbar.module.css'

    const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const navItems = [
        { 
        label: 'Inicio', 
        path: '/',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
        )
        },
        { 
        label: 'Sobre mí', 
        path: '/about',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
            </svg>
        )
        },
        { 
        label: 'Proyectos', 
        path: '/projects',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        )
        },
        { 
        label: 'Tecnologías', 
        path: '/technologies',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        label: 'Experiencia', 
        path: '/experience',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
        )
        },
        // ✅ NUEVO: Certificaciones
        { 
        label: 'Certificaciones', 
        path: '/certificates',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        )
        },
        { 
        label: 'Contacto', 
        path: '/contact',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
            </svg>
        )
        },
    ]

    const hideNavbarRoutes = ['/login', '/admin']
    if (hideNavbarRoutes.includes(location.pathname)) {
        return null
    }

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <nav className={styles.navbar}>
            <div className={styles.container}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.logoIcon}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={styles.logoText}>
                <span className={styles.logoHighlight}>Dev</span>Portfolio
                </span>
            </Link>
            
            <button 
                className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label="Menú de navegación"
                aria-expanded={isMenuOpen}
            >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
            </button>

            <div className={`${styles.navOverlay} ${isMenuOpen ? styles.visible : ''}`} onClick={closeMenu}></div>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
                {navItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                    <NavLink 
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) => 
                        `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                    }
                    >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    </NavLink>
                </li>
                ))}
                <li className={styles.navItem}>
                <a 
                    href="/pdf/CV.pdf" 
                    className={styles.cvButton}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    CV
                </a>
                </li>
            </ul>
            </div>
        </nav>
        </header>
    )
    }

    export default Navbar