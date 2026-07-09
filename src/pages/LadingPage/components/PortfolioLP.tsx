    import { useState, useEffect, useRef } from 'react'
    import styles from '../../LadingPage/css/PortfolioLP.module.css'

    const PortfolioLP = () => {
    const [activeFilter, setActiveFilter] = useState('Todos')
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

    const projects = [
        {
        id: 1,
        title: 'E-commerce Moderno',
        category: 'Web',
        description: 'Tienda online completa con carrito, pagos y panel admin.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        color: '#7c3aed',
        },
        {
        id: 2,
        title: 'App de Delivery',
        category: 'Móvil',
        description: 'Aplicación de entregas con tracking en tiempo real.',
        technologies: ['Flutter', 'Firebase', 'Google Maps'],
        color: '#8b5cf6',
        },
        {
        id: 3,
        title: 'Dashboard Analytics',
        category: 'Web',
        description: 'Panel de control con métricas y gráficos interactivos.',
        technologies: ['React', 'TypeScript', 'Chart.js'],
        color: '#a78bfa',
        },
        {
        id: 4,
        title: 'API de Pagos',
        category: 'Backend',
        description: 'Microservicio de procesamiento de pagos multibanca.',
        technologies: ['Node.js', 'Express', 'PostgreSQL'],
        color: '#6d28d9',
        },
        {
        id: 5,
        title: 'App Fitness',
        category: 'Móvil',
        description: 'Aplicación de rutinas de ejercicios y seguimiento.',
        technologies: ['React Native', 'Firebase', 'HealthKit'],
        color: '#c4b5fd',
        },
        {
        id: 6,
        title: 'Sistema de Reservas',
        category: 'Web',
        description: 'Plataforma de reservas con calendario y notificaciones.',
        technologies: ['Laravel', 'Vue.js', 'MySQL'],
        color: '#5b21b6',
        },
    ]

    const categories = ['Todos', 'Web', 'Móvil', 'Backend']
    
    const filteredProjects = activeFilter === 'Todos' 
        ? projects 
        : projects.filter(p => p.category === activeFilter)

    const getCategoryIcon = (category: string) => {
        switch (category) {
        case 'Web':
            return (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            )
        case 'Móvil':
            return (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            )
        case 'Backend':
            return (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/>
                <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
            )
        default:
            return null
        }
    }

    return (
        <section id="portfolio" className={styles.portfolio} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>Portafolio</span>
            <h2 className={styles.title}>Proyectos que hablan por sí solos</h2>
            <p className={styles.subtitle}>
                Cada proyecto es una historia de éxito. Conoce algunos de nuestros trabajos más destacados.
            </p>
            </div>

            <div className={`${styles.filters} ${isVisible ? styles.visible : ''}`}>
            {categories.map((cat) => (
                <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
                onClick={() => setActiveFilter(cat)}
                >
                {cat !== 'Todos' && (
                    <span className={styles.filterIcon}>
                    {getCategoryIcon(cat)}
                    </span>
                )}
                {cat}
                </button>
            ))}
            </div>

            <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
                <div 
                key={project.id} 
                className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                style={{ 
                    animationDelay: `${index * 0.12}s`,
                    '--project-color': project.color 
                } as React.CSSProperties}
                >
                <div className={styles.cardGlow}></div>
                
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon} style={{ backgroundColor: `${project.color}12` }}>
                    {getCategoryIcon(project.category)}
                    </div>
                    <div className={styles.cardBadges}>
                    <span className={styles.cardCategory} style={{ color: project.color, background: `${project.color}15` }}>
                        {project.category}
                    </span>
                    <span className={styles.cardNumber}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    </div>
                </div>
                
                <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                    
                    <div className={styles.cardDivider} style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}></div>
                    
                    <div className={styles.cardTags}>
                    {project.technologies.map((tech) => (
                        <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                    </div>
                </div>
                
                <div className={styles.cardFooter}>
                    <button className={styles.demoBtn} style={{ color: project.color }}>
                    Ver proyecto
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>

            {/* CTA inferior */}
            <div className={`${styles.bottomCta} ${isVisible ? styles.visible : ''}`}>
            <p className={styles.ctaText}>¿Quieres ver más proyectos?</p>
            <button className={styles.ctaBtn}>
                Ver portafolio completo
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

    export default PortfolioLP