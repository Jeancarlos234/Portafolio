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
    category: string
    }

    interface Platform {
    id: number
    name: string
    description: string
    logo: string
    url: string
    color: string
    available: boolean
    }

    const Services = () => {
    const [activeTab, setActiveTab] = useState<'services' | 'products'>('services')
    const [activeFilter, setActiveFilter] = useState<string>('todos')

    const categories = [
        { id: 'todos', label: 'Todos' },
        { id: 'web', label: 'Desarrollo Web' },
        { id: 'movil', label: 'Móvil' },
        { id: 'juegos', label: 'Juegos' },
        { id: 'ia', label: 'IA & Automatización' },
        { id: 'cloud', label: 'Cloud & DevOps' },
        { id: 'diseno', label: 'Diseño & Plantillas' },
        { id: 'sistemas', label: 'Sistemas Empresariales' }
    ]

    const services: Service[] = [
        {
        id: 1,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
            </svg>
        ),
        title: 'Email Templates',
        description: 'Plantillas de email responsivas y atractivas para campañas de marketing digital.',
        price: 'Desde $200',
        features: ['Diseño responsivo', 'Compatibilidad clientes', 'HTML/CSS optimizado', 'Testeado en Litmus'],
        popular: false,
        deliveryTime: '3-5 días',
        category: 'diseno'
        },
        {
        id: 2,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="18" rx="2" ry="2"/>
            <line x1="6" y1="3" x2="6" y2="21"/>
            <line x1="18" y1="3" x2="18" y2="21"/>
            <line x1="2" y1="9" x2="22" y2="9"/>
            <line x1="2" y1="15" x2="22" y2="15"/>
            </svg>
        ),
        title: 'Plantillas Web',
        description: 'Templates profesionales para blogs, portfolios, e-commerce y sitios corporativos.',
        price: 'Desde $300',
        features: ['Diseños premium', 'Código optimizado', 'Fácil personalización', 'Documentación incluida'],
        popular: false,
        deliveryTime: '1-2 semanas',
        category: 'diseno'
        },
        {
        id: 3,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
            <path d="M7 7h10M7 12h10M7 17h6"/>
            </svg>
        ),
        title: 'Landing Pages',
        description: 'Páginas de aterrizaje optimizadas para conversión con diseño atractivo y rápido.',
        price: 'Desde $400',
        features: ['Diseño persuasivo', 'Optimización CRO', 'Formularios de captura', 'Integración con CRM'],
        popular: false,
        deliveryTime: '1-2 semanas',
        category: 'web'
        },
        {
        id: 4,
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
        deliveryTime: '2-4 semanas',
        category: 'web'
        },
        {
        id: 5,
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
        deliveryTime: '3-5 semanas',
        category: 'web'
        },
        {
        id: 6,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
            </svg>
        ),
        title: 'Sistemas de Seguridad',
        description: 'Implementación de autenticación, autorización y protección de datos en tus aplicaciones.',
        price: 'Desde $800',
        features: ['Autenticación 2FA', 'Encriptación de datos', 'Protección DDoS', 'Auditoría de seguridad'],
        popular: false,
        deliveryTime: '2-4 semanas',
        category: 'sistemas'
        },
        {
        id: 7,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
        ),
        title: 'Chatbots y Automatización',
        description: 'Bots inteligentes para WhatsApp, Telegram, Discord y automatización de procesos.',
        price: 'Desde $900',
        features: ['WhatsApp/Telegram/Discord', 'Procesamiento NLP', 'Integración con APIs', 'Panel de control'],
        popular: false,
        deliveryTime: '2-5 semanas',
        category: 'ia'
        },
        {
        id: 8,
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
        deliveryTime: '4-7 semanas',
        category: 'cloud'
        },
        {
        id: 9,
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
        deliveryTime: '4-7 semanas',
        category: 'movil'
        },
        {
        id: 10,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        ),
        title: 'Dashboards y Paneles',
        description: 'Paneles de administración interactivos con gráficos, estadísticas y reportes.',
        price: 'Desde $1,200',
        features: ['Gráficos dinámicos', 'Exportación de datos', 'Filtros avanzados', 'Roles de usuario'],
        popular: false,
        deliveryTime: '4-8 semanas',
        category: 'sistemas'
        },
        {
        id: 11,
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
        deliveryTime: '6-9 semanas',
        category: 'web'
        },
        {
        id: 12,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            <path d="M12 2v20"/>
            </svg>
        ),
        title: 'Cloud & DevOps',
        description: 'Configuración de infraestructura en la nube, CI/CD y despliegue automatizado.',
        price: 'Desde $1,500',
        features: ['AWS/GCP/Azure', 'Docker & Kubernetes', 'CI/CD pipelines', 'Monitoreo 24/7'],
        popular: false,
        deliveryTime: '3-6 semanas',
        category: 'cloud'
        },
        {
        id: 13,
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
        deliveryTime: '8-12 semanas',
        category: 'sistemas'
        },
        {
        id: 14,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
            <path d="M12 6v12M6 12h12"/>
            </svg>
        ),
        title: 'Juegos Web',
        description: 'Desarrollo de juegos 2D/3D para navegador con JavaScript, Canvas y WebGL.',
        price: 'Desde $2,000',
        features: ['Gráficos 2D/3D', 'Física realista', 'Multiplayer online', 'Optimización mobile'],
        popular: false,
        deliveryTime: '8-14 semanas',
        category: 'juegos'
        },
        {
        id: 15,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
        ),
        title: 'E-commerce',
        description: 'Tiendas online completas con carrito de compras, pagos y panel de administración.',
        price: 'Desde $2,000',
        features: ['Catálogo de productos', 'Pasarela de pagos', 'Gestión de inventario', 'Panel admin'],
        popular: false,
        deliveryTime: '6-10 semanas',
        category: 'web'
        },
        {
        id: 16,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
        ),
        title: 'Apps con IA',
        description: 'Integración de inteligencia artificial: chatbots, recomendaciones y automatización.',
        price: 'Desde $2,500',
        features: ['Chatbots inteligentes', 'ML/Deep Learning', 'Procesamiento de lenguaje', 'Automatización'],
        popular: false,
        deliveryTime: '6-10 semanas',
        category: 'ia'
        },
        {
        id: 17,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            </svg>
        ),
        title: 'Sistemas de Gestión',
        description: 'ERP, CRM y sistemas de gestión personalizados para optimizar tu negocio.',
        price: 'Desde $2,500',
        features: ['Gestión de usuarios', 'Reportes avanzados', 'Automatización de procesos', 'Integración con APIs'],
        popular: false,
        deliveryTime: '10-16 semanas',
        category: 'sistemas'
        },
        {
        id: 18,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
        ),
        title: 'Juegos Móviles',
        description: 'Juegos nativos para iOS y Android con Unity, Godot o React Native Game Engine.',
        price: 'Desde $3,000',
        features: ['Juegos casuales', 'Publicidad integrada', 'In-app purchases', 'Publicación en stores'],
        popular: false,
        deliveryTime: '8-16 semanas',
        category: 'juegos'
        }
    ]

    const platforms: Platform[] = [
        {
        id: 1,
        name: 'Gumroad',
        description: 'La plataforma más popular para creadores. Vende productos digitales directamente a tu audiencia.',
        logo: '/img/gumroad.png',
        url: 'https://antaresjb.gumroad.com/',
        color: '#FF90E8',
        available: true
        },
        {
        id: 2,
        name: 'Envato Market',
        description: 'Marketplace líder para themes, plugins, código y assets creativos de alta calidad.',
        logo: '/img/Envanto.png',
        url: 'https://themeforest.net/user/antaresjb',
        color: '#81B441',
        available: true
        },
        {
        id: 3,
        name: 'Creative Market',
        description: 'Comunidad de diseño con fuentes, gráficos, templates y recursos creativos premium.',
        logo: '/img/creative-market.png',
        url: '#',
        color: '#4BAE4F',
        available: false
        },
        {
        id: 4,
        name: 'Payhip',
        description: 'Vende productos digitales sin comisiones. Ideal para cursos, ebooks y software.',
        logo: '/img/Payhip.png',
        url: '#',
        color: '#5B4EE4',
        available: false
        },
        {
        id: 5,
        name: 'Product Hunt',
        description: 'Plataforma para lanzar y descubrir nuevos productos digitales, apps y herramientas.',
        logo: '/img/product-hunt.png',
        url: '#',
        color: '#DA552F',
        available: false
        },
        {
        id: 6,
        name: 'Lemonsqueezy',
        description: 'Alternativa moderna a Gumroad para vender productos digitales con excelente UX.',
        logo: '/img/lemonsqueezy.png',
        url: '#',
        color: '#FFC233',
        available: false
        },
        {
        id: 7,
        name: 'Codester',
        description: 'Marketplace especializado en scripts, themes, plugins y código fuente para desarrolladores web.',
        logo: '/img/codester.png',
        url: '#',
        color: '#FF6B35',
        available: false
        },
        {
        id: 8,
        name: 'Ko-fi Shop',
        description: 'Plataforma amigable para creadores que permite vender productos digitales y recibir donaciones sin comisiones.',
        logo: '/img/Ko-fi.png',
        url: '#',
        color: '#FF5E5B',
        available: false
        },
        {
        id: 9,
        name: 'Itch.io',
        description: 'La plataforma indie más popular para publicar y vender juegos, assets y herramientas interactivas.',
        logo: '/img/itch.png',
        url: '#',
        color: '#FA5C5C',
        available: false
        }
    ]

    const filteredServices = activeFilter === 'todos' 
        ? services 
        : services.filter(service => service.category === activeFilter)

    return (
        <div className={styles.servicesPage}>
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

        {activeTab === 'services' && (
            <section className={styles.servicesSection}>
            <div className={styles.container}>
                <div className={styles.filters}>
                {categories.map((category) => (
                    <button
                    key={category.id}
                    className={`${styles.filterButton} ${activeFilter === category.id ? styles.activeFilter : ''}`}
                    onClick={() => setActiveFilter(category.id)}
                    >
                    {category.label}
                    </button>
                ))}
                </div>

                <div className={styles.servicesGrid}>
                {filteredServices.map((service) => (
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

                {filteredServices.length === 0 && (
                <div className={styles.noResults}>
                    <p>No hay servicios en esta categoría</p>
                </div>
                )}
            </div>
            </section>
        )}

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
                    platform.available ? (
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
                    ) : (
                    <div 
                        key={platform.id}
                        className={`${styles.platformCard} ${styles.platformComingSoon}`}
                    >
                        <div className={styles.comingSoonBadge}>Próximamente</div>
                        <div className={styles.platformIconWrapper}>
                        <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className={styles.platformLogo}
                        />
                        </div>
                        
                        <h3 className={styles.platformName}>{platform.name}</h3>
                        <p className={styles.platformDescription}>{platform.description}</p>

                        <div className={styles.platformButtonDisabled}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Próximamente
                        </div>
                    </div>
                    )
                ))}
                </div>
            </div>
            </section>
        )}

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