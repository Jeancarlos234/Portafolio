    import { Link } from 'react-router-dom'
    import styles from '../../css/Home.module.css'

    const Home = () => {
    return (
        <section className={styles.hero}>
        <div className={styles.container}>
            <div className={styles.content}>
            <p className={styles.greeting}>👋 ¡Hola! Bienvenido a mi portafolio</p>
            <h1 className={styles.title}>
                Soy <span className={styles.highlight}>Tu Nombre</span>
            </h1>
            <p className={styles.subtitle}>
                Desarrollador Web Full Stack apasionado por crear experiencias digitales increíbles
            </p>
            <p className={styles.description}>
                Transformo ideas en soluciones web modernas y eficientes
            </p>
            <div className={styles.buttons}>
                <Link to="/projects" className={styles.primaryBtn}>
                💼 Ver Proyectos
                </Link>
                <Link to="/contact" className={styles.secondaryBtn}>
                📬 Contactar
                </Link>
            </div>
            </div>
        </div>
        
        {/* Sección de características rápidas */}
        <div className={styles.features}>
            <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🚀</span>
            <h3>Rápido</h3>
            <p>Optimización de rendimiento y carga rápida</p>
            </div>
            <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📱</span>
            <h3>Responsivo</h3>
            <p>Diseño adaptable a todos los dispositivos</p>
            </div>
            <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎨</span>
            <h3>Moderno</h3>
            <p>Interfaces limpias y experiencias intuitivas</p>
            </div>
        </div>
        </section>
    )
    }

    export default Home