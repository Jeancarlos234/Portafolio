    import { useState } from 'react'
    import styles from './Header.module.css'

    interface HeaderProps {
    dateRange: string
    onDateRangeChange: (range: string) => void
    }

    const Header = ({ dateRange, onDateRangeChange }: HeaderProps) => {
    const [searchTerm, setSearchTerm] = useState('')

    const dateRanges = [
        { value: '7d', label: '7 días' },
        { value: '30d', label: '30 días' },
        { value: '90d', label: '90 días' },
        { value: '1y', label: 'Este año' },
    ]

    return (
        <header className={styles.header}>
        <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <div className={styles.dateSelector}>
            {dateRanges.map((range) => (
                <button
                key={range.value}
                className={`${styles.dateBtn} ${dateRange === range.value ? styles.active : ''}`}
                onClick={() => onDateRangeChange(range.value)}
                >
                {range.label}
                </button>
            ))}
            </div>
        </div>

        <div className={styles.headerRight}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            </div>

            <button className={styles.iconBtn} aria-label="Notificaciones">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className={styles.notificationBadge}>3</span>
            </button>

            <button className={styles.iconBtn} aria-label="Exportar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            </button>

            <div className={styles.userProfile}>
            <div className={styles.avatar}>
                <span>AD</span>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.userName}>Admin</span>
                <span className={styles.userRole}>Administrador</span>
            </div>
            </div>
        </div>
        </header>
    )
    }

    export default Header