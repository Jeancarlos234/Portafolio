    import { useEffect, useState, useRef, useCallback } from 'react'
    import styles from '../../LadingPage/css/TestimonialsLP.module.css'

    const TestimonialsLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const testimonials = [
        {
        name: 'Carlos García',
        role: 'CEO, TechStart',
        text: 'Transformaron completamente nuestra presencia digital. El sitio web superó todas nuestras expectativas en diseño y funcionalidad.',
        rating: 5,
        initials: 'CG',
        color: '#7c3aed',
        company: 'TechStart Inc.',
        },
        {
        name: 'María López',
        role: 'Directora, InnovaCorp',
        text: 'La aplicación móvil que desarrollaron aumentó nuestras ventas en un 40%. Profesionales, eficientes y siempre atentos a nuestras necesidades.',
        rating: 5,
        initials: 'ML',
        color: '#8b5cf6',
        company: 'InnovaCorp',
        },
        {
        name: 'Ana Martínez',
        role: 'Gerente, DataPro',
        text: 'Excelente trabajo en nuestro sistema de gestión. Cumplieron con los plazos y el presupuesto. Sin duda los recomendamos.',
        rating: 5,
        initials: 'AM',
        color: '#6d28d9',
        company: 'DataPro Solutions',
        },
        {
        name: 'Roberto Sánchez',
        role: 'Fundador, DigitalHub',
        text: 'El equipo entendió perfectamente nuestra visión y la transformó en un producto increíble. Comunicación excelente durante todo el proceso.',
        rating: 5,
        initials: 'RS',
        color: '#a78bfa',
        company: 'DigitalHub',
        },
        {
        name: 'Laura Fernández',
        role: 'CTO, CloudTech',
        text: 'Migraron nuestra infraestructura a la nube sin tiempo de inactividad. Un trabajo impecable y muy profesional.',
        rating: 5,
        initials: 'LF',
        color: '#7c3aed',
        company: 'CloudTech',
        },
        {
        name: 'Diego Ramírez',
        role: 'Product Manager, StartApp',
        text: 'El MVP que desarrollaron nos ayudó a conseguir nuestra primera ronda de inversión. Rápidos, eficientes y gran calidad.',
        rating: 5,
        initials: 'DR',
        color: '#8b5cf6',
        company: 'StartApp',
        },
        {
        name: 'Patricia Herrera',
        role: 'CEO, EcoMarket',
        text: 'Nuestra tienda online pasó de 0 a 1000 ventas mensuales gracias a su excelente trabajo en UX y rendimiento.',
        rating: 5,
        initials: 'PH',
        color: '#6d28d9',
        company: 'EcoMarket',
        },
        {
        name: 'Javier Morales',
        role: 'Director IT, FinServ',
        text: 'Sistema de gestión financiera robusto y seguro. Cumplieron con todas las normativas y estándares de seguridad.',
        rating: 5,
        initials: 'JM',
        color: '#a78bfa',
        company: 'FinServ',
        },
    ]

    const totalTestimonials = testimonials.length
    const visibleCount = 3

    // ✅ Funciones declaradas ANTES de usarse
    const handleNext = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev + 1) % totalTestimonials)
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, totalTestimonials])

    const handlePrev = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials)
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, totalTestimonials])

    // Auto-rotación
    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
        handleNext()
        }, 4000)
        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [handleNext])

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

    const handleDotClick = (index: number) => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex(index)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    // Obtener testimonios visibles
    const getVisibleTestimonials = () => {
        const result = []
        for (let i = 0; i < visibleCount; i++) {
        const index = (currentIndex + i) % totalTestimonials
        result.push({ ...testimonials[index], position: i })
        }
        return result
    }

    const stats = [
        { number: '98%', label: 'Clientes satisfechos' },
        { number: '4.9/5', label: 'Calificación promedio' },
        { number: '50+', label: 'Reseñas positivas' },
    ]

    return (
        <section className={styles.testimonials} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>Testimonios</span>
            <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
            <p className={styles.subtitle}>
                La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            </p>
            </div>

            {/* Stats superiores */}
            <div className={`${styles.statsGrid} ${isVisible ? styles.visible : ''}`}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                </div>
            ))}
            </div>

            {/* Carrusel */}
            <div className={`${styles.carousel} ${isVisible ? styles.visible : ''}`}>
            {/* Botón anterior */}
            <button 
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={handlePrev}
                aria-label="Testimonio anterior"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
                </svg>
            </button>

            {/* Testimonios visibles */}
            <div className={styles.carouselTrack}>
                {getVisibleTestimonials().map((testimonial) => (
                <div 
                    key={`${testimonial.name}-${testimonial.position}`}
                    className={styles.card}
                    style={{ '--card-color': testimonial.color } as React.CSSProperties}
                >
                    <div className={styles.cardGlow}></div>
                    
                    <div className={styles.quoteIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.08">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    </div>

                    <div className={styles.cardContent}>
                    <div className={styles.stars}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        ))}
                    </div>
                    
                    <p className={styles.text}>"{testimonial.text}"</p>
                    
                    <div className={styles.divider} style={{ background: testimonial.color }}></div>
                    
                    <div className={styles.author}>
                        <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}dd)` }}>
                        {testimonial.initials}
                        </div>
                        <div className={styles.authorInfo}>
                        <div className={styles.name}>{testimonial.name}</div>
                        <div className={styles.role}>{testimonial.role}</div>
                        <div className={styles.company}>{testimonial.company}</div>
                        </div>
                        <div className={styles.verifiedBadge}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Botón siguiente */}
            <button 
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={handleNext}
                aria-label="Testimonio siguiente"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
            </div>

            {/* Dots indicadores */}
            <div className={styles.dots}>
            {testimonials.map((_, index) => (
                <button
                key={index}
                className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
                />
            ))}
            </div>

            {/* Botón para dejar reseña */}
            <div className={`${styles.bottomCta} ${isVisible ? styles.visible : ''}`}>
            <button className={styles.ctaBtn}>
                Dejar una reseña
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
            </button>
            </div>
        </div>
        </section>
    )
    }

    export default TestimonialsLP