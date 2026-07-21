    import { useEffect, useState, useRef } from 'react'
    import styles from '../../css/About.module.css'

    const About = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedSkills, setAnimatedSkills] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const skillsRef = useRef<HTMLDivElement>(null)

    const personalInfo = {
        name: 'AntaresJB',
        role: 'Desarrollador Full Stack',
        location: 'Madrid, España',
        email: 'tuemail@ejemplo.com',
        experience: '4+',
        projects: '50+',
        technologies: '30+',
        certifications: '10+'
    }

    const skillCategories = [
        {
        title: 'Frontend',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'JavaScript', level: 95 },
            { name: 'HTML5 / CSS3', level: 98 },
            { name: 'Tailwind CSS', level: 92 },
            { name: 'Redux / Zustand', level: 88 }
        ]
        },
        {
        title: 'Backend',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
        ),
        skills: [
            { name: 'Node.js / Express', level: 90 },
            { name: 'Python / Django', level: 85 },
            { name: 'PostgreSQL', level: 88 },
            { name: 'MongoDB', level: 87 },
            { name: 'GraphQL', level: 82 },
            { name: 'REST APIs', level: 93 }
        ]
        },
        {
        title: 'Herramientas',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        ),
        skills: [
            { name: 'Git / GitHub', level: 95 },
            { name: 'Docker', level: 85 },
            { name: 'AWS / Cloud', level: 80 },
            { name: 'CI/CD', level: 83 },
            { name: 'Figma', level: 78 },
            { name: 'Testing (Jest)', level: 82 }
        ]
        }
    ]

    const strengths = [
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            </svg>
        ),
        title: 'Código Limpio',
        description: 'Escribo código mantenible y escalable siguiendo las mejores prácticas y patrones de diseño.'
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
            </svg>
        ),
        title: 'Eficiencia',
        description: 'Optimizo el rendimiento y la velocidad de carga para ofrecer la mejor experiencia de usuario.'
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
        title: 'Trabajo en Equipo',
        description: 'Colaboro eficazmente en equipos multidisciplinarios utilizando metodologías ágiles como Scrum.'
        },
        {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
        ),
        title: 'Aprendizaje Continuo',
        description: 'Constantemente aprendiendo nuevas tecnologías y mejorando mis habilidades profesionales.'
        }
    ]

    const learningPaths = [
        {
        title: 'Inteligencia Artificial',
        description: 'Explorando machine learning y su integración en aplicaciones web modernas.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/>
            <line x1="17" y1="7" x2="22" y2="7"/>
            <line x1="17" y1="17" x2="22" y2="17"/>
            </svg>
        )
        },
        {
        title: 'Cloud Architecture',
        description: 'Profundizando en arquitecturas cloud-native y microservicios escalables.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
        )
        },
        {
        title: 'Web Performance',
        description: 'Optimizando aplicaciones para máxima velocidad y mejor experiencia de usuario.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
        )
        }
    ]

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

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting && !animatedSkills) {
                setAnimatedSkills(true)
            }
            })
        },
        { threshold: 0.3 }
        )

        if (skillsRef.current) {
        observer.observe(skillsRef.current)
        }

        return () => observer.disconnect()
    }, [animatedSkills])

    return (
        <>
        {/* Hero Section */}
        <section className={styles.aboutHero}>
            <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div className={styles.heroPattern}></div>
            </div>
            <div className={styles.heroContent}>
            <span className={styles.heroLabel}>SOBRE MÍ</span>
            <h1 className={styles.heroTitle}>
                Convirtiendo ideas en{' '}
                <span className={styles.heroHighlight}>experiencias digitales</span>
            </h1>
            <p className={styles.heroDescription}>
                Desarrollador Full Stack apasionado por crear soluciones innovadoras 
                que marcan la diferencia. Combino creatividad con tecnología para 
                construir productos que impactan.
            </p>
            </div>
        </section>

        {/* Main Content */}
        <section className={styles.aboutMain} ref={sectionRef}>
            <div className={styles.container}>
            {/* Bio Section */}
            <div className={`${styles.bioSection} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.bioContent}>
                <h2 className={styles.bioTitle}>Mi historia</h2>
                <div className={styles.bioText}>
                    <p>
                    Mi viaje en el desarrollo web comenzó hace más de 3 años, cuando 
                    descubrí mi pasión por crear soluciones digitales que resuelven 
                    problemas reales. Desde entonces, me he dedicado a perfeccionar 
                    mis habilidades y a mantenerme actualizado con las últimas 
                    tecnologías del mercado.
                    </p>
                    <p>
                    Me especializo en el desarrollo full stack, lo que me permite 
                    tener una visión completa de los proyectos, desde la arquitectura 
                    del backend hasta los detalles más finos del frontend. Creo 
                    firmemente en escribir código limpio, mantener buenas prácticas 
                    y nunca dejar de aprender.
                    </p>
                    <p>
                    Cuando no estoy programando, me gusta explorar nuevas tecnologías, 
                    contribuir a proyectos open source y compartir conocimiento con 
                    la comunidad. Estoy convencido de que la tecnología tiene el poder 
                    de transformar el mundo, y quiero ser parte de ese cambio.
                    </p>
                </div>
                </div>
                <div className={styles.bioStats}>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    </div>
                    <span className={styles.statNumber}>{personalInfo.experience}</span>
                    <span className={styles.statLabel}>Años de experiencia</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    </div>
                    <span className={styles.statNumber}>{personalInfo.projects}</span>
                    <span className={styles.statLabel}>Proyectos realizados</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                    </svg>
                    </div>
                    <span className={styles.statNumber}>{personalInfo.technologies}</span>
                    <span className={styles.statLabel}>Tecnologías dominadas</span>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    </div>
                    <span className={styles.statNumber}>{personalInfo.certifications}</span>
                    <span className={styles.statLabel}>Certificaciones</span>
                </div>
                </div>
            </div>

            {/* Strengths Section */}
            <div className={`${styles.strengthsSection} ${isVisible ? styles.visible : ''}`}>
                <h2 className={styles.sectionTitle}>Mis fortalezas</h2>
                <p className={styles.sectionSubtitle}>Lo que me hace diferente como desarrollador</p>
                <div className={styles.strengthsGrid}>
                {strengths.map((strength, index) => (
                    <div 
                    key={index} 
                    className={styles.strengthCard}
                    style={{ animationDelay: `${index * 0.15}s` }}
                    >
                    <div className={styles.strengthIcon}>{strength.icon}</div>
                    <h3 className={styles.strengthTitle}>{strength.title}</h3>
                    <p className={styles.strengthDescription}>{strength.description}</p>
                    </div>
                ))}
                </div>
            </div>

            {/* Skills Section */}
            <div className={styles.skillsSection} ref={skillsRef}>
                <h2 className={styles.sectionTitle}>Habilidades técnicas</h2>
                <p className={styles.sectionSubtitle}>Tecnologías con las que trabajo a diario</p>
                <div className={styles.skillsGrid}>
                {skillCategories.map((category, categoryIndex) => (
                    <div 
                    key={categoryIndex} 
                    className={`${styles.skillCategory} ${animatedSkills ? styles.skillsVisible : ''}`}
                    style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                    >
                    <div className={styles.categoryHeader}>
                        <div className={styles.categoryIcon}>{category.icon}</div>
                        <h3 className={styles.categoryTitle}>{category.title}</h3>
                    </div>
                    <div className={styles.skillsList}>
                        {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className={styles.skillItem}>
                            <div className={styles.skillInfo}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <span className={styles.skillLevel}>{skill.level}%</span>
                            </div>
                            <div className={styles.skillBar}>
                            <div 
                                className={styles.skillProgress}
                                style={{ 
                                width: animatedSkills ? `${skill.level}%` : '0%',
                                transitionDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s`
                                }}
                            ></div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Learning Path Section */}
            <div className={`${styles.learningSection} ${isVisible ? styles.visible : ''}`}>
                <h2 className={styles.sectionTitle}>En constante aprendizaje</h2>
                <p className={styles.sectionSubtitle}>Tecnologías y áreas que estoy explorando actualmente</p>
                <div className={styles.learningGrid}>
                {learningPaths.map((path, index) => (
                    <div 
                    key={index} 
                    className={styles.learningCard}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    >
                    <div className={styles.learningIconWrapper}>
                        {path.icon}
                    </div>
                    <h3 className={styles.learningTitle}>{path.title}</h3>
                    <p className={styles.learningDescription}>{path.description}</p>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </section>
        </>
    )
    }

    export default About