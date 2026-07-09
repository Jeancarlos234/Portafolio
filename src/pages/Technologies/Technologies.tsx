    import styles from '../../css/Technologies.module.css'

    interface Technology {
    name: string
    icon: string
    category: string
    }

    const Technologies = () => {
    const technologies: Technology[] = [
        { name: 'React', icon: '⚛️', category: 'Frontend' },
        { name: 'TypeScript', icon: '📘', category: 'Frontend' },
        { name: 'JavaScript', icon: '📜', category: 'Frontend' },
        { name: 'HTML5', icon: '🏗️', category: 'Frontend' },
        { name: 'CSS3', icon: '🎨', category: 'Frontend' },
        { name: 'Next.js', icon: '▲', category: 'Frontend' },
        { name: 'Node.js', icon: '🟢', category: 'Backend' },
        { name: 'Express', icon: '🚂', category: 'Backend' },
        { name: 'Python', icon: '🐍', category: 'Backend' },
        { name: 'MongoDB', icon: '🍃', category: 'Base de datos' },
        { name: 'PostgreSQL', icon: '🐘', category: 'Base de datos' },
        { name: 'Git', icon: '📦', category: 'Herramientas' },
        { name: 'Docker', icon: '🐳', category: 'Herramientas' },
        { name: 'AWS', icon: '☁️', category: 'Herramientas' },
    ]

    const categories = Array.from(new Set(technologies.map(tech => tech.category)))

    return (
        <section className={styles.technologies}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>🛠️ Tecnologías</h1>
            <p className={styles.subtitle}>
            Estas son las tecnologías y herramientas con las que trabajo habitualmente
            </p>
            <div className={styles.grid}>
            {categories.map((category) => (
                <div key={category} className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>{category}</h3>
                <div className={styles.techGrid}>
                    {technologies
                    .filter((tech) => tech.category === category)
                    .map((tech) => (
                        <div key={tech.name} className={styles.techItem}>
                        <span className={styles.icon}>{tech.icon}</span>
                        <span className={styles.name}>{tech.name}</span>
                        </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default Technologies