    import { useState, useEffect, useRef } from 'react'
    import styles from '../../LadingPage/css/FaqLP.module.css'

    const FaqLP = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
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

    const faqs = [
        {
        question: '¿Cuánto tiempo toma desarrollar un proyecto?',
        answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Una landing page puede estar lista en 3-5 días, mientras que una aplicación web completa puede tomar de 4 a 8 semanas. Te daremos un cronograma detallado antes de empezar.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
            </svg>
        ),
        },
        {
        question: '¿Ofrecen mantenimiento después del lanzamiento?',
        answer: 'Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, corrección de errores, backups y soporte técnico continuo para asegurar que tu proyecto funcione siempre al máximo.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        ),
        },
        {
        question: '¿Qué tecnologías utilizan?',
        answer: 'Trabajamos con tecnologías modernas como React, Next.js, Node.js, Python, Laravel para desarrollo web, y Flutter o React Native para aplicaciones móviles. Elegimos la mejor tecnología según las necesidades de tu proyecto.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        },
        {
        question: '¿Puedo solicitar cambios durante el desarrollo?',
        answer: 'Por supuesto. Utilizamos metodologías ágiles que permiten flexibilidad durante el desarrollo. Los cambios se evalúan y se ajustan al alcance del proyecto para asegurar que cumplimos con tus expectativas.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
        ),
        },
        {
        question: '¿Cómo aseguran la calidad del producto final?',
        answer: 'Implementamos pruebas automatizadas, revisiones de código, testing de usabilidad y un proceso de QA completo antes de cada entrega. Además, ofrecemos un período de garantía para cualquier ajuste post-lanzamiento.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        ),
        },
        {
        question: '¿Qué incluye el soporte técnico?',
        answer: 'Nuestro soporte incluye resolución de incidencias, actualizaciones de seguridad, monitoreo de rendimiento, backups regulares y asistencia técnica por email o chat. El nivel de soporte depende del plan contratado.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
        ),
        },
    ]

    return (
        <section id="faq" className={styles.faq} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>FAQ</span>
            <h2 className={styles.title}>Preguntas frecuentes</h2>
            <p className={styles.subtitle}>
                Respuestas a las dudas más comunes sobre nuestros servicios.
            </p>
            </div>

            <div className={`${styles.list} ${isVisible ? styles.visible : ''}`}>
            {faqs.map((faq, index) => (
                <div
                key={index}
                className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                >
                <button
                    className={styles.question}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    <div className={styles.questionContent}>
                    <div className={`${styles.questionIcon} ${openIndex === index ? styles.iconActive : ''}`}>
                        {faq.icon}
                    </div>
                    <span className={styles.questionText}>{faq.question}</span>
                    </div>
                    <div className={`${styles.arrowWrapper} ${openIndex === index ? styles.arrowActive : ''}`}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${styles.arrow} ${openIndex === index ? styles.rotated : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    </div>
                </button>
                <div className={`${styles.answer} ${openIndex === index ? styles.show : ''}`}>
                    <div className={styles.answerContent}>
                    <div className={styles.answerLine}></div>
                    <p>{faq.answer}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Contacto adicional */}
            <div className={`${styles.bottomHelp} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.helpIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
            </div>
            <p className={styles.helpText}>
                ¿No encuentras lo que buscas?{' '}
                <button 
                className={styles.helpLink}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                Contáctanos directamente
                </button>
            </p>
            </div>
        </div>
        </section>
    )
    }

    export default FaqLP