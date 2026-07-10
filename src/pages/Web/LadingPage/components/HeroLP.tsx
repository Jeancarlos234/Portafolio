    import { useEffect, useState, useMemo } from 'react'
    import styles from '../../LadingPage/css/HeroLP.module.css'

    const HeroLP = () => {
    const [typedText, setTypedText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const fullText = 'soluciones digitales'
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Generar partículas de forma memoizada para evitar Math.random() en render
    const particles = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: (i * 7.3) % 100,
        top: (i * 11.7) % 100,
        animationDelay: (i * 0.4) % 5,
        animationDuration: 3 + (i % 4),
        width: 2 + (i % 3),
        height: 2 + (i % 4),
        }))
    }, [])

    // Efecto de escritura
    useEffect(() => {
        if (textIndex < fullText.length) {
        const timeout = setTimeout(() => {
            setTypedText(prev => prev + fullText[textIndex])
            setTextIndex(prev => prev + 1)
        }, 80)
        return () => clearTimeout(timeout)
        }
    }, [textIndex])

    // Efecto parallax con mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    const stats = [
        { number: '150+', label: 'Proyectos', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        )},
        { number: '50+', label: 'Clientes', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        )},
        { number: '99%', label: 'Satisfacción', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        )},
        { number: '24/7', label: 'Soporte', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
        )},
    ]

    return (
        <section id="hero" className={styles.hero}>
        {/* Partículas de fondo - AHORA CON useMemo */}
        <div className={styles.particles}>
            {particles.map((particle) => (
            <div
                key={particle.id}
                className={styles.particle}
                style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                }}
            />
            ))}
        </div>

        {/* Orbes de gradiente */}
        <div className={styles.bgOrb1}></div>
        <div className={styles.bgOrb2}></div>
        <div className={styles.bgOrb3}></div>

        {/* Grid pattern */}
        <div className={styles.gridPattern}></div>
        
        <div 
            className={styles.content}
            style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`
            }}
        >
            <div className={styles.badge}>
            <span className={styles.dot}></span>
            <span className={styles.badgeText}>Transformamos ideas en soluciones digitales</span>
            </div>

            <h1 className={styles.title}>
            Creamos el{' '}
            <span className={styles.gradient}>futuro digital</span>
            <br />
            de tu empresa
            </h1>

            <div className={styles.typingWrapper}>
            <span className={styles.typingPrefix}>Especialistas en </span>
            <span className={styles.typingText}>{typedText}</span>
            <span className={styles.cursor}>|</span>
            </div>

            <p className={styles.subtitle}>
            Desarrollamos aplicaciones web y móviles a medida con las últimas tecnologías.
            Innovación, calidad y resultados que impulsan tu negocio al siguiente nivel.
            </p>

            <div className={styles.buttons}>
            <button onClick={() => scrollTo('services')} className={styles.primaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
                </svg>
                Nuestros Servicios
                <span className={styles.btnArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
                </span>
            </button>
            <button onClick={() => scrollTo('contact')} className={styles.secondaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contactar
            </button>
            </div>

            <div className={styles.stats}>
            {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default HeroLP