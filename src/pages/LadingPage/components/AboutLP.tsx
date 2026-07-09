    import { useEffect, useState, useRef } from 'react'
    import styles from '../../LadingPage/css/AboutLP.module.css'

    const AboutLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const [counters, setCounters] = useState({ experience: 0, projects: 0, clients: 0 })
    const animationStarted = useRef(false)

    // ✅ Función declarada ANTES de usarse
    const animateCounters = () => {
        const duration = 2000
        const steps = 60
        const interval = duration / steps
        
        let step = 0
        const timer = setInterval(() => {
        step++
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        
        setCounters({
            experience: Math.round(5 * eased),
            projects: Math.round(150 * eased),
            clients: Math.round(50 * eased),
        })
        
        if (step >= steps) {
            clearInterval(timer)
            setCounters({ experience: 5, projects: 150, clients: 50 })
        }
        }, interval)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted.current) {
                animationStarted.current = true
                setIsVisible(true)
                animateCounters()
            }
            })
        },
        { threshold: 0.2 }
        )

        if (sectionRef.current) {
        observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const stats = [
        { number: counters.experience, suffix: '+', label: 'Años de experiencia' },
        { number: counters.projects, suffix: '+', label: 'Proyectos entregados' },
        { number: counters.clients, suffix: '+', label: 'Clientes satisfechos' },
    ]

    const values = [
        {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
            </svg>
        ),
        title: 'Misión',
        desc: 'Impulsar la transformación digital de empresas mediante soluciones tecnológicas innovadoras y de calidad.',
        },
        {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
            </svg>
        ),
        title: 'Visión',
        desc: 'Ser líderes en desarrollo de software, reconocidos por nuestra calidad, innovación y compromiso.',
        },
        {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        ),
        title: 'Valores',
        desc: 'Compromiso, transparencia e innovación son los pilares que guían cada uno de nuestros proyectos.',
        },
    ]

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb}></div>
            <div className={styles.bgGrid}></div>
        </div>

        <div className={styles.container}>
            <div className={styles.grid}>
            {/* Columna izquierda - Imagen/Estadísticas */}
            <div className={`${styles.visualColumn} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                    <div className={styles.imageContent}>
                    <div className={styles.floatingIcon1}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                        </svg>
                    </div>
                    <div className={styles.floatingIcon2}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                        <line x1="7" y1="2" x2="7" y2="22"/>
                        <line x1="17" y1="2" x2="17" y2="22"/>
                        </svg>
                    </div>
                    <div className={styles.centerIcon}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    </div>
                </div>
                
                <div className={styles.experienceBadge}>
                    <div className={styles.badgeIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    </div>
                    <span className={styles.expNumber}>5+</span>
                    <span className={styles.expLabel}>Años de experiencia</span>
                </div>
                </div>

                <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                    <span className={styles.statNumber}>
                        {stat.number}{stat.suffix}
                    </span>
                    <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Columna derecha - Contenido */}
            <div className={`${styles.contentColumn} ${isVisible ? styles.visible : ''}`}>
                <span className={styles.label}>Sobre Nosotros</span>
                <h2 className={styles.title}>
                Expertos en tecnología con pasión por{' '}
                <span className={styles.highlight}>innovar</span>
                </h2>
                
                <div className={styles.textContent}>
                <p className={styles.text}>
                    Somos un equipo de desarrolladores apasionados por crear soluciones 
                    tecnológicas que marcan la diferencia. Con más de 5 años de experiencia 
                    en el mercado, hemos ayudado a empresas de todos los tamaños a alcanzar 
                    sus objetivos digitales.
                </p>
                <p className={styles.text}>
                    Nuestro enfoque se centra en entender las necesidades únicas de cada 
                    cliente para ofrecer soluciones personalizadas que generan resultados 
                    reales y medibles.
                </p>
                </div>

                <div className={styles.values}>
                {values.map((item, index) => (
                    <div 
                    key={item.title} 
                    className={styles.valueCard}
                    style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                    >
                    <div className={styles.valueIcon}>
                        {item.icon}
                    </div>
                    <div className={styles.valueContent}>
                        <h4 className={styles.valueTitle}>{item.title}</h4>
                        <p className={styles.valueDesc}>{item.desc}</p>
                    </div>
                    </div>
                ))}
                </div>

                <button 
                className={styles.ctaBtn}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                Conoce más sobre nosotros
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
                </button>
            </div>
            </div>
        </div>
        </section>
    )
    }

    export default AboutLP