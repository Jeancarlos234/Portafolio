    import { useState, useEffect } from 'react'
    import { Link } from 'react-router-dom'
    import styles from '../../LadingPage/css/NavbarLP.module.css'

    const NavbarLP = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
        
        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => {
            const sectionTop = (section as HTMLElement).offsetTop - 100
            if (window.scrollY >= sectionTop) {
            setActiveSection(section.id)
            }
        })
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
        const offset = 70
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
        setIsMenuOpen(false)
        }
    }

    const navLinks = [
        { label: 'Inicio', id: 'hero' },
        { label: 'Servicios', id: 'services' },
        { label: 'Nosotros', id: 'about' },
        { label: 'Portafolio', id: 'portfolio' },
        { label: 'Planes', id: 'pricing' },
        { label: 'FAQ', id: 'faq' },
        { label: 'Contacto', id: 'contact' },
    ]

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
            <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} 
            className={styles.logo}
            >
            <span className={styles.logoIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <line x1="12" y1="22" x2="12" y2="15.5"/>
                <polyline points="22 8.5 12 15.5 2 8.5"/>
                </svg>
            </span>
            <span className={styles.logoText}>
                Tech<span className={styles.highlight}>Corp</span>
            </span>
            </a>

            <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú de navegación"
            >
            <span></span>
            <span></span>
            <span></span>
            </button>

            <div 
            className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
            onClick={() => setIsMenuOpen(false)}
            ></div>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
            {navLinks.map((link) => (
                <li key={link.id}>
                <a 
                    href={`#${link.id}`} 
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                    className={`${styles.navLink} ${activeSection === link.id ? styles.activeLink : ''}`}
                >
                    {link.label}
                    {activeSection === link.id && (
                    <span className={styles.activeDot}></span>
                    )}
                </a>
                </li>
            ))}
            
            {/* Botón para regresar al portafolio */}
            <li className={styles.backItem}>
                <Link to="/projects" className={styles.backBtn} onClick={() => setIsMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Portafolio AntaresJB
                </Link>
            </li>
            
            <li className={styles.ctaItem}>
                <button onClick={() => scrollTo('contact')} className={styles.ctaBtn}>
                <span className={styles.ctaText}>Cotizar</span>
                <span className={styles.ctaIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </span>
                </button>
            </li>
            </ul>
        </div>
        </nav>
    )
    }

    export default NavbarLP