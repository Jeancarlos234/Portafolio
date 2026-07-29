    import { Link } from 'react-router-dom'
    import styles from '../../css/DigitalStores.module.css'

    interface Platform {
    id: number
    name: string
    description: string
    logo: string
    url: string
    color: string
    available: boolean
    }

    const DigitalStores = () => {
    const platforms: Platform[] = [
        {
        id: 1,
        name: 'Gumroad',
        description: 'La plataforma más popular para creadores. Vende productos digitales directamente a tu audiencia.',
        logo: '/img/gumroad.png',
        url: 'https://sydespatial.gumroad.com/',
        color: '#FF90E8',
        available: true
        },
        {
        id: 2,
        name: 'Ko-fi Shop',
        description: 'Plataforma amigable para creadores que permite vender productos digitales y recibir donaciones sin comisiones.',
        logo: '/img/Ko-fi.png',
        url: 'https://ko-fi.com/sydespatial/shop',
        color: '#FF5E5B',
        available: true
        },
        {
        id: 3,
        name: 'Payhip',
        description: 'Vende productos digitales sin comisiones. Ideal para cursos, ebooks y software.',
        logo: '/img/Payhip.png',
        url: 'https://payhip.com/SydeSpatial',
        color: '#5B4EE4',
        available: true
        },
        {
        id: 4,
        name: 'Envato Market',
        description: 'Marketplace líder para themes, plugins, código y assets creativos de alta calidad.',
        logo: '/img/Envanto.png',
        url: 'https://themeforest.net/user/antaresjb',
        color: '#81B441',
        available: true
        },
        {
        id: 5,
        name: 'Creative Market',
        description: 'Comunidad de diseño con fuentes, gráficos, templates y recursos creativos premium.',
        logo: '/img/creative-market.png',
        url: '#',
        color: '#4BAE4F',
        available: false
        },
        {
        id: 6,
        name: 'Product Hunt',
        description: 'Plataforma para lanzar y descubrir nuevos productos digitales, apps y herramientas.',
        logo: '/img/product-hunt.png',
        url: '#',
        color: '#DA552F',
        available: false
        },
        {
        id: 7,
        name: 'Lemonsqueezy',
        description: 'Alternativa moderna a Gumroad para vender productos digitales con excelente UX.',
        logo: '/img/lemonsqueezy.png',
        url: '#',
        color: '#FFC233',
        available: false
        },
        {
        id: 8,
        name: 'Codester',
        description: 'Marketplace especializado en scripts, themes, plugins y código fuente para desarrolladores web.',
        logo: '/img/codester.png',
        url: '#',
        color: '#FF6B35',
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

    return (
        <div className={styles.servicesPage}>
        <section className={styles.hero}>
            <div className={styles.heroContent}>
            <span className={styles.badge}>Tiendas Digitales</span>
            <h1 className={styles.title}>
                Productos digitales <span className={styles.highlight}>listos para usar</span>
            </h1>
            <p className={styles.subtitle}>
                Explora mis productos en estas plataformas de venta
            </p>
            </div>
        </section>

        <section className={styles.productsSection}>
            <div className={styles.container}>
            <div className={styles.productsHeader}>
                <h2 className={styles.productsTitle}>Mis Tiendas Digitales</h2>
                <p className={styles.productsSubtitle}>
                Encuentra templates, código, assets y más en estas plataformas
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

        <section className={styles.cta}>
            <div className={styles.container}>
            <h2>¿Buscas algo personalizado?</h2>
            <p>También ofrezco servicios de desarrollo a medida</p>
            <Link to="/services" className={styles.ctaButton}>
                Ver servicios personalizados
            </Link>
            </div>
        </section>
        </div>
    )
    }

    export default DigitalStores