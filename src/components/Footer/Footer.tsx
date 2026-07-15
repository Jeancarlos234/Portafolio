    import { Link } from 'react-router-dom'
    import styles from '../../css/Footer.module.css'

    const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        {
        title: 'Navegación',
        links: [
            { label: 'Inicio', path: '/' },
            { label: 'Sobre mí', path: '/about' },
            { label: 'Proyectos', path: '/projects' },
            { label: 'Tecnologías', path: '/technologies' },
            { label: 'Experiencia', path: '/experience' },
            { label: 'Certificaciones', path: '/certificates' },
            { label: 'Contacto', path: '/contact' },
        ]
        },
        {
        title: 'Servicios',
        links: [
            { label: 'Desarrollo Frontend', path: '/technologies' },
            { label: 'Desarrollo Backend', path: '/technologies' },
            { label: 'Aplicaciones Web', path: '/projects' },
            { label: 'Aplicaciones Móviles', path: '/projects' },
            { label: 'Software a Medida', path: '/projects' },
        ]
        },
        {
        title: 'Contacto',
        links: [
            { label: 'beltranposligua@gmail.com', path: 'mailto:beltranposligua@gmail.com' },
            { label: '+593 95 973 4932', path: 'tel:+593959734932' },
            { label: 'Guayaquil, Ecuador', path: '#', isStatic: true },
        ]
        }
    ]

    const socialLinks = [
        {
        label: 'GitHub',
        url: 'https://github.com/Jeancarlos234',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        )
        },
        {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/tuusuario',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
        },
        {
        label: 'Twitter',
        url: 'https://twitter.com/tuusuario',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        )
        }
    ]

    return (
        <footer className={styles.footer}>
        <div className={styles.footerTop}>
            <div className={styles.container}>
            <div className={styles.footerGrid}>
                {/* Brand Column */}
                <div className={styles.brandColumn}>
                <Link to="/" className={styles.footerLogo}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span className={styles.logoText}>
                    <span className={styles.logoHighlight}>Dev</span>Portfolio
                    </span>
                </Link>
                <p className={styles.brandDescription}>
                    Desarrollador Full Stack apasionado por crear soluciones digitales 
                    innovadoras y experiencias web excepcionales.
                </p>
                <div className={styles.socialLinks}>
                    {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={social.label}
                    >
                        {social.icon}
                    </a>
                    ))}
                </div>
                </div>

                {/* Links Columns */}
                {footerLinks.map((section) => (
                <div key={section.title} className={styles.linksColumn}>
                    <h3 className={styles.linksTitle}>{section.title}</h3>
                    <ul className={styles.linksList}>
                    {section.links.map((link) => (
                        <li key={link.label} className={styles.linksItem}>
                        {link.isStatic ? (
                            <span className={styles.staticLink}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {link.label}
                            </span>
                        ) : link.path.startsWith('mailto:') || link.path.startsWith('tel:') ? (
                            <a href={link.path} className={styles.footerLink}>
                            {link.path.startsWith('mailto:') ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            )}
                            {link.label}
                            </a>
                        ) : (
                            <Link to={link.path} className={styles.footerLink}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            {link.label}
                            </Link>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className={styles.footerBottom}>
            <div className={styles.container}>
            <div className={styles.footerBottomContent}>
                <p className={styles.copyright}>
                © {currentYear} <strong>AntaresJB</strong>. Todos los derechos reservados.
                </p>
                <div className={styles.footerBottomLinks}>
                <Link to="/" className={styles.bottomLink}>Inicio</Link>
                <span className={styles.separator}>•</span>
                <Link to="/contact" className={styles.bottomLink}>Contacto</Link>
                </div>
                <p className={styles.madeWith}>
                Desarrollado con 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.heartIcon}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                usando React, TypeScript y CSS Modules
                </p>
            </div>
            </div>
        </div>
        </footer>
    )
    }

    export default Footer