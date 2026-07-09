    import { Link } from 'react-router-dom'
    import styles from '../../css/Footer.module.css'

    const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.links}>
            <Link to="/about">Sobre mí</Link>
            <Link to="/projects">Proyectos</Link>
            <Link to="/contact">Contacto</Link>
            </div>
            <p className={styles.text}>
            © {currentYear} Tu Nombre. Todos los derechos reservados.
            </p>
            <p className={styles.text}>
            Desarrollado con ❤️ usando React, TypeScript y React Router
            </p>
        </div>
        </footer>
    )
    }

    export default Footer