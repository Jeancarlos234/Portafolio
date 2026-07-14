    import { Link } from 'react-router-dom'
    import styles from './Header.module.css'

    interface HeaderProps {
    activeView: string
    onViewChange: (view: 'dashboard' | 'products' | 'add' | 'movement' | 'history') => void
    }

    const Header = ({ activeView, onViewChange }: HeaderProps) => {
    const navItems = [
        { view: 'dashboard' as const, label: 'Dashboard', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        )},
        { view: 'products' as const, label: 'Productos', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        )},
        { view: 'history' as const, label: 'Historial', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        )},
    ]

    return (
        <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logo} onClick={() => onViewChange('dashboard')} style={{ cursor: 'pointer' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className={styles.logoText}>Stock<span className={styles.highlight}>Pro</span></span>
            </div>
            <nav className={styles.nav}>
            {navItems.map(item => (
                <button key={item.view} className={`${styles.navItem} ${activeView === item.view ? styles.active : ''}`} onClick={() => onViewChange(item.view)}>
                {item.icon}<span>{item.label}</span>
                </button>
            ))}
            </nav>
            <Link to="/projects" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            </Link>
        </div>
        </header>
    )
    }

    export default Header