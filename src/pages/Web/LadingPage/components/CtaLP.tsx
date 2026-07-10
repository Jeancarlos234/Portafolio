    import { useEffect, useState, useRef } from 'react'
    import styles from '../../LadingPage/css/CtaLP.module.css'

    const CtaLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
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
        { threshold: 0.3 }
        )

        if (sectionRef.current) {
        observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15
        const y = (e.clientY / window.innerHeight - 0.5) * 15
        setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className={styles.cta} ref={sectionRef}>
        {/* Partículas */}
        <div className={styles.particles}>
            {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className={styles.particle}
                style={{
                left: `${10 + i * 11}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${4 + i * 0.5}s`,
                }}
            />
            ))}
        </div>

        {/* Orbes de fondo */}
        <div className={styles.bgOrb1}></div>
        <div className={styles.bgOrb2}></div>
        <div className={styles.bgOrb3}></div>

        {/* Grid pattern */}
        <div className={styles.gridPattern}></div>
        
        <div className={styles.container}>
            <div 
            className={`${styles.content} ${isVisible ? styles.visible : ''}`}
            style={{
                transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
            }}
            >
            <div className={styles.iconWrapper}>
                <div className={styles.iconGlow}></div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
            </div>

            <h2 className={styles.title}>
                ¿Listo para transformar tu idea en{' '}
                <span className={styles.highlight}>realidad</span>?
            </h2>
            
            <p className={styles.text}>
                No esperes más. Contáctanos hoy y descubre cómo podemos ayudarte 
                a alcanzar tus objetivos digitales con soluciones a medida que 
                impulsan resultados reales.
            </p>
            
            <div className={styles.buttons}>
                <button onClick={() => scrollTo('contact')} className={styles.primaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                Solicitar consultoría gratis
                <span className={styles.btnArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </span>
                </button>
                <button onClick={() => scrollTo('portfolio')} className={styles.secondaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Ver proyectos
                </button>
            </div>

            <div className={styles.trust}>
                <div className={styles.avatars}>
                <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>CG</div>
                <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>ML</div>
                <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)' }}>AM</div>
                <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #6d28d9, #5b21b6)' }}>RS</div>
                <div className={styles.avatarMore}>+16</div>
                </div>
                <div className={styles.trustInfo}>
                <p className={styles.trustText}>
                    <strong>50+ clientes</strong> confían en nosotros
                </p>
                <div className={styles.trustStars}>
                    {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    ))}
                    <span className={styles.trustRating}>4.9/5</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
    }

    export default CtaLP