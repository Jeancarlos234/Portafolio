    import styles from './Dashboard.module.css'
    import type { EnterpriseStats, FinanceRecord, Project, CalendarEvent } from '../../types'

    interface DashboardProps {
    stats: EnterpriseStats
    finances: FinanceRecord[]
    projects: Project[]
    events: CalendarEvent[]
    }

    const Dashboard = ({ stats, finances, projects, events }: DashboardProps) => {
    const recentFinances = [...finances].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
    const todayEvents = events.filter(e => e.date === new Date().toISOString().split('T')[0])

    return (
        <div className={styles.dashboard}>
        <div className={styles.welcome}>
            <h1>Bienvenido, Admin</h1>
            <p>Resumen ejecutivo de tu empresa</p>
        </div>

        <div className={styles.kpiRow}>
            {[
            { label: 'Ingresos', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+12%', up: true },
            { label: 'Gastos', value: `$${stats.totalExpenses.toLocaleString()}`, trend: '-5%', up: false },
            { label: 'Margen', value: `${stats.profitMargin}%`, trend: '+3%', up: true },
            { label: 'Proyectos', value: stats.activeProjects.toString(), trend: 'activos', up: true },
            ].map((kpi, i) => (
            <div key={i} className={styles.kpiCard}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={`${styles.kpiTrend} ${kpi.up ? styles.trendUp : styles.trendDown}`}>{kpi.trend}</span>
            </div>
            ))}
        </div>

        <div className={styles.grid}>
            <div className={styles.card}>
            <h3>Finanzas Recientes</h3>
            {recentFinances.map(f => (
                <div key={f.id} className={styles.financeItem}>
                <div className={`${styles.financeDot} ${f.type === 'income' ? styles.dotIncome : styles.dotExpense}`} />
                <div className={styles.financeInfo}>
                    <span>{f.description}</span>
                    <span className={styles.financeDate}>{f.date}</span>
                </div>
                <span className={`${styles.financeAmount} ${f.type === 'income' ? styles.amountIncome : styles.amountExpense}`}>
                    {f.type === 'income' ? '+' : '-'}${f.amount.toLocaleString()}
                </span>
                </div>
            ))}
            </div>

            <div className={styles.card}>
            <h3>Proyectos Activos</h3>
            {projects.filter(p => p.status === 'active').map(p => (
                <div key={p.id} className={styles.projectItem}>
                <div>
                    <span className={styles.projectName}>{p.name}</span>
                    <span className={styles.projectClient}>{p.client}</span>
                </div>
                <div className={styles.projectProgress}>
                    <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${p.progress}%` }} />
                    </div>
                    <span>{p.progress}%</span>
                </div>
                </div>
            ))}
            </div>

            <div className={styles.card}>
            <h3>Eventos de Hoy</h3>
            {todayEvents.length > 0 ? todayEvents.map(e => (
                <div key={e.id} className={styles.eventItem}>
                <span className={styles.eventTime}>{e.time}</span>
                <span className={styles.eventTitle}>{e.title}</span>
                </div>
            )) : <p className={styles.empty}>Sin eventos hoy</p>}
            </div>
        </div>
        </div>
    )
    }

    export default Dashboard