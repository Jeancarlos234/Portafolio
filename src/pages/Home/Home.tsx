    import { Link } from 'react-router-dom'
    import { useEffect, useState, useRef, useMemo } from 'react'
    import styles from '../../css/Home.module.css'

    const Home = () => {
    const [typedText, setTypedText] = useState('')
    const fullText = 'Desarrollador Full Stack'
    const [textIndex, setTextIndex] = useState(0)
    const [animatedStats, setAnimatedStats] = useState(false)
    const [counters, setCounters] = useState([0, 0, 0, 0])
    const statsRef = useRef<HTMLDivElement>(null)
    const animationStarted = useRef(false)

    // Efecto de escritura
    useEffect(() => {
        if (textIndex < fullText.length) {
        const timeout = setTimeout(() => {
            setTypedText(prev => prev + fullText[textIndex])
            setTextIndex(prev => prev + 1)
        }, 80)
        return () => clearTimeout(timeout)
        }
    }, [textIndex, fullText])

    // Generar partículas de forma memoizada
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: (i * 5.3) % 100 + (i % 3) * 1.5,
        animationDelay: (i * 0.3) % 5,
        animationDuration: 3 + (i % 4),
        width: 2 + (i % 4),
        height: 2 + (i % 5),
        }))
    }, [])

    // Función de animación de contadores (declarada antes de usarse)
    const animateCounters = () => {
        const finalValues = [3, 50, 15, 100]
        const duration = 2000
        const steps = 60
        const interval = duration / steps
        
        let currentStep = 0
        
        const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        
        setCounters(finalValues.map(val => Math.round(val * easedProgress)))
        
        if (currentStep >= steps) {
            clearInterval(timer)
            setCounters(finalValues)
        }
        }, interval)
    }

    // Observer para animar estadísticas cuando son visibles
    useEffect(() => {
        const currentRef = statsRef.current
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted.current) {
                animationStarted.current = true
                setAnimatedStats(true)
                animateCounters()
            }
            })
        },
        { threshold: 0.3 }
        )

        if (currentRef) {
        observer.observe(currentRef)
        }

        return () => {
        if (currentRef) {
            observer.unobserve(currentRef)
        }
        }
    }, [])

    const stats = [
        { number: counters[0], label: 'Años de experiencia', suffix: '+', icon: '💫' },
        { number: counters[1], label: 'Proyectos completados', suffix: '+', icon: '🚀' },
        { number: counters[2], label: 'Tecnologías dominadas', suffix: '+', icon: '⚡' },
        { number: counters[3], label: 'Compromiso con la calidad', suffix: '%', icon: '✨' },
    ]

    const services = [
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        title: 'Desarrollo Frontend',
        description: 'Interfaces modernas, responsivas y de alto rendimiento con las últimas tecnologías.',
        tags: ['React', 'TypeScript', 'Next.js', 'Tailwind']
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
        title: 'Desarrollo Backend',
        description: 'APIs robustas, escalables y seguras con arquitecturas modernas.',
        tags: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB']
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
        title: 'Aplicaciones Web',
        description: 'Apps completas, progresivas y de alto impacto desde cero a producción.',
        tags: ['React', 'Node.js', 'AWS', 'Docker']
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
        ),
        title: 'Aplicaciones Móviles',
        description: 'Apps nativas e híbridas para iOS y Android con experiencias fluidas.',
        tags: ['React Native', 'Flutter', 'Expo', 'Firebase']
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
        title: 'Software a Medida',
        description: 'Soluciones personalizadas que se adaptan exactamente a tu negocio.',
        tags: ['C#', '.NET', 'Python', 'Electron']
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" y1="22" x2="12" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
            </svg>
        ),
        title: 'APIs y Microservicios',
        description: 'Diseño de APIs RESTful y GraphQL con arquitecturas escalables.',
        tags: ['GraphQL', 'REST', 'Docker', 'Kubernetes']
        }
    ]

    return (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
            <div className={styles.gradientOverlay}></div>
            <div className={styles.gridPattern}></div>
            <div className={styles.particlesContainer}>
                {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={styles.particle}
                    style={{
                    left: `${particle.left}%`,
                    animationDelay: `${particle.animationDelay}s`,
                    animationDuration: `${particle.animationDuration}s`,
                    width: `${particle.width}px`,
                    height: `${particle.height}px`,
                    }}
                />
                ))}
            </div>
            </div>
            
            <div className={styles.heroContent}>
            <div className={styles.heroText}>
                <div className={styles.availability}>
                <span className={styles.statusDot}></span>
                Disponible para proyectos
                </div>
                
                <h1 className={styles.title}>
                Hola, soy{' '}
                <span className={styles.highlight}>AntaresJB</span>
                </h1>
                
                <div className={styles.typingContainer}>
                <span className={styles.typingText}>{typedText}</span>
                <span className={styles.cursor}>|</span>
                </div>
                
                <p className={styles.description}>
                Desarrollo soluciones digitales completas: Frontend, Backend, aplicaciones web, 
                aplicaciones móviles, software a medida y más. Combino diseño limpio con código 
                eficiente para crear experiencias únicas, modernas y escalables.
                </p>
                
                <div className={styles.servicesStrip}>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                    </svg>
                    Frontend
                </div>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    </svg>
                    Backend
                </div>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    </svg>
                    Apps Web
                </div>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                    Apps Móviles
                </div>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    </svg>
                    Software
                </div>
                <div className={styles.servicePill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                    </svg>
                    APIs
                </div>
                </div>
                
                <div className={styles.ctaButtons}>
                <Link to="/projects" className={styles.primaryButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    Ver proyectos
                </Link>
                <Link to="/contact" className={styles.secondaryButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contactar
                </Link>
                </div>
            </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats} ref={statsRef}>
            <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
                <div 
                key={index} 
                className={`${styles.statCard} ${animatedStats ? styles.animated : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                >
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statNumber}>
                    {stat.number}
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
                </div>
            ))}
            </div>
        </section>

        {/* Services Section */}
        <section className={styles.services}>
            <div className={styles.servicesContainer}>
            <span className={styles.sectionLabel}>Servicios</span>
            <h2 className={styles.servicesTitle}>Soluciones completas de desarrollo</h2>
            <p className={styles.servicesSubtitle}>
                Desde el frontend hasta el backend, pasando por apps móviles y software a medida
            </p>
            
            <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                <div 
                    key={index} 
                    className={styles.serviceCard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className={styles.serviceCardInner}>
                    <div className={styles.serviceIconWrapper}>
                        <div className={styles.serviceIcon}>
                        {service.icon}
                        </div>
                        <div className={styles.serviceNumber}>0{index + 1}</div>
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <div className={styles.serviceTags}>
                        {service.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.serviceTag}>
                            {tag}
                        </span>
                        ))}
                    </div>
                    <div className={styles.serviceHoverEffect}></div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        </>
    )
    }

    export default Home