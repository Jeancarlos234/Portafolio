    import { Link } from 'react-router-dom'
    import styles from './Sidebar.module.css'
    import type { EnterpriseStats } from '../../types'

    interface SidebarProps {
    activeModule: string
    onModuleChange: (module: string) => void
    collapsed: boolean
    onToggle: () => void
    notifications: number
    stats: EnterpriseStats
    }

    const Sidebar = ({ activeModule, onModuleChange, collapsed, onToggle, stats }: SidebarProps) => {
    const modules = [
        { id: 'dashboard', label: 'Dashboard', icon: '◉' },
        { id: 'finances', label: 'Finanzas', icon: '◎' },
        { id: 'projects', label: 'Proyectos', icon: '◈' },
        { id: 'contacts', label: 'Contactos', icon: '◇' },
        { id: 'calendar', label: 'Calendario', icon: '◷' },
        { id: 'chat', label: 'Chat', icon: '◌', badge: 2 },
        { id: 'documents', label: 'Documentos', icon: '◫' },
    ]

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.brand}>
            <div className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            {!collapsed && <span className={styles.logoText}>Enterprise<span className={styles.logoAccent}>Pro</span></span>}
            </div>
            <button onClick={onToggle} className={styles.toggleBtn}>
            {collapsed ? '▶' : '◀'}
            </button>
        </div>

        {!collapsed && (
            <div className={styles.userCard}>
            <div className={styles.avatar}>AD</div>
            <div className={styles.userInfo}>
                <span className={styles.userName}>Admin</span>
                <span className={styles.userRole}>Director General</span>
            </div>
            </div>
        )}

        <nav className={styles.nav}>
            {modules.map(mod => (
            <button key={mod.id} className={`${styles.navItem} ${activeModule === mod.id ? styles.active : ''}`} onClick={() => onModuleChange(mod.id)}>
                <span className={styles.navIcon}>{mod.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{mod.label}</span>}
                {mod.badge && !collapsed && <span className={styles.badge}>{mod.badge}</span>}
            </button>
            ))}
        </nav>

        {!collapsed && (
            <div className={styles.statsMini}>
            <div className={styles.statMiniItem}>
                <span className={styles.statMiniValue}>${stats.totalRevenue.toLocaleString()}</span>
                <span className={styles.statMiniLabel}>Ingresos</span>
            </div>
            <div className={styles.statMiniItem}>
                <span className={styles.statMiniValue}>{stats.activeProjects}</span>
                <span className={styles.statMiniLabel}>Proyectos</span>
            </div>
            </div>
        )}

        <div className={styles.footer}>
            <Link to="/projects" className={styles.backBtn}>
            {collapsed ? '←' : '← Volver'}
            </Link>
        </div>
        </aside>
    )
    }

    export default Sidebar