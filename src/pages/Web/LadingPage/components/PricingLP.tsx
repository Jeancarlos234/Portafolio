    import { useEffect, useState, useRef } from 'react'
    import styles from '../../LadingPage/css/PricingLP.module.css'

    const PricingLP = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
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

    const plans = [
        {
        name: 'Básico',
        price: '499',
        period: '/mes',
        description: 'Perfecto para pequeños negocios que quieren presencia online.',
        features: [
            'Landing Page de 5 secciones',
            'Formulario de contacto',
            'Diseño responsive',
            'Optimización SEO básica',
            'Hosting incluido',
            'Soporte por email',
        ],
        highlighted: false,
        cta: 'Comenzar',
        gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
        },
        {
        name: 'Profesional',
        price: '999',
        period: '/mes',
        description: 'Ideal para empresas que buscan crecer digitalmente.',
        features: [
            'Sitio web completo',
            'Panel administrativo',
            'E-commerce básico',
            'Blog integrado',
            'SEO avanzado',
            'Soporte prioritario',
            'Actualizaciones mensuales',
            'Analytics integrado',
        ],
        highlighted: true,
        cta: 'Elegir plan',
        gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        },
        {
        name: 'Empresarial',
        price: '1,999',
        period: '/mes',
        description: 'Para organizaciones con necesidades complejas.',
        features: [
            'Aplicación web completa',
            'App móvil incluida',
            'E-commerce avanzado',
            'API personalizada',
            'Infraestructura cloud',
            'Soporte 24/7',
            'Consultoría mensual',
            'Desarrollo a medida',
            'Mantenimiento continuo',
        ],
        highlighted: false,
        cta: 'Contactar',
        gradient: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
        },
    ]

    return (
        <section id="pricing" className={styles.pricing} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb1}></div>
            <div className={styles.bgOrb2}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>Planes</span>
            <h2 className={styles.title}>Inversión transparente, resultados extraordinarios</h2>
            <p className={styles.subtitle}>
                Elige el plan que mejor se adapte a tus necesidades. Siempre puedes escalar cuando lo necesites.
            </p>
            </div>

            <div className={styles.grid}>
            {plans.map((plan, index) => (
                <div 
                key={plan.name} 
                className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                >
                {plan.highlighted && (
                    <div className={styles.popularBadge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Más popular
                    </div>
                )}
                
                <div className={styles.cardGlow} style={{ background: plan.gradient }}></div>
                
                <div className={styles.cardContent}>
                    <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    {plan.highlighted && (
                        <span className={styles.recommended}>Recomendado</span>
                    )}
                    </div>

                    <div className={styles.priceWrapper}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>
                        {hoveredPlan === index ? plan.price : plan.price}
                    </span>
                    <span className={styles.period}>{plan.period}</span>
                    </div>
                    
                    <p className={styles.planDesc}>{plan.description}</p>
                    
                    <div className={styles.divider}></div>
                    
                    <ul className={styles.features}>
                    {plan.features.map((feature, i) => (
                        <li key={i} className={styles.feature}>
                        <span className={styles.featureIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </span>
                        {feature}
                        </li>
                    ))}
                    </ul>

                    <button 
                    className={`${styles.cta} ${plan.highlighted ? styles.ctaHighlighted : ''}`}
                    style={plan.highlighted ? { background: plan.gradient } : {}}
                    >
                    {plan.cta}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>

            {/* Garantía */}
            <div className={`${styles.guarantee} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.guaranteeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
            </div>
            <p className={styles.guaranteeText}>
                <strong>Garantía de 30 días</strong> - Si no estás satisfecho, te devolvemos tu dinero sin preguntas.
            </p>
            </div>
        </div>
        </section>
    )
    }

    export default PricingLP