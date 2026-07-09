    import styles from '../../css/Experiencie.module.css'

    interface Experience {
    id: number
    position: string
    company: string
    period: string
    description: string
    achievements: string[]
    }

    const Experience = () => {
    const experiences: Experience[] = [
        {
        id: 1,
        position: 'Desarrollador Full Stack Senior',
        company: 'Tech Company',
        period: '2022 - Presente',
        description: 'Desarrollo de aplicaciones web escalables utilizando tecnologías modernas.',
        achievements: [
            'Lideré un equipo de 5 desarrolladores en la migración de una aplicación legacy a React',
            'Implementé CI/CD que redujo el tiempo de despliegue en un 60%',
            'Optimicé el rendimiento de la aplicación mejorando los tiempos de carga en un 40%'
        ]
        },
        {
        id: 2,
        position: 'Desarrollador Frontend',
        company: 'Digital Agency',
        period: '2020 - 2022',
        description: 'Creación de interfaces de usuario modernas y responsivas para diversos clientes.',
        achievements: [
            'Desarrollé más de 20 sitios web responsivos para clientes de diversos sectores',
            'Implementé sistemas de diseño reutilizables que mejoraron la consistencia visual',
            'Colaboré con diseñadores UX/UI para crear experiencias de usuario intuitivas'
        ]
        },
        {
        id: 3,
        position: 'Desarrollador Junior',
        company: 'Startup Innovadora',
        period: '2019 - 2020',
        description: 'Inicio de carrera profesional en el desarrollo web.',
        achievements: [
            'Participé en el desarrollo de una aplicación MVP que consiguió financiación',
            'Aprendí y apliqué metodologías ágiles en proyectos reales',
            'Contribuí a la mejora de la documentación técnica del equipo'
        ]
        }
    ]

    return (
        <section className={styles.experience}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>📄 Experiencia</h1>
            <p className={styles.subtitle}>Mi trayectoria profesional en el mundo del desarrollo</p>
            <div className={styles.timeline}>
            {experiences.map((exp, index) => (
                <div 
                key={exp.id} 
                className={styles.timelineItem}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                >
                <div className={styles.timelineContent}>
                    <div className={styles.header}>
                    <h3 className={styles.position}>{exp.position}</h3>
                    <span className={styles.period}>{exp.period}</span>
                    </div>
                    <h4 className={styles.company}>{exp.company}</h4>
                    <p className={styles.description}>{exp.description}</p>
                    <ul className={styles.achievements}>
                    {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                    </ul>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default Experience