    import { useState } from 'react'
    import { Link, NavLink, useLocation } from 'react-router-dom'
    import styles from '../../css/Navbar.module.css'

    const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const navItems = [
        { label: '🏠 Home', path: '/' },
        { label: '👨‍💻 Sobre mí', path: '/about' },
        { label: '💼 Proyectos', path: '/projects' },
        { label: '🛠️ Tecnologías', path: '/technologies' },
        { label: '📄 Experiencia', path: '/experience' },
        { label: '📬 Contacto', path: '/contact' },
    ]

    // No mostrar el Navbar en ciertas rutas (opcional)
    const hideNavbarRoutes = ['/login', '/admin']
    if (hideNavbarRoutes.includes(location.pathname)) {
        return null
    }

    return (
        <nav className={styles.navbar}>
        <div className={styles.container}>
            <Link to="/" className={styles.logo}>
            Mi Portafolio
            </Link>
            
            <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Menú de navegación"
            >
            <span></span>
            <span></span>
            <span></span>
            </button>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
            {navItems.map((item) => (
                <li key={item.path}>
                <NavLink 
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                    }
                >
                    {item.label}
                </NavLink>
                </li>
            ))}
            </ul>
        </div>
        </nav>
    )
    }

    export default Navbar