    import { useState } from 'react'
    import styles from './Dashboard.module.css'
    import type { ServiceStats, Service, ServiceRequest } from '../../types'

    interface DashboardProps {
    stats: ServiceStats
    services: Service[]
    requests: ServiceRequest[]
    onUpdateStatus: (id: string, status: ServiceRequest['status']) => void
    }

    const Dashboard = ({ stats, services, requests, onUpdateStatus }: DashboardProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')

    const now = new Date()
    const filteredRequests = requests.filter(r => {
        const d = new Date(r.date)
        if (selectedPeriod === 'week') return d >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (selectedPeriod === 'month') return d.getMonth() === now.getMonth()
        return d.getFullYear() === now.getFullYear()
    })

    const periodRevenue = filteredRequests
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => {
        const service = services.find(s => s.id === r.serviceId)
        return sum + (service?.price || 0)
        }, 0)

    const completionRate = requests.length > 0
        ? Math.round((requests.filter(r => r.status === 'completed').length / requests.length) * 100)
        : 0

    const kpis = [
        { 
        title: 'Servicios Activos', value: stats.activeServices.toString(), subtitle: `de ${stats.totalServices} totales`,
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>),
        color: '#0891b2', bg: '#ecfeff' 
        },
        { 
        title: 'Clientes', value: stats.totalClients.toString(), subtitle: 'registrados',
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
        color: '#7c3aed', bg: '#f5f3ff' 
        },
        { 
        title: 'Solicitudes Pendientes', value: stats.pendingRequests.toString(), subtitle: 'por atender',
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
        color: '#f59e0b', bg: '#fffbeb' 
        },
        { 
        title: 'Ingresos del Período', value: `$${periodRevenue.toLocaleString()}`, subtitle: `${selectedPeriod === 'week' ? 'esta semana' : selectedPeriod === 'month' ? 'este mes' : 'este año'}`,
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>),
        color: '#22c55e', bg: '#f0fdf4' 
        },
    ]

    const pendingRequests = requests.filter(r => r.status === 'pending' || r.status === 'in_progress')
    const recentRequests = [...requests].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)
    const topServices = [...services].sort((a, b) => {
        const aCount = requests.filter(r => r.serviceId === a.id).length
        const bCount = requests.filter(r => r.serviceId === b.id).length
        return bCount - aCount
    }).slice(0, 5)

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'completed': return styles.statusCompleted
        case 'in_progress': return styles.statusProgress
        case 'pending': return styles.statusPending
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'completed': return 'Completado'
        case 'in_progress': return 'En Progreso'
        case 'pending': return 'Pendiente'
        case 'cancelled': return 'Cancelado'
        default: return status
        }
    }

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
        case 'high': return styles.priorityHigh
        case 'medium': return styles.priorityMedium
        case 'low': return styles.priorityLow
        default: return ''
        }
    }

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
        case 'high': return 'Alta'
        case 'medium': return 'Media'
        case 'low': return 'Baja'
        default: return priority
        }
    }

    return (
        <div className={styles.dashboard}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Panel de Control</h1>
            <p className={styles.subtitle}>Resumen general de servicios y solicitudes</p>
            </div>
            <div className={styles.periodSelector}>
            {(['week', 'month', 'year'] as const).map(p => (
                <button key={p} className={`${styles.periodBtn} ${selectedPeriod === p ? styles.activePeriod : ''}`} onClick={() => setSelectedPeriod(p)}>
                {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Año'}
                </button>
            ))}
            </div>
        </div>

        <div className={styles.kpiGrid}>
            {kpis.map((kpi, i) => (
            <div key={i} className={styles.kpiCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.kpiIcon} style={{ backgroundColor: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
                <div>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiLabel}>{kpi.title}</span>
                <span className={styles.kpiSub}>{kpi.subtitle}</span>
                </div>
            </div>
            ))}
        </div>

        <div className={styles.completionSection}>
            <div className={styles.completionInfo}>
            <span className={styles.completionLabel}>Tasa de Completado</span>
            <span className={styles.completionValue}>{completionRate}%</span>
            </div>
            <div className={styles.completionBar}>
            <div className={styles.completionFill} style={{ width: `${completionRate}%` }} />
            </div>
            <span className={styles.completionSub}>{stats.completedRequests} de {requests.length} solicitudes completadas</span>
        </div>

        <div className={styles.grid}>
            <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Solicitudes Pendientes ({pendingRequests.length})
            </h2>
            {pendingRequests.length === 0 ? (
                <p className={styles.empty}>No hay solicitudes pendientes</p>
            ) : (
                pendingRequests.slice(0, 5).map(r => (
                <div key={r.id} className={styles.requestItem}>
                    <div className={styles.reqInfo}>
                    <span className={styles.reqName}>{r.clientName}</span>
                    <span className={styles.reqService}>{r.serviceName}</span>
                    <span className={styles.reqDate}>{new Date(r.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className={styles.reqActions}>
                    <span className={`${styles.priorityBadge} ${getPriorityStyle(r.priority)}`}>{getPriorityLabel(r.priority)}</span>
                    <span className={`${styles.status} ${getStatusStyle(r.status)}`}>{getStatusLabel(r.status)}</span>
                    <select value={r.status} onChange={(e) => onUpdateStatus(r.id, e.target.value as ServiceRequest['status'])} className={styles.statusSelect}>
                        <option value="pending">Pendiente</option>
                        <option value="in_progress">En Progreso</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                    </div>
                </div>
                ))
            )}
            </div>

            <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                Servicios Más Solicitados
            </h2>
            <div className={styles.topList}>
                {topServices.map((s, i) => {
                const count = requests.filter(r => r.serviceId === s.id).length
                const maxCount = Math.max(...topServices.map(s => requests.filter(r => r.serviceId === s.id).length), 1)
                return (
                    <div key={s.id} className={styles.topItem}>
                    <span className={styles.topRank}>#{i + 1}</span>
                    <div className={styles.topInfo}>
                        <span className={styles.topName}>{s.name}</span>
                        <div className={styles.topBar}>
                        <div className={styles.topFill} style={{ width: `${(count / maxCount) * 100}%`, background: '#0891b2' }} />
                        </div>
                    </div>
                    <span className={styles.topCount}>{count}</span>
                    </div>
                )
                })}
            </div>
            </div>
        </div>

        <div className={styles.section} style={{ marginTop: '20px' }}>
            <h2 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Historial Reciente
            </h2>
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr><th>Cliente</th><th>Servicio</th><th>Prioridad</th><th>Fecha</th><th>Estado</th></tr></thead>
                <tbody>
                {recentRequests.map(r => (
                    <tr key={r.id} className={styles.tableRow}>
                    <td className={styles.tableName}>{r.clientName}</td>
                    <td>{r.serviceName}</td>
                    <td><span className={`${styles.priorityBadge} ${getPriorityStyle(r.priority)}`}>{getPriorityLabel(r.priority)}</span></td>
                    <td className={styles.tableDate}>{new Date(r.date).toLocaleDateString('es-ES')}</td>
                    <td><span className={`${styles.status} ${getStatusStyle(r.status)}`}>{getStatusLabel(r.status)}</span></td>
                    </tr>
                ))}
                {recentRequests.length === 0 && <tr><td colSpan={5} className={styles.empty}>Sin solicitudes</td></tr>}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
    }

    export default Dashboard