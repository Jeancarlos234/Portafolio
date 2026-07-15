    import { useState, useMemo } from 'react'
    import styles from './Dashboard.module.css'
    import type { OrderStats, WorkOrder } from '../../types'

    interface DashboardProps {
    stats: OrderStats
    orders: WorkOrder[]
    onEdit: (order: WorkOrder) => void
    }

    const Dashboard = ({ stats, orders, onEdit }: DashboardProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today')

    // ✅ Usar useMemo para valores calculados (sin Date.now() en render)
    const today = useMemo(() => new Date().toISOString().split('T')[0], [])
    const weekStart = useMemo(() => {
        const d = new Date()
        d.setDate(d.getDate() - 7)
        return d.toISOString().split('T')[0]
    }, [])

    const filteredOrders = selectedPeriod === 'today' 
        ? orders.filter(o => o.scheduledDate === today)
        : selectedPeriod === 'week'
        ? orders.filter(o => o.scheduledDate >= weekStart)
        : orders

    // ✅ Mover las funciones fuera del render o usar useMemo
    const getPriorityColor = (p: string) => {
        switch (p) { case 'urgent': return '#dc2626'; case 'high': return '#ea580c'; case 'medium': return '#f59e0b'; case 'low': return '#22c55e'; default: return '#94a3b8' }
    }

    const getStatusColor = (s: string) => {
        switch (s) { case 'completed': return '#22c55e'; case 'in_progress': return '#ea580c'; case 'pending': case 'assigned': return '#f59e0b'; case 'cancelled': return '#94a3b8'; default: return '#94a3b8' }
    }

    // ✅ Stats con valores calculados memoizados
    const statCards = useMemo(() => [
        { label: 'Total', value: stats.totalOrders, color: '#ea580c', bg: '#fff7ed' },
        { label: 'Pendientes', value: stats.pendingOrders, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'En Progreso', value: stats.inProgressOrders, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Completadas', value: stats.completedOrders, color: '#22c55e', bg: '#f0fdf4' },
        { label: 'Tasa', value: `${stats.completionRate}%`, color: '#7c3aed', bg: '#f5f3ff' },
    ], [stats])

    const maxOrders = Math.max(stats.totalOrders, 1)

    return (
        <div className={styles.dashboard}>
        <div className={styles.statsRow}>
            {statCards.map((stat, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.statValue} style={{ color: stat.color }}>
                {stat.value}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statBar} style={{ background: stat.bg }}>
                <div 
                    className={styles.statFill} 
                    style={{ 
                    width: `${Math.min(100, (Number(stat.value.toString().replace('%', '')) / maxOrders) * 100)}%`, 
                    background: stat.color 
                    }} 
                />
                </div>
            </div>
            ))}
        </div>

        <div className={styles.grid}>
            <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3>Distribución de Órdenes</h3>
                <div className={styles.periodBtns}>
                {(['today', 'week', 'month'] as const).map(p => (
                    <button key={p} className={`${styles.periodBtn} ${selectedPeriod === p ? styles.activePeriod : ''}`} onClick={() => setSelectedPeriod(p)}>
                    {p === 'today' ? 'Hoy' : p === 'week' ? 'Semana' : 'Mes'}
                    </button>
                ))}
                </div>
            </div>
            <div className={styles.orderList}>
                {filteredOrders.slice(0, 8).map(o => (
                <div key={o.id} className={styles.orderItem} onClick={() => onEdit(o)}>
                    <div className={styles.orderLeft}>
                    <div className={styles.orderDot} style={{ backgroundColor: getStatusColor(o.status) }} />
                    <div>
                        <span className={styles.orderTitle}>{o.title}</span>
                        <span className={styles.orderClient}>{o.clientName} · {o.scheduledDate}</span>
                    </div>
                    </div>
                    <span className={styles.orderPriority} style={{ color: getPriorityColor(o.priority), background: `${getPriorityColor(o.priority)}15` }}>
                    {o.priority === 'urgent' ? 'Urgente' : o.priority === 'high' ? 'Alta' : o.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                </div>
                ))}
                {filteredOrders.length === 0 && <p className={styles.empty}>Sin órdenes en este período</p>}
            </div>
            </div>

            <div className={styles.card}>
            <h3 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Órdenes Urgentes</h3>
            {orders.filter(o => o.priority === 'urgent' && o.status !== 'completed' && o.status !== 'cancelled').slice(0, 5).map(o => (
                <div key={o.id} className={styles.urgentItem} onClick={() => onEdit(o)}>
                <div className={styles.urgentDot} />
                <div>
                    <span className={styles.urgentTitle}>{o.title}</span>
                    <span className={styles.urgentClient}>{o.clientName} · {o.assignedTo || 'Sin asignar'}</span>
                </div>
                </div>
            ))}
            {orders.filter(o => o.priority === 'urgent' && o.status !== 'completed' && o.status !== 'cancelled').length === 0 && (
                <p className={styles.empty}>No hay órdenes urgentes</p>
            )}
            </div>
        </div>
        </div>
    )
    }

    export default Dashboard