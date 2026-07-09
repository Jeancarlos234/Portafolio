    import styles from '../../css/About.module.css'

    const About = () => {
    const skills = [
        'Desarrollo Frontend con React, TypeScript',
        'Backend con Node.js y Python',
        'Bases de datos SQL y NoSQL',
        'Metodologías ágiles (Scrum)',
        'Diseño responsivo y UX/UI',
        'Control de versiones con Git',
    ]

    return (
        <section className={styles.about}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>👨‍💻 Sobre Mí</h1>
            <div className={styles.content}>
            <div className={styles.text}>
                <p className={styles.paragraph}>
                Soy un desarrollador web apasionado por la tecnología y la innovación. 
                Con más de X años de experiencia en el desarrollo de aplicaciones web, 
                me especializo en crear soluciones eficientes y escalables.
                </p>
                <p className={styles.paragraph}>
                Mi enfoque se centra en escribir código limpio y mantenible, 
                siempre buscando las mejores prácticas y las últimas tecnologías 
                para ofrecer productos de alta calidad.
                </p>
                <p className={styles.paragraph}>
                Me encanta aprender nuevas tecnologías y enfrentar desafíos que 
                me permitan crecer profesionalmente. Creo firmemente en el poder 
                de la colaboración y el trabajo en equipo.
                </p>
                <div className={styles.skillsList}>
                <h3>Lo que puedo hacer:</h3>
                <ul>
                    {skills.map((skill, index) => (
                    <li key={index}>✓ {skill}</li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
    }

    export default About