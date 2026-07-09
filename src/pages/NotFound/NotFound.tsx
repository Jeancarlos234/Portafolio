    import { Link } from 'react-router-dom'
    import styles from '../../css/NotFound.module.css'

    const NotFound = () => {
    return (
        <div className={styles.notFound}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.description}>
            Lo siento, la página que buscas no existe o ha sido movida.
        </p>
        <Link to="/" className={styles.homeLink}>
            ← Volver al inicio
        </Link>
        </div>
    )
    }

    export default NotFound