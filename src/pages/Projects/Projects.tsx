    import styles from '../../css/Projects.module.css'

    interface Project {
    id: number
    title: string
    description: string
    technologies: string[]
    image: string
    githubLink: string
    liveLink: string
    }

    const Projects = () => {
    const projects: Project[] = [
        {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico con carrito de compras, pasarela de pago y panel de administración.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'https://via.placeholder.com/400x250',
        githubLink: '#',
        liveLink: '#'
        },
        {
        id: 2,
        title: 'Task Manager App',
        description: 'Aplicación de gestión de tareas con funcionalidades de arrastrar y soltar, notificaciones y colaboración en tiempo real.',
        technologies: ['TypeScript', 'React', 'Firebase', 'Tailwind CSS'],
        image: 'https://via.placeholder.com/400x250',
        githubLink: '#',
        liveLink: '#'
        },
        {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Dashboard del clima con datos en tiempo real, pronósticos y mapas interactivos.',
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS Modules'],
        image: 'https://via.placeholder.com/400x250',
        githubLink: '#',
        liveLink: '#'
        }
    ]

    return (
        <section className={styles.projects}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>💼 Proyectos</h1>
            <div className={styles.grid}>
            {projects.map((project) => (
                <article key={project.id} className={styles.card}>
                <div className={styles.imageContainer}>
                    <img 
                    src={project.image} 
                    alt={project.title}
                    className={styles.image}
                    />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>
                    <div className={styles.technologies}>
                    {project.technologies.map((tech) => (
                        <span key={tech} className={styles.tech}>
                        {tech}
                        </span>
                    ))}
                    </div>
                    <div className={styles.links}>
                    <a 
                        href={project.githubLink} 
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a 
                        href={project.liveLink} 
                        className={`${styles.link} ${styles.liveLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live Demo
                    </a>
                    </div>
                </div>
                </article>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default Projects