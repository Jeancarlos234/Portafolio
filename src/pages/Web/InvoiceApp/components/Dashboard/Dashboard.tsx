    import styles from './Dashboard.module.css'
    import type { Invoice } from '../../types'

    interface DashboardProps {
    invoices: Invoice[]
    clients: { id: string }[]
    products: { id: string }[]
    onViewInvoices: () => void
    onCreateInvoice: () => void
    }

    const Dashboard = ({ invoices, clients, products, onViewInvoices, onCreateInvoice }: DashboardProps) => {
    const totalRevenue = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total, 0)

    const pendingRevenue = invoices
        .filter(inv => inv.status === 'sent' || inv.status === 'draft')
        .reduce((sum, inv) => sum + inv.total, 0)

    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const monthlyInvoices = invoices.filter(inv => {
        const d = new Date(inv.date)
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear
    })

    const stats = [
        { 
        title: 'Facturas Totales', 
        value: invoices.length.toString(), 
        color: '#6366f1', 
        bg: '#eef2ff',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
        )
        },
        { 
        title: 'Clientes', 
        value: clients.length.toString(), 
        color: '#22c55e', 
        bg: '#f0fdf4',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        )
        },
        { 
        title: 'Productos', 
        value: products.length.toString(), 
        color: '#f59e0b', 
        bg: '#fffbeb',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        )
        },
        { 
        title: 'Este Mes', 
        value: monthlyInvoices.length.toString(), 
        color: '#06b6d4', 
        bg: '#ecfeff',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
        )
        },
    ]

    const financialStats = [
        { 
        title: 'Total Cobrado', 
        value: `$${totalRevenue.toLocaleString()}`, 
        color: '#22c55e', 
        bg: '#f0fdf4', 
        percent: invoices.length > 0 ? Math.round((invoices.filter(i => i.status === 'paid').length / invoices.length) * 100) : 0 
        },
        { 
        title: 'Total Pendiente', 
        value: `$${pendingRevenue.toLocaleString()}`, 
        color: '#f59e0b', 
        bg: '#fffbeb', 
        percent: invoices.length > 0 ? Math.round((invoices.filter(i => i.status === 'sent' || i.status === 'draft').length / invoices.length) * 100) : 0 
        },
    ]

    const recentInvoices = [...invoices]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'paid': return styles.statusPaid
        case 'sent': return styles.statusSent
        case 'draft': return styles.statusDraft
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'paid': return 'Pagada'
        case 'sent': return 'Enviada'
        case 'draft': return 'Borrador'
        case 'cancelled': return 'Cancelada'
        default: return status
        }
    }

    return (
        <div className={styles.dashboard}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Panel de Control</h1>
            <p className={styles.subtitle}>Resumen general de tu negocio</p>
            </div>
            <button onClick={onCreateInvoice} className={styles.createBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nueva Factura
            </button>
        </div>

        <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.statIcon} style={{ backgroundColor: stat.bg, color: stat.color }}>
                {stat.icon}
                </div>
                <div className={styles.statInfo}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.title}</span>
                </div>
            </div>
            ))}
        </div>

        <div className={styles.financialGrid}>
            {financialStats.map((stat, i) => (
            <div key={i} className={styles.financialCard}>
                <div className={styles.financialHeader}>
                <span className={styles.financialTitle}>{stat.title}</span>
                <span className={styles.financialPercent} style={{ color: stat.color }}>{stat.percent}%</span>
                </div>
                <span className={styles.financialValue}>{stat.value}</span>
                <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${stat.percent}%`, background: stat.color }} />
                </div>
                <div className={styles.financialFooter}>
                <span className={styles.financialLabel}>del total de facturas</span>
                </div>
            </div>
            ))}
        </div>

        <div className={styles.recentSection}>
            <div className={styles.recentHeader}>
            <h2 className={styles.recentTitle}>Facturas Recientes</h2>
            <button onClick={onViewInvoices} className={styles.viewAll}>
                Ver todas
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
            </div>
            {recentInvoices.length === 0 ? (
            <div className={styles.empty}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                </svg>
                <p>No hay facturas aún. Crea tu primera factura para empezar.</p>
            </div>
            ) : (
            <div className={styles.recentList}>
                {recentInvoices.map((inv) => (
                <div key={inv.id} className={styles.recentItem}>
                    <div className={styles.recentInfo}>
                    <span className={styles.recentNumber}>#{inv.number}</span>
                    <span className={styles.recentClient}>{inv.clientName}</span>
                    </div>
                    <span className={styles.recentDate}>{new Date(inv.date).toLocaleDateString('es-ES')}</span>
                    <span className={styles.recentAmount}>${inv.total.toLocaleString()}</span>
                    <span className={`${styles.recentStatus} ${getStatusStyle(inv.status)}`}>{getStatusLabel(inv.status)}</span>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    )
    }

    export default Dashboard