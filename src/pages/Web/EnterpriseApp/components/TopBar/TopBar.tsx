    import styles from './TopBar.module.css'
    import type { EnterpriseStats } from '../../types'

    interface TopBarProps {
    stats: EnterpriseStats
    notifications: number
    }

    const TopBar = ({ stats, notifications }: TopBarProps) => {
    return (
        <header className={styles.topBar}>
        <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>
            <input type="text" placeholder="Buscar en EnterprisePro..." className={styles.searchInput} />
        </div>
        <div className={styles.actions}>
            <button className={styles.iconBtn}>
            ◐
            {notifications > 0 && <span className={styles.notifBadge}>{notifications}</span>}
            </button>
            <div className={styles.quickStats}>
            <span className={styles.quickStat}>+${stats.totalRevenue.toLocaleString()}</span>
            <span className={styles.quickStat}>{stats.activeProjects} proyectos</span>
            </div>
        </div>
        </header>
    )
    }

    export default TopBar