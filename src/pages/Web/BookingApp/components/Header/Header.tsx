    import { Link } from 'react-router-dom'
    import styles from './Header.module.css'

    interface HeaderProps {
    step: string
    onBack: () => void
    showAdmin: boolean
    onToggleAdmin: () => void
    }

    const Header = ({ step, onBack, showAdmin, onToggleAdmin }: HeaderProps) => {
    return (
        <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.left}>
            {(step !== 'service' || showAdmin) && (
                <button onClick={onBack} className={styles.backBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Volver
                </button>
            )}
            <div className={styles.logo}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className={styles.logoText}>Reserv<span className={styles.highlight}>App</span></span>
            </div>
            </div>

            <div className={styles.right}>
            <button onClick={onToggleAdmin} className={`${styles.adminBtn} ${showAdmin ? styles.active : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {showAdmin ? 'Nueva Reserva' : 'Mis Reservas'}
            </button>
            <Link to="/projects" className={styles.portfolioBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Portafolio
            </Link>
            </div>
        </div>
        </header>
    )
    }

    export default Header