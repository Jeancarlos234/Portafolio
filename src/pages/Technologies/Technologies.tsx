    import { useEffect, useState, useRef } from 'react'
    import styles from '../../css/Technologies.module.css'

    interface Technology {
    name: string
    icon: React.ReactNode
    category: string
    }

    const Technologies = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [hoveredTech, setHoveredTech] = useState<string | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    const technologies: Technology[] = [
        // Lenguajes de Programación
        { 
        name: 'TypeScript', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'JavaScript', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'C#', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        )
        },
        { 
        name: 'Java', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            </svg>
        )
        },
        { 
        name: 'Ruby', 
        category: 'Lenguajes de Programación',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
        )
        },

        // Lenguajes de Marcado
        {
        name: 'HTML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        {
        name: 'XHTML',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            </svg>
        )
        },
        {
        name: 'SVG',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="8"/>
            <polygon points="12,6 16,14 8,14"/>
            </svg>
        )
        },
        {
        name: 'RSS',
        category: 'Lenguajes de Marcado',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            </svg>
        )
        },
        { 
        name: 'CSS Modules', 
        category: 'Diseño',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
        )
        },
        { 
        name: 'CSS3', 
        category: 'Diseño',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        )
        },
        { 
        name: 'Laravel', 
        category: 'Frameworks',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
        )
        },
        { 
        name: 'Flutter', 
        category: 'Frameworks',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        )
        },
        { 
        name: 'React Native', 
        category: 'Frameworks',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
        )
        },
    ]

    const categories = ['all', ...Array.from(new Set(technologies.map(tech => tech.category)))]
    
    const filteredTechs = activeCategory === 'all' 
        ? technologies 
        : technologies.filter(tech => tech.category === activeCategory)

    const categoryTechCount = (category: string) => {
        if (category === 'all') return technologies.length
        return technologies.filter(tech => tech.category === category).length
    }

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

    const getCategoryColor = (category: string) => {
        switch (category) {
        case 'Lenguajes de Programación':
            return { primary: '#3b82f6', light: '#eff6ff', border: '#bfdbfe', gradient: 'from-blue-500 to-cyan-500' }
        case 'Lenguajes de Marcado':
            return { primary: '#10b981', light: '#f0fdf4', border: '#a7f3d0', gradient: 'from-emerald-500 to-teal-500' }
        case 'Diseño':
            return { primary: '#ec4899', light: '#fdf2f8', border: '#fbcfe8', gradient: 'from-pink-500 to-rose-500' }
        case 'Frameworks':
            return { primary: '#f59e0b', light: '#fffbeb', border: '#fde68a', gradient: 'from-amber-500 to-orange-500' }
        case 'Bases de Datos':
            return { primary: '#6366f1', light: '#eef2ff', border: '#c7d2fe', gradient: 'from-indigo-500 to-purple-500' }
        default:
            return { primary: '#64748b', light: '#f8fafc', border: '#e2e8f0', gradient: 'from-slate-500 to-gray-500' }
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
        case 'Lenguajes de Programación':
            return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
            )
        case 'Lenguajes de Marcado':
            return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
            </svg>
            )
        case 'Diseño':
            return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
            </svg>
            )
        case 'Frameworks':
            return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                <line x1="7" y1="2" x2="7" y2="22"/>
                <line x1="17" y1="2" x2="17" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
            )
        case 'Bases de Datos':
            return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            )
        default:
            return null
        }
    }

    return (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div className={styles.heroPattern}></div>
            <div className={styles.heroGlow}></div>
            </div>
            <div className={styles.heroContent}>
            <div className={styles.heroLabelWrapper}>
                <span className={styles.heroLabelDot}></span>
                <span className={styles.heroLabel}>TECNOLOGÍAS</span>
            </div>
            <h1 className={styles.heroTitle}>
                Stack <span className={styles.heroTitleHighlight}>Tecnológico</span>
            </h1>
            <p className={styles.heroDescription}>
                Tecnologías, lenguajes y herramientas que domino para construir 
                soluciones digitales completas y profesionales.
            </p>
            <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{technologies.length}+</span>
                <span className={styles.heroStatLabel}>Tecnologías</span>
                </div>
                <div className={styles.heroDivider}></div>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{categories.length - 1}</span>
                <span className={styles.heroStatLabel}>Categorías</span>
                </div>
                <div className={styles.heroDivider}></div>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>5+</span>
                <span className={styles.heroStatLabel}>Años Exp.</span>
                </div>
            </div>
            </div>
            <div className={styles.heroScrollIndicator}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            </div>
        </section>

        {/* Technologies Section */}
        <section className={styles.main} ref={sectionRef}>
            <div className={styles.container}>
            {/* Category Filter */}
            <div className={styles.filterContainer}>
                {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.filterButton} ${activeCategory === category ? styles.filterButtonActive : ''}`}
                    onClick={() => setActiveCategory(category)}
                >
                    {category === 'all' ? (
                    <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Todos
                    </>
                    ) : (
                    <>
                        {getCategoryIcon(category)}
                        {category}
                    </>
                    )}
                    <span className={styles.filterCount}>{categoryTechCount(category)}</span>
                </button>
                ))}
            </div>

            {/* Tech Grid */}
            <div className={styles.grid}>
                {activeCategory === 'all' ? (
                categories.filter(c => c !== 'all').map((category, categoryIndex) => {
                    const color = getCategoryColor(category)
                    const categoryTechs = technologies.filter(tech => tech.category === category)
                    
                    return (
                    <div 
                        key={category} 
                        className={`${styles.categoryCard} ${isVisible ? styles.visible : ''}`}
                        style={{ 
                        animationDelay: `${categoryIndex * 0.1}s`,
                        borderColor: color.border 
                        }}
                    >
                        <div className={styles.categoryHeader}>
                        <div 
                            className={styles.categoryIcon}
                            style={{ 
                            background: color.light,
                            color: color.primary,
                            borderColor: color.border
                            }}
                        >
                            {getCategoryIcon(category)}
                        </div>
                        <div className={styles.categoryInfo}>
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <span className={styles.categoryCount}>
                            {categoryTechs.length} tecnologías
                            </span>
                        </div>
                        <div 
                            className={styles.categoryLine}
                            style={{ background: `linear-gradient(90deg, ${color.primary}, transparent)` }}
                        ></div>
                        </div>
                        
                        <div className={styles.techGrid}>
                        {categoryTechs.map((tech, techIndex) => (
                            <div 
                            key={tech.name} 
                            className={`${styles.techItem} ${hoveredTech === tech.name ? styles.techItemHovered : ''}`}
                            style={{ animationDelay: `${categoryIndex * 0.1 + techIndex * 0.05}s` }}
                            onMouseEnter={() => setHoveredTech(tech.name)}
                            onMouseLeave={() => setHoveredTech(null)}
                            >
                            <div 
                                className={styles.techIcon}
                                style={{ color: hoveredTech === tech.name ? color.primary : undefined }}
                            >
                                {tech.icon}
                            </div>
                            <span className={styles.techName}>{tech.name}</span>
                            {hoveredTech === tech.name && (
                                <div className={styles.techTooltip}>
                                <div className={styles.tooltipContent}>
                                    <div className={styles.tooltipIcon}>
                                    {tech.icon}
                                    </div>
                                    <div>
                                    <div className={styles.tooltipName}>{tech.name}</div>
                                    <div className={styles.tooltipCategory}>{tech.category}</div>
                                    </div>
                                </div>
                                <div 
                                    className={styles.tooltipArrow}
                                    style={{ borderTopColor: color.primary }}
                                ></div>
                                </div>
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                    )
                })
                ) : (
                <div className={styles.filteredGrid}>
                    {filteredTechs.map((tech, index) => {
                    const color = getCategoryColor(tech.category)
                    return (
                        <div 
                        key={tech.name} 
                        className={`${styles.techCardLarge} ${isVisible ? styles.visible : ''}`}
                        style={{ 
                            animationDelay: `${index * 0.05}s`,
                            borderColor: color.border
                        }}
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        >
                        <div 
                            className={styles.techCardIcon}
                            style={{ 
                            background: color.light,
                            color: color.primary,
                            borderColor: color.border
                            }}
                        >
                            {tech.icon}
                        </div>
                        <div className={styles.techCardInfo}>
                            <span className={styles.techCardName}>{tech.name}</span>
                            <span 
                            className={styles.techCardCategory}
                            style={{ color: color.primary }}
                            >
                            {tech.category}
                            </span>
                        </div>
                        <div 
                            className={styles.techCardGlow}
                            style={{ background: `radial-gradient(circle, ${color.primary}20, transparent)` }}
                        ></div>
                        </div>
                    )
                    })}
                </div>
                )}
            </div>
            </div>
        </section>
        </>
    )
    }

    export default Technologies