    import { useEffect, useState, useRef } from 'react'
    import styles from '../../css/Technologies.module.css'

    interface Technology {
    name: string
    icon: React.ReactNode  // ← Cambiar JSX.Element por React.ReactNode
    category: string
    }

    const Technologies = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    const technologies: Technology[] = [
        // Lenguajes de Programación
        { 
        name: 'TypeScript', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'JavaScript', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            </svg>
        )
        },
        { 
        name: 'Python', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        )
        },
        { 
        name: 'PHP', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
        )
        },
        { 
        name: '.NET', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        )
        },
        { 
        name: 'C++', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'C#', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        )
        },
        { 
        name: 'Java', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            </svg>
        )
        },
        { 
        name: 'Ruby', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
        )
        },

        // Lenguajes de Marcado
        {
        name: 'HTML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        {
        name: 'XHTML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            <line x1="12" y1="4" x2="12" y2="20"/>
            </svg>
        )
        },
        {
        name: 'XML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            </svg>
        )
        },
        {
        name: 'SVG',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="8"/>
            <polygon points="12,6 16,14 8,14"/>
            </svg>
        )
        },
        {
        name: 'RSS',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="18" r="1"/>
            <path d="M5 11a8 8 0 0 1 8 8"/>
            <path d="M5 5a14 14 0 0 1 14 14"/>
            </svg>
        )
        },
        {
        name: 'MathML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18L8 6L12 18L16 6L20 18"/>
            <line x1="3" y1="21" x2="21" y2="21"/>
            </svg>
        )
        },

        // Diseño
        { 
        name: 'CSS', 
        category: 'Diseño',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            </svg>
        )
        },
        { 
        name: 'CSS Modules', 
        category: 'Diseño',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            </svg>
        )
        },
        { 
        name: 'Tailwind CSS', 
        category: 'Diseño',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
        )
        },
        { 
        name: 'CSS3', 
        category: 'Diseño',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            </svg>
        )
        },

        // Frameworks
        { 
        name: 'React', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        )
        },
        { 
        name: 'Laravel', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            </svg>
        )
        },
        { 
        name: 'Django', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            </svg>
        )
        },
        { 
        name: 'Vite.js', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
        )
        },
        { 
        name: 'Flutter', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'React Native', 
        category: 'Frameworks',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
        )
        },

        // Bases de Datos
        { 
        name: 'MySQL', 
        category: 'Bases de Datos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
        { 
        name: 'SQL', 
        category: 'Bases de Datos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
        { 
        name: 'PostgreSQL', 
        category: 'Bases de Datos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
        { 
        name: 'phpMyAdmin', 
        category: 'Bases de Datos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
        { 
        name: 'MariaDB', 
        category: 'Bases de Datos',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
    ]

    const categories = Array.from(new Set(technologies.map(tech => tech.category)))

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

    const getCategoryIcon = (category: string) => {
        switch (category) {
        case 'Lenguajes de Programación':
            return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
            )
        case 'Lenguajes de Marcado':
            return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
            </svg>
            )
        case 'Diseño':
            return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
            </svg>
            )
        case 'Frameworks':
            return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                <line x1="7" y1="2" x2="7" y2="22"/>
                <line x1="17" y1="2" x2="17" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
            )
        case 'Bases de Datos':
            return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            )
        default:
            return null
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
        case 'Lenguajes de Programación':
            return 'blue'
        case 'Lenguajes de Marcado':
            return 'green'
        case 'Diseño':
            return 'pink'
        case 'Frameworks':
            return 'amber'
        case 'Bases de Datos':
            return 'slate'
        default:
            return 'slate'
        }
    }

    return (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div className={styles.heroPattern}></div>
            </div>
            <div className={styles.heroContent}>
            <span className={styles.heroLabel}>TECNOLOGÍAS</span>
            <h1 className={styles.heroTitle}>Stack Tecnológico</h1>
            <p className={styles.heroDescription}>
                Tecnologías, lenguajes y herramientas que domino para construir 
                soluciones digitales completas y profesionales.
            </p>
            <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{technologies.length}</span>
                <span className={styles.heroStatLabel}>Tecnologías</span>
                </div>
                <div className={styles.heroDivider}></div>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{categories.length}</span>
                <span className={styles.heroStatLabel}>Categorías</span>
                </div>
            </div>
            </div>
        </section>

        {/* Technologies Grid */}
        <section className={styles.main} ref={sectionRef}>
            <div className={styles.container}>
            <div className={styles.grid}>
                {categories.map((category, categoryIndex) => {
                const color = getCategoryColor(category)
                const categoryTechs = technologies.filter(tech => tech.category === category)
                
                return (
                    <div 
                    key={category} 
                    className={`${styles.categoryCard} ${styles[color]} ${isVisible ? styles.visible : ''}`}
                    style={{ animationDelay: `${categoryIndex * 0.15}s` }}
                    >
                    <div className={styles.categoryHeader}>
                        <div className={`${styles.categoryIcon} ${styles[`${color}Icon`]}`}>
                        {getCategoryIcon(category)}
                        </div>
                        <div className={styles.categoryInfo}>
                        <h3 className={styles.categoryTitle}>{category}</h3>
                        <span className={styles.categoryCount}>
                            {categoryTechs.length} tecnologías
                        </span>
                        </div>
                    </div>
                    
                    <div className={styles.techGrid}>
                        {categoryTechs.map((tech, techIndex) => (
                        <div 
                            key={tech.name} 
                            className={styles.techItem}
                            style={{ animationDelay: `${categoryIndex * 0.15 + techIndex * 0.05}s` }}
                        >
                            <div className={styles.techIcon}>
                            {tech.icon}
                            </div>
                            <span className={styles.techName}>{tech.name}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                )
                })}
            </div>
            </div>
        </section>
        </>
    )
    }

    export default Technologies