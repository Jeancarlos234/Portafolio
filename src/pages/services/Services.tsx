    import { useState } from 'react'
    import { Link } from 'react-router-dom'
    import styles from '../../css/Services.module.css'

    interface Service {
    id: number
    icon: React.ReactNode  
    title: string
    description: string
    price: string
    features: string[]
    popular: boolean
    deliveryTime: string
    }

    interface Platform {
    id: number
    name: string
    description: string
    logo: string
    url: string
    color: string
    }

    const Services = () => {
    const [activeTab, setActiveTab] = useState<'services' | 'products'>('services')

    const services: Service[] = [
        {
            id: 1,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
            ),
            title: 'Desarrollo Frontend',
            description: 'Interfaces modernas, responsivas y de alto rendimiento con React, Next.js y TypeScript.',
            price: 'Desde $600',
            features: ['Diseño responsivo', 'Optimización SEO', 'Animaciones fluidas', 'Código limpio y mantenible'],
            popular: false,
            deliveryTime: '2-4 semanas'
        },
        {
            id: 2,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/>
                <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
            ),
            title: 'Desarrollo Backend',
            description: 'APIs robustas y escalables con Node.js, Python, y bases de datos modernas.',
            price: 'Desde $700',
            features: ['API REST/GraphQL', 'Base de datos SQL/NoSQL', 'Autenticación JWT', 'Despliegue en la nube'],
            popular: false,
            deliveryTime: '3-5 semanas'
        },
        {
            id: 3,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            ),
            title: 'Aplicación Móvil',
            description: 'Apps nativas e híbridas para iOS y Android con React Native y Flutter.',
            price: 'Desde $1,000',
            features: ['iOS y Android', 'UI/UX nativo', 'Notificaciones push', 'Publicación en stores'],
            popular: false,
            deliveryTime: '4-7 semanas'
        },
        {
            id: 4,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            ),
            title: 'Aplicación Web Completa',
            description: 'Plataformas web completas con frontend, backend y base de datos integrados.',
            price: 'Desde $1,500',
            features: ['Frontend + Backend', 'Panel administrador', 'Pasarela de pagos', 'Escalabilidad'],
            popular: false,
            deliveryTime: '6-9 semanas'
        },
        {
            id: 5,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            ),
            title: 'Software a Medida',
            description: 'Soluciones personalizadas que se adaptan exactamente a las necesidades de tu negocio.',
            price: 'Desde $1,800',
            features: ['Análisis de requisitos', 'Arquitectura personalizada', 'Testing automatizado', 'Soporte continuo'],
            popular: false,
            deliveryTime: '8-12 semanas'
        },
        {
            id: 6,
            icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <line x1="12" y1="22" x2="12" y2="15.5"/>
                <polyline points="22 8.5 12 15.5 2 8.5"/>
            </svg>
            ),
            title: 'APIs y Microservicios',
            description: 'Arquitecturas de microservicios escalables con Docker y Kubernetes.',
            price: 'Desde $1,000',
            features: ['Microservicios', 'Docker/Kubernetes', 'CI/CD', 'Monitoreo'],
            popular: false,
            deliveryTime: '4-7 semanas'
        }
        ]

    const platforms: Platform[] = [
        {
        id: 1,
        name: 'Gumroad',
        description: 'La plataforma más popular para creadores. Vende productos digitales directamente a tu audiencia.',
        logo: '/public/img/gumroad.png',
        url: 'https://antaresjb.gumroad.com/',
        color: '#FF90E8'
        },
        {
        id: 2,
        name: 'Envato Market',
        description: 'Marketplace líder para themes, plugins, código y assets creativos de alta calidad.',
        logo: '/public/img/Envanto.png',
        url: 'https://themeforest.net/user/antaresjb',
        color: '#81B441'
        },
        {
        id: 3,
        name: 'Creative Market',
        description: 'Comunidad de diseño con fuentes, gráficos, templates y recursos creativos premium.',
        logo: '/public/img/creative-market.png',
        url: 'https://creativemarket.com/antaresjb',
        color: '#4BAE4F'
        },
        {
        id: 4,
        name: 'Payhip',
        description: 'Vende productos digitales sin comisiones. Ideal para cursos, ebooks y software.',
        logo: '/public/img/payhip.png',
        url: 'https://payhip.com/antaresjb',
        color: '#5B4EE4'
        },
        {
        id: 5,
        name: 'Product Hunt',
        description: 'Plataforma para lanzar y descubrir nuevos productos digitales, apps y herramientas.',
        logo: '/public/img/product-hunt.png',
        url: 'https://www.producthunt',
        color: '#DA552F'
        },
        {
        id: 6,
        name: 'Lemonsqueezy',
        description: 'Alternativa moderna a Gumroad para vender productos digitales con excelente UX.',
        logo: '/public/img/lemonsqueezy.png',
        url: 'https://antaresjb.lemonsqueezy.com',
        color: '#FFC233'
        }
    ]

    return (
        <div className={styles.servicesPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
            <div className={styles.heroContent}>
            <span className={styles.badge}>Servicios & Productos</span>
            <h1 className={styles.title}>
                Soluciones digitales <span className={styles.highlight}>profesionales</span>
            </h1>
            <p className={styles.subtitle}>
                Desde desarrollo personalizado hasta productos digitales listos para usar
            </p>
            
            <div className={styles.tabs}>
                <button
                className={`${styles.tab} ${activeTab === 'services' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('services')}
                >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                Servicios Personalizados
                </button>
                <button
                className={`${styles.tab} ${activeTab === 'products' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('products')}
                >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                Tiendas Digitales
                </button>
            </div>
            </div>
        </section>

        {/* Services Section */}
        {activeTab === 'services' && (
            <section className={styles.servicesSection}>
            <div className={styles.container}>
                <div className={styles.servicesGrid}>
                {services.map((service) => (
                    <div 
                    key={service.id} 
                    className={`${styles.serviceCard} ${service.popular ? styles.popular : ''}`}
                    >
                    {service.popular && (
                        <span className={styles.popularBadge}>Más Popular</span>
                    )}
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    
                    <div className={styles.featuresList}>
                        {service.features.map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>{feature}</span>
                        </div>
                        ))}
                    </div>

                    <div className={styles.serviceFooter}>
                        <div className={styles.deliveryTime}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {service.deliveryTime}
                        </div>
                        <div className={styles.price}>{service.price}</div>
                    </div>
                    
                    <Link to="/contact" className={styles.ctaButton}>
                        Solicitar servicio
                    </Link>
                    </div>
                ))}
                </div>
            </div>
            </section>
        )}

        {/* Products Section - Tiendas */}
        {activeTab === 'products' && (
            <section className={styles.productsSection}>
            <div className={styles.container}>
                <div className={styles.productsHeader}>
                <h2 className={styles.productsTitle}>Mis Tiendas Digitales</h2>
                <p className={styles.productsSubtitle}>
                    Explora mis productos en estas plataformas de venta
                </p>
                </div>

                <div className={styles.platformsGrid}>
                {platforms.map((platform) => (
                    <a 
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.platformCard}
                    >
                    <div className={styles.platformIconWrapper}>
                        <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`} 
                        className={styles.platformLogo}
                        />
                    </div>
                    
                    <h3 className={styles.platformName}>{platform.name}</h3>
                    <p className={styles.platformDescription}>{platform.description}</p>

                    <div className={styles.platformButton}>
                        Visitar tienda
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </div>
                    </a>
                ))}
                </div>
            </div>
            </section>
        )}

        {/* CTA Section */}
        <section className={styles.cta}>
            <div className={styles.container}>
            <h2>¿No encuentras lo que buscas?</h2>
            <p>Contáctame para discutir tu proyecto personalizado</p>
            <Link to="/contact" className={styles.ctaButton}>
                Solicitar presupuesto
            </Link>
            </div>
        </section>
        </div>
    )
    }

    export default Services