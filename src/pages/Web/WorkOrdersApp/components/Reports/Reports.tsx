    import { useState } from 'react'
    import styles from './Reports.module.css'
    import type { WorkOrder, Client, Technician } from '../../types'

    interface ReportsProps {
    orders: WorkOrder[]
    clients: Client[]
    technicians: Technician[]
    }

    const Reports = ({ orders, clients, technicians }: ReportsProps) => {
    const [reportType, setReportType] = useState<'overview' | 'status' | 'priority' | 'technician' | 'client'>('overview')
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

    const monthOrders = orders.filter(o => o.createdAt.startsWith(selectedMonth))
    const totalRevenue = monthOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.estimatedHours * 50, 0)

    const statusData = ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'].map(status => ({
        status,
        label: status === 'pending' ? 'Pendiente' : status === 'assigned' ? 'Asignado' : status === 'in_progress' ? 'En Progreso' : status === 'completed' ? 'Completado' : 'Cancelado',
        count: monthOrders.filter(o => o.status === status).length,
        color: status === 'completed' ? '#22c55e' : status === 'in_progress' ? '#ea580c' : status === 'pending' || status === 'assigned' ? '#f59e0b' : '#94a3b8'
    }))

    const priorityData = ['urgent', 'high', 'medium', 'low'].map(p => ({
        priority: p,
        label: p === 'urgent' ? 'Urgente' : p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja',
        count: monthOrders.filter(o => o.priority === p).length,
        color: p === 'urgent' ? '#dc2626' : p === 'high' ? '#ea580c' : p === 'medium' ? '#f59e0b' : '#22c55e'
    }))

    const technicianData = technicians.filter(t => t.active).map(t => ({
        name: t.name,
        total: monthOrders.filter(o => o.assignedTo === t.name).length,
        completed: monthOrders.filter(o => o.assignedTo === t.name && o.status === 'completed').length,
        rate: monthOrders.filter(o => o.assignedTo === t.name).length > 0 
        ? Math.round((monthOrders.filter(o => o.assignedTo === t.name && o.status === 'completed').length / monthOrders.filter(o => o.assignedTo === t.name).length) * 100) : 0
    }))

    const clientData = clients.map(c => ({
        name: c.name,
        company: c.company,
        total: monthOrders.filter(o => o.clientId === c.id).length,
        completed: monthOrders.filter(o => o.clientId === c.id && o.status === 'completed').length
    })).filter(c => c.total > 0).sort((a, b) => b.total - a.total)

    const exportCSV = (data: Record<string, unknown>[], filename: string) => {
        const headers = Object.keys(data[0] || {})
        const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = filename; a.click()
    }

    const maxCount = Math.max(...statusData.map(d => d.count), 1)

    return (
        <div className={styles.reports}>
        <div className={styles.header}>
            <h1 className={styles.title}>Reportes</h1>
            <div className={styles.headerActions}>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={styles.monthInput} />
            <button onClick={() => exportCSV(
                reportType === 'status' ? statusData : reportType === 'priority' ? priorityData : reportType === 'technician' ? technicianData : clientData,
                `reporte-${reportType}-${selectedMonth}.csv`
            )} className={styles.exportBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Exportar
            </button>
            </div>
        </div>

        <div className={styles.tabs}>
            {[
            { value: 'overview' as const, label: 'Resumen' },
            { value: 'status' as const, label: 'Por Estado' },
            { value: 'priority' as const, label: 'Por Prioridad' },
            { value: 'technician' as const, label: 'Por Técnico' },
            { value: 'client' as const, label: 'Por Cliente' },
            ].map(tab => (
            <button key={tab.value} className={`${styles.tab} ${reportType === tab.value ? styles.active : ''}`} onClick={() => setReportType(tab.value)}>
                {tab.label}
            </button>
            ))}
        </div>

        {reportType === 'overview' && (
            <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
                <h3>Resumen del Mes</h3>
                <div className={styles.overviewStats}>
                <div className={styles.overviewStat}>
                    <span className={styles.overviewValue}>{monthOrders.length}</span>
                    <span className={styles.overviewLabel}>Total Órdenes</span>
                </div>
                <div className={styles.overviewStat}>
                    <span className={styles.overviewValue}>{monthOrders.filter(o => o.status === 'completed').length}</span>
                    <span className={styles.overviewLabel}>Completadas</span>
                </div>
                <div className={styles.overviewStat}>
                    <span className={styles.overviewValue}>{monthOrders.filter(o => o.priority === 'urgent').length}</span>
                    <span className={styles.overviewLabel}>Urgentes</span>
                </div>
                <div className={styles.overviewStat}>
                    <span className={styles.overviewValue}>${totalRevenue.toLocaleString()}</span>
                    <span className={styles.overviewLabel}>Ingresos Est.</span>
                </div>
                </div>
            </div>

            <div className={styles.overviewCard}>
                <h3>Distribución por Estado</h3>
                <div className={styles.barChart}>
                {statusData.map(d => (
                    <div key={d.status} className={styles.barItem}>
                    <div className={styles.barLabel}>{d.label}</div>
                    <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${(d.count / maxCount) * 100}%`, background: d.color }} />
                    </div>
                    <span className={styles.barValue}>{d.count}</span>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}

        {reportType !== 'overview' && (
            <div className={styles.tableCard}>
            <table className={styles.table}>
                <thead>
                {reportType === 'status' && <tr><th>Estado</th><th>Cantidad</th><th>%</th><th>Distribución</th></tr>}
                {reportType === 'priority' && <tr><th>Prioridad</th><th>Cantidad</th><th>%</th><th>Distribución</th></tr>}
                {reportType === 'technician' && <tr><th>Técnico</th><th>Total</th><th>Completadas</th><th>Efectividad</th></tr>}
                {reportType === 'client' && <tr><th>Cliente</th><th>Empresa</th><th>Total</th><th>Completadas</th></tr>}
                </thead>
                <tbody>
                {reportType === 'status' && statusData.map(d => (
                    <tr key={d.status}>
                    <td>
                        <div className={styles.statusCell}>
                        <div className={styles.statusDot} style={{ backgroundColor: d.color }} />
                        {d.label}
                        </div>
                    </td>
                    <td className={styles.countValue}>{d.count}</td>
                    <td>{monthOrders.length > 0 ? Math.round((d.count / monthOrders.length) * 100) : 0}%</td>
                    <td>
                        <div className={styles.miniBar}>
                        <div className={styles.miniFill} style={{ width: `${(d.count / maxCount) * 100}%`, background: d.color }} />
                        </div>
                    </td>
                    </tr>
                ))}
                {reportType === 'priority' && priorityData.map(d => (
                    <tr key={d.priority}>
                    <td>
                        <div className={styles.statusCell}>
                        <div className={styles.statusDot} style={{ backgroundColor: d.color }} />
                        {d.label}
                        </div>
                    </td>
                    <td className={styles.countValue}>{d.count}</td>
                    <td>{monthOrders.length > 0 ? Math.round((d.count / monthOrders.length) * 100) : 0}%</td>
                    <td>
                        <div className={styles.miniBar}>
                        <div className={styles.miniFill} style={{ width: `${(d.count / maxCount) * 100}%`, background: d.color }} />
                        </div>
                    </td>
                    </tr>
                ))}
                {reportType === 'technician' && technicianData.map(d => (
                    <tr key={d.name}>
                    <td>{d.name}</td>
                    <td className={styles.countValue}>{d.total}</td>
                    <td>{d.completed}</td>
                    <td>
                        <div className={styles.rateCell}>
                        <span>{d.rate}%</span>
                        <div className={styles.miniBar}>
                            <div className={styles.miniFill} style={{ width: `${d.rate}%`, background: d.rate >= 80 ? '#22c55e' : d.rate >= 50 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                        </div>
                    </td>
                    </tr>
                ))}
                {reportType === 'client' && clientData.map(d => (
                    <tr key={d.name}>
                    <td>{d.name}</td>
                    <td>{d.company}</td>
                    <td className={styles.countValue}>{d.total}</td>
                    <td>{d.completed}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    )
    }

    export default Reports