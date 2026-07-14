    import { Link } from 'react-router-dom'
    import styles from './Header.module.css'

    interface HeaderProps {
    activeView: string
    onViewChange: (view: 'dashboard' | 'invoices' | 'create' | 'preview' | 'clients' | 'products') => void
    }

    const Header = ({ activeView, onViewChange }: HeaderProps) => {
    const navItems = [
        { view: 'dashboard' as const, label: 'Dashboard', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        )},
        { view: 'invoices' as const, label: 'Facturas', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        )},
        { view: 'clients' as const, label: 'Clientes', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        )},
        { view: 'products' as const, label: 'Productos', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        )},
    ]

    return (
        <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logo}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span className={styles.logoText}>Factu<span className={styles.highlight}>Pro</span></span>
            </div>

            <nav className={styles.nav}>
            {navItems.map((item) => (
                <button
                key={item.view}
                className={`${styles.navItem} ${activeView === item.view ? styles.active : ''}`}
                onClick={() => onViewChange(item.view)}
                >
                {item.icon}
                <span>{item.label}</span>
                </button>
            ))}
            </nav>

            <Link to="/projects" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Portafolio
            </Link>
        </div>
        </header>
    )
    }

    export default Header