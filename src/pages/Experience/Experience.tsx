    import { useEffect, useState, useRef } from 'react'
    import styles from '../../css/Experiencie.module.css'

    interface Experience {
    id: number
    position: string
    company: string
    period: string
    description: string
    achievements: string[]
    technologies?: string[]
    type: 'work' | 'internship' | 'project'
    }

    const Experience = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    const experiences: Experience[] = [
        {
        id: 1,
        position: 'Desarrollador Full Stack',
        company: 'Contratista Santiago Rodríguez',
        period: 'Julio 2025 - Actualidad',
        type: 'work',
        description: 'Desarrollo de aplicaciones web y móviles para optimizar procesos operativos empresariales.',
        technologies: ['React', 'Laravel', 'Flutter', 'MySQL', 'Android'],
        achievements: [
            'Desarrollo de aplicaciones web Full Stack para optimizar los procesos operativos de la empresa.',
            'Diseño e implementación de formularios para el registro y gestión de órdenes de trabajo de Interagua.',
            'Desarrollo de módulos de visualización de información mediante tablas dinámicas con funciones de búsqueda, filtrado y exportación de datos.',
            'Desarrollo de una aplicación móvil para el control de asistencia del personal, incorporando formularios de captura de información y herramientas de cálculo.',
            'Desarrollo y mantenimiento de bases de datos, garantizando la integridad y disponibilidad de la información.',
            'Administración del inventario de dispositivos móviles y gestión del proceso de adquisición, configuración y entrega.',
            'Soporte técnico a usuarios finales en aplicaciones, equipos móviles y herramientas tecnológicas de la empresa.'
        ]
        },
        {
        id: 2,
        position: 'Desarrollador Full Stack',
        company: 'Coinser S.A.S',
        period: '2025 - Julio 2025',
        type: 'work',
        description: 'Responsable del levantamiento, desarrollo y despliegue de sistemas web y móviles desde cero.',
        technologies: ['Laravel', 'React', 'Flutter', 'Android', 'Java', 'Kotlin', 'MySQL', 'cPanel'],
        achievements: [
            'Levantamiento, desarrollo y despliegue de sistemas web y móviles desde cero, incluyendo análisis de requerimientos y diseño de arquitectura.',
            'Desarrollo de aplicaciones móviles utilizando Android (Java/Kotlin) y Flutter, con conexión a backend Laravel y bases de datos seguras.',
            'Creación e implementación de un sistema modular web con Laravel, orientado a perfiles como analistas, administradores y supervisores, con control de accesos y permisos por rol.',
            'Encargado del despliegue en servidores cPanel, configurando dominios, certificados SSL, bases de datos y reglas de seguridad.',
            'Responsable de la documentación técnica del sistema, incluyendo manuales de usuario, diagramas de arquitectura y documentación funcional/técnica.',
            'Integración de APIs RESTful, pruebas funcionales y optimización del rendimiento del sistema.'
        ]
        },
        {
        id: 3,
        position: 'Pasante de Inspector de Campo',
        company: 'PANATEL',
        period: '2023 - 2024',
        type: 'internship',
        description: 'Aseguramiento de la correcta implementación y funcionamiento de servicios de internet y fibra óptica en hogares.',
        technologies: ['Fibra Óptica', 'Redes', 'ONT', 'Routers'],
        achievements: [
            'Realizar visitas técnicas a domicilios para evaluar la viabilidad de la instalación de servicios de internet y fibra óptica.',
            'Instalar y configurar equipos terminales (ONTs, routers, etc.) siguiendo los protocolos y estándares de la empresa.',
            'Conectar y fusionar cables de fibra óptica en la red de planta interna y externa, asegurando una mínima pérdida de señal.',
            'Verificar la calidad de la señal y el correcto funcionamiento del servicio utilizando herramientas de medición.',
            'Documentar las instalaciones realizadas, registrando equipos, configuraciones y cualquier anomalía encontrada.',
            'Brindar soporte técnico básico al cliente sobre el uso de los equipos y la resolución de problemas comunes.'
        ]
        },
        {
        id: 4,
        position: 'Pasante de Programación',
        company: 'AMBIENSA - Mundo Ambiensa',
        period: '2022 - 2023',
        type: 'internship',
        description: 'Especializado en implementación modular y optimización de queries, contribuyendo al desarrollo de múltiples módulos del sistema.',
        technologies: ['Laravel', 'React', 'MySQL', 'REST APIs', 'Git'],
        achievements: [
            'Colaborar en el diseño y desarrollo de nuevas funcionalidades con arquitectura modular para garantizar escalabilidad y mantenibilidad.',
            'Asistir en la optimización de consultas a la base de datos, implementando índices y refactorizando código para mejorar el rendimiento.',
            'Participar activamente en la creación de componentes reutilizables en React, aplicando principios de diseño atómico.',
            'Apoyar en la integración y mantenimiento de APIs RESTful desarrolladas con Laravel.',
            'Contribuir a la depuración y resolución de problemas, realizando pruebas unitarias y de integración.',
            'Participar en la revisión de código (code reviews), ofreciendo y recibiendo retroalimentación constructiva.'
        ]
        }
    ]

    // Proyectos Personales
    const personalProjects: Experience[] = [
        {
        id: 5,
        position: 'Aplicaciones de Escritorio con C# y .NET',
        company: 'Proyecto Personal',
        period: 'WPF / WinForms',
        type: 'project',
        description: 'Creación de herramientas de utilidad personal con interfaces intuitivas y conexión a bases de datos.',
        technologies: ['C#', '.NET', 'WPF', 'WinForms', 'SQL Server', 'SQLite', 'MVVM', 'MVC'],
        achievements: [
            'Creación de herramientas de utilidad personal, como gestores de tareas, pequeñas bases de datos o aplicaciones de visualización de datos.',
            'Implementación de interfaces de usuario intuitivas y responsivas, practicando el patrón MVVM (Model-View-ViewModel) o MVC.',
            'Conexión a bases de datos relacionales (SQL Server, SQLite) para persistencia de datos.'
        ]
        },
        {
        id: 6,
        position: 'Programación de Sistemas y Algoritmos con C++',
        company: 'Proyecto Personal',
        period: 'Aplicaciones de Consola',
        type: 'project',
        description: 'Desarrollo de aplicaciones de consola para resolver problemas algorítmicos y explorar gestión de memoria.',
        technologies: ['C++', 'Algoritmos', 'Estructuras de Datos', 'Optimización', 'Simulaciones'],
        achievements: [
            'Desarrollo de aplicaciones de consola para resolver problemas algorítmicos (ejercicios de estructuras de datos, optimización).',
            'Exploración de la gestión de memoria y el rendimiento, características clave de C++.',
            'Creación de pequeños juegos o simulaciones que requieren un control de bajo nivel.'
        ]
        },
        {
        id: 7,
        position: 'Proyectos Full Stack con ASP.NET Core',
        company: 'Proyecto Personal',
        period: 'APIs RESTful',
        type: 'project',
        description: 'Construcción de APIs RESTful utilizando ASP.NET Core para el backend con integración de bases de datos.',
        technologies: ['ASP.NET Core', 'C#', 'REST APIs', 'SQL', 'HTTP', 'Backend'],
        achievements: [
            'Construcción de APIs RESTful utilizando ASP.NET Core para el backend.',
            'Integración con bases de datos y manejo de peticiones HTTP.',
            'Desarrollo de aplicaciones web completas con arquitectura cliente-servidor.'
        ]
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

    const totalYears = () => {
        const currentYear = new Date().getFullYear()
        const startYear = 2022
        return currentYear - startYear
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
        case 'work': return 'Empleo'
        case 'internship': return 'Pasantía'
        case 'project': return 'Proyecto Personal'
        default: return ''
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
            <span className={styles.heroLabel}>EXPERIENCIA</span>
            <h1 className={styles.heroTitle}>Trayectoria Profesional</h1>
            <p className={styles.heroDescription}>
                Un recorrido por mi carrera en el mundo del desarrollo de software 
                y las telecomunicaciones, incluyendo experiencia laboral, pasantías 
                y proyectos personales.
            </p>
            <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{totalYears()}+</span>
                <span className={styles.heroStatLabel}>Años de experiencia</span>
                </div>
                <div className={styles.heroDivider}></div>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{experiences.length + personalProjects.length}</span>
                <span className={styles.heroStatLabel}>Experiencias totales</span>
                </div>
            </div>
            </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.main} ref={sectionRef}>
            <div className={styles.container}>
            
            {/* Experiencia Laboral */}
            <h2 className={styles.sectionTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                Experiencia Laboral
            </h2>
            
            <div className={styles.timeline}>
                {experiences.map((exp, index) => (
                <div 
                    key={exp.id} 
                    className={`${styles.timelineItem} ${isVisible ? styles.visible : ''} ${styles[exp.type]}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                >
                    <div className={styles.timelineDot}>
                    {exp.type === 'work' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    )}
                    </div>
                    
                    <div className={styles.timelineContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerInfo}>
                        <div className={`${styles.typeBadge} ${styles[exp.type]}`}>
                            {getTypeLabel(exp.type)}
                        </div>
                        <span className={styles.period}>{exp.period}</span>
                        </div>
                        <h3 className={styles.position}>{exp.position}</h3>
                        <div className={styles.companyWrapper}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        <h4 className={styles.company}>{exp.company}</h4>
                        </div>
                    </div>
                    
                    <p className={styles.description}>{exp.description}</p>
                    
                    {exp.technologies && (
                        <div className={styles.technologies}>
                        {exp.technologies.map((tech) => (
                            <span key={tech} className={styles.tech}>
                            {tech}
                            </span>
                        ))}
                        </div>
                    )}
                    
                    <div className={styles.achievementsSection}>
                        <h5 className={styles.achievementsTitle}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"/>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        Responsabilidades y logros
                        </h5>
                        <ul className={styles.achievements}>
                        {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                        ))}
                        </ul>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Proyectos Personales */}
            <h2 className={`${styles.sectionTitle} ${styles.projectsTitle}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <line x1="12" y1="22" x2="12" y2="15.5"/>
                <polyline points="22 8.5 12 15.5 2 8.5"/>
                </svg>
                Proyectos Personales
            </h2>

            <div className={styles.timeline}>
                {personalProjects.map((exp, index) => (
                <div 
                    key={exp.id} 
                    className={`${styles.timelineItem} ${isVisible ? styles.visible : ''} ${styles[exp.type]}`}
                    style={{ animationDelay: `${(experiences.length + index) * 0.15}s` }}
                >
                    <div className={styles.timelineDot}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                    </svg>
                    </div>
                    
                    <div className={styles.timelineContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerInfo}>
                        <div className={`${styles.typeBadge} ${styles.project}`}>
                            {getTypeLabel(exp.type)}
                        </div>
                        <span className={styles.period}>{exp.period}</span>
                        </div>
                        <h3 className={styles.position}>{exp.position}</h3>
                        <div className={styles.companyWrapper}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <h4 className={styles.company}>{exp.company}</h4>
                        </div>
                    </div>
                    
                    <p className={styles.description}>{exp.description}</p>
                    
                    {exp.technologies && (
                        <div className={styles.technologies}>
                        {exp.technologies.map((tech) => (
                            <span key={tech} className={styles.tech}>
                            {tech}
                            </span>
                        ))}
                        </div>
                    )}
                    
                    <div className={styles.achievementsSection}>
                        <h5 className={styles.achievementsTitle}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"/>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        Lo que aprendí y desarrollé
                        </h5>
                        <ul className={styles.achievements}>
                        {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                        ))}
                        </ul>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            </div>
        </section>
        </>
    )
    }

    export default Experience