    import { Link } from 'react-router-dom'
    import styles from './Sidebar.module.css'
    import type { OrderStats } from '../../types'

    interface SidebarProps {
    activeView: string
    onViewChange: (view: 'dashboard' | 'kanban' | 'calendar' | 'clients' | 'reports') => void
    stats: OrderStats
    }

    const Sidebar = ({ activeView, onViewChange, stats }: SidebarProps) => {
    const menuItems = [
        { view: 'dashboard' as const, label: 'Dashboard', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        ), badge: null },
        { view: 'kanban' as const, label: 'Tablero', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></svg>
        ), badge: stats.pendingOrders },
        { view: 'calendar' as const, label: 'Calendario', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ), badge: stats.todayOrders },
        { view: 'clients' as const, label: 'Clientes', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ), badge: null },
        { view: 'reports' as const, label: 'Reportes', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ), badge: null },
    ]

    return (
        <aside className={styles.sidebar}>
        <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <div>
            <span className={styles.logoText}>WorkOrders</span>
            <span className={styles.logoSub}>Pro</span>
            </div>
        </div>

        <nav className={styles.nav}>
            {menuItems.map(item => (
            <button key={item.view} className={`${styles.navItem} ${activeView === item.view ? styles.active : ''}`} onClick={() => onViewChange(item.view)}>
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge !== null && item.badge > 0 && (
                <span className={styles.badge}>{item.badge}</span>
                )}
                {activeView === item.view && <span className={styles.activeIndicator} />}
            </button>
            ))}
        </nav>

        <div className={styles.footer}>
            <Link to="/projects" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Volver al portafolio</span>
            </Link>
        </div>
        </aside>
    )
    }

    export default Sidebar