    import { useEffect, useState, useRef } from 'react'
    import styles from '../../LadingPage/css/StatsLP.module.css'

    const StatsLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [counters, setCounters] = useState({
        projects: 0,
        clients: 0,
        experience: 0,
        satisfaction: 0,
    })
    const sectionRef = useRef<HTMLDivElement>(null)
    const animationStarted = useRef(false)

    // Función de animación declarada antes
    const animateCounters = () => {
        const finalValues = { projects: 150, clients: 50, experience: 5, satisfaction: 99 }
        const duration = 2000
        const steps = 60
        const interval = duration / steps
        
        let step = 0
        const timer = setInterval(() => {
        step++
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        
        setCounters({
            projects: Math.round(finalValues.projects * eased),
            clients: Math.round(finalValues.clients * eased),
            experience: Math.round(finalValues.experience * eased),
            satisfaction: Math.round(finalValues.satisfaction * eased),
        })
        
        if (step >= steps) {
            clearInterval(timer)
            setCounters(finalValues)
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
        { threshold: 0.3 }
        )

        if (sectionRef.current) {
        observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const stats = [
        {
        number: counters.projects,
        suffix: '+',
        label: 'Proyectos entregados',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
        },
        {
        number: counters.clients,
        suffix: '+',
        label: 'Clientes satisfechos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
        },
        {
        number: counters.experience,
        suffix: '+',
        label: 'Años de experiencia',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ),
        },
        {
        number: counters.satisfaction,
        suffix: '%',
        label: 'Tasa de satisfacción',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        ),
        },
    ]

    return (
        <section className={styles.stats} ref={sectionRef}>
        {/* Partículas decorativas */}
        <div className={styles.particles}>
            {[...Array(6)].map((_, i) => (
            <div
                key={i}
                className={styles.particle}
                style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
                }}
            />
            ))}
        </div>

        {/* Orbes de fondo */}
        <div className={styles.bgOrb1}></div>
        <div className={styles.bgOrb2}></div>

        <div className={styles.container}>
            <div className={styles.grid}>
            {stats.map((stat, index) => (
                <div 
                key={index} 
                className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                >
                <div className={styles.cardContent}>
                    <div className={styles.iconWrapper}>
                    {stat.icon}
                    </div>
                    
                    <div className={styles.numberWrapper}>
                    <span className={styles.number}>
                        {stat.number}
                    </span>
                    <span className={styles.suffix}>{stat.suffix}</span>
                    </div>
                    
                    <span className={styles.label}>{stat.label}</span>
                    
                    <div className={styles.divider}></div>
                </div>
                
                <div className={styles.cardGlow}></div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default StatsLP