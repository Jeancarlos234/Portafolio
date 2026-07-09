    import { useEffect, useState, useRef } from 'react'
    import styles from '../../LadingPage/css/ServicesLP.module.css'

    const ServicesLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true)
            }
            })
        },
        { threshold: 0.1 }
        )

        if (sectionRef.current) {
        observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const services = [
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
        title: 'Desarrollo Web',
        description: 'Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',
        features: ['React/Next.js', 'E-commerce', 'Landing Pages', 'Web Apps'],
        gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
        ),
        title: 'Apps Móviles',
        description: 'Aplicaciones nativas e híbridas para iOS y Android con experiencias fluidas.',
        features: ['React Native', 'Flutter', 'iOS', 'Android'],
        gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
        ),
        title: 'Backend & APIs',
        description: 'Infraestructura robusta y escalable para soportar el crecimiento de tu negocio.',
        features: ['Node.js', 'Python', 'REST', 'GraphQL'],
        gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        ),
        title: 'E-commerce',
        description: 'Tiendas online completas con pasarelas de pago y gestión de inventario.',
        features: ['Carrito', 'Pagos', 'Inventario', 'Admin'],
        gradient: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        ),
        title: 'Bases de Datos',
        description: 'Diseño y optimización de bases de datos para máximo rendimiento.',
        features: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
        gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        ),
        title: 'Seguridad',
        description: 'Protección de datos y cumplimiento de normativas de seguridad.',
        features: ['SSL', 'Autenticación', 'Backups', 'Monitorización'],
        gradient: 'linear-gradient(135deg, #6d28d9, #5b21b6)',
        },
    ]

    return (
        <section id="services" className={styles.services} ref={sectionRef}>
        {/* Fondo decorativo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb1}></div>
            <div className={styles.bgOrb2}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>Servicios</span>
            <h2 className={styles.title}>Soluciones completas para tu negocio</h2>
            <p className={styles.subtitle}>
                Ofrecemos servicios de desarrollo de software a medida para empresas 
                que buscan innovar y crecer en el mundo digital.
            </p>
            </div>

            <div className={styles.grid}>
            {services.map((service, index) => (
                <div 
                key={index} 
                className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--card-gradient': service.gradient 
                } as React.CSSProperties}
                >
                <div className={styles.cardGlow}></div>
                <div className={styles.cardContent}>
                    <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                        {service.icon}
                    </div>
                    <div className={styles.iconBadge}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    </div>
                    
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.description}</p>
                    
                    <div className={styles.cardDivider}></div>
                    
                    <div className={styles.tags}>
                    {service.features.map((f) => (
                        <span key={f} className={styles.tag}>{f}</span>
                    ))}
                    </div>
                </div>
                
                <div className={styles.cardNumber}>
                    {(index + 1).toString().padStart(2, '0')}
                </div>
                </div>
            ))}
            </div>

            {/* CTA inferior */}
            <div className={`${styles.bottomCta} ${isVisible ? styles.visible : ''}`}>
            <p className={styles.ctaText}>
                ¿Necesitas un servicio personalizado?
            </p>
            <button 
                className={styles.ctaBtn}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
                Solicitar consultoría
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
                </svg>
            </button>
            </div>
        </div>
        </section>
    )
    }

    export default ServicesLP