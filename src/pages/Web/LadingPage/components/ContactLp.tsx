    import type { FormEvent } from 'react'
    import { useState, useEffect, useRef } from 'react'
    import styles from '../../LadingPage/css/ContactLP.module.css'

    const ContactLP = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        
        // Simular envío
        try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
        } catch {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const contactDetails = [
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
            </svg>
        ),
        label: 'Email',
        value: 'contacto@techcorp.com',
        href: 'mailto:contacto@techcorp.com',
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        ),
        label: 'Teléfono',
        value: '+34 900 000 000',
        href: 'tel:+34900000000',
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
            </svg>
        ),
        label: 'Oficina',
        value: 'Madrid, España',
        href: '#',
        },
    ]

    const socialLinks = [
        {
        name: 'GitHub',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
        },
        {
        name: 'LinkedIn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
        },
        {
        name: 'Twitter',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        ),
        },
    ]

    return (
        <section id="contact" className={styles.contact} ref={sectionRef}>
        {/* Decoración de fondo */}
        <div className={styles.bgDecoration}>
            <div className={styles.bgOrb}></div>
            <div className={styles.bgGrid}></div>
        </div>

        <div className={styles.container}>
            <div className={`${styles.headerContent} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.label}>Contacto</span>
            <h2 className={styles.title}>Hablemos de tu proyecto</h2>
            <p className={styles.subtitle}>
                Cuéntanos tu idea y te ayudaremos a hacerla realidad. 
                Respondemos en menos de 24 horas.
            </p>
            </div>

            <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
            {/* Información de contacto */}
            <div className={styles.infoColumn}>
                <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Información de contacto</h3>
                <p className={styles.infoText}>
                    Estamos disponibles para resolver tus dudas y ayudarte 
                    a encontrar la mejor solución para tu negocio.
                </p>

                <div className={styles.details}>
                    {contactDetails.map((item) => (
                    <a 
                        key={item.label} 
                        href={item.href}
                        className={styles.detailItem}
                    >
                        <div className={styles.detailIcon}>{item.icon}</div>
                        <div>
                        <div className={styles.detailLabel}>{item.label}</div>
                        <div className={styles.detailValue}>{item.value}</div>
                        </div>
                        <div className={styles.detailArrow}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                        </div>
                    </a>
                    ))}
                </div>

                {/* Redes sociales */}
                <div className={styles.socialSection}>
                    <h4 className={styles.socialTitle}>Síguenos</h4>
                    <div className={styles.socialLinks}>
                    {socialLinks.map((social) => (
                        <a 
                        key={social.name} 
                        href="#" 
                        className={styles.socialLink}
                        aria-label={social.name}
                        >
                        {social.icon}
                        </a>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Formulario */}
            <div className={styles.formColumn}>
                <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Envíanos un mensaje</h3>

                {/* Mensajes de estado */}
                {status === 'success' && (
                    <div className={styles.successMsg}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                    </div>
                )}
                
                {status === 'error' && (
                    <div className={styles.errorMsg}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Hubo un error. Intenta de nuevo.
                    </div>
                )}

                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre *</label>
                    <div className={styles.inputWrapper}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="Tu nombre completo"
                        />
                    </div>
                    </div>
                    <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email *</label>
                    <div className={styles.inputWrapper}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="tu@email.com"
                        />
                    </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Teléfono</label>
                    <div className={styles.inputWrapper}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+34 600 000 000"
                    />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Mensaje *</label>
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y plazo estimado..."
                    />
                </div>

                <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                    <>
                        <span className={styles.spinner}></span>
                        Enviando...
                    </>
                    ) : (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Enviar mensaje
                    </>
                    )}
                </button>
                </form>
            </div>
            </div>
        </div>
        </section>
    )
    }

    export default ContactLP