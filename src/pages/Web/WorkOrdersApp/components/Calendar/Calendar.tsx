    import { useState } from 'react'
    import styles from './Calendar.module.css'
    import type { WorkOrder } from '../../types'

    interface OrderCalendarProps {
    orders: WorkOrder[]
    }

    const OrderCalendar = ({ orders }: OrderCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = useState<string | null>(new Date().toISOString().split('T')[0])
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()
    const getFirstDay = (month: number, year: number) => new Date(year, month, 1).getDay()
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDay(currentMonth, currentYear)

    const getOrdersForDate = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return orders.filter(o => o.scheduledDate === date && o.status !== 'cancelled')
    }

    const selectedDateOrders = selectedDate 
        ? orders.filter(o => o.scheduledDate === selectedDate && o.status !== 'cancelled')
        : []

    const handlePrev = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(p => p - 1) }
        else setCurrentMonth(p => p - 1)
    }
    const handleNext = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(p => p + 1) }
        else setCurrentMonth(p => p + 1)
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) { case 'urgent': return '#dc2626'; case 'high': return '#ea580c'; case 'medium': return '#f59e0b'; case 'low': return '#22c55e'; default: return '#94a3b8' }
    }

    const getStatusColor = (status: string) => {
        switch (status) { case 'completed': return '#22c55e'; case 'in_progress': return '#ea580c'; case 'pending': case 'assigned': return '#f59e0b'; case 'cancelled': return '#94a3b8'; default: return '#94a3b8' }
    }

    const getStatusLabel = (status: string) => {
        switch (status) { case 'completed': return 'Completado'; case 'in_progress': return 'En Progreso'; case 'pending': return 'Pendiente'; case 'assigned': return 'Asignado'; case 'cancelled': return 'Cancelado'; default: return status }
    }

    const upcomingOrders = [...orders]
        .filter(o => o.status !== 'completed' && o.status !== 'cancelled')
        .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
        .slice(0, 10)

    return (
        <div className={styles.calendar}>
        <div className={styles.header}>
            <h1 className={styles.title}>Calendario de Órdenes</h1>
            <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${viewMode === 'calendar' ? styles.activeView : ''}`} onClick={() => setViewMode('calendar')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Calendario
            </button>
            <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`} onClick={() => setViewMode('list')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Lista
            </button>
            </div>
        </div>

        {viewMode === 'calendar' ? (
            <div className={styles.grid}>
            <div className={styles.calendarCard}>
                <div className={styles.calendarHeader}>
                <button onClick={handlePrev} className={styles.navBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <h3 className={styles.monthTitle}>{monthNames[currentMonth]} {currentYear}</h3>
                <button onClick={handleNext} className={styles.navBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                </div>

                <div className={styles.daysHeader}>
                {daysOfWeek.map(d => <span key={d} className={styles.dayName}>{d}</span>)}
                </div>

                <div className={styles.daysGrid}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className={styles.emptyDay} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                    const dayOrders = getOrdersForDate(day)
                    const isToday = date === new Date().toISOString().split('T')[0]
                    const isSelected = date === selectedDate

                    return (
                    <div 
                        key={day} 
                        className={`${styles.day} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${dayOrders.length > 0 ? styles.hasOrders : ''}`} 
                        onClick={() => setSelectedDate(date)}
                    >
                        <span className={styles.dayNumber}>{day}</span>
                        {dayOrders.length > 0 && (
                        <div className={styles.orderDots}>
                            {dayOrders.slice(0, 4).map((o, j) => (
                            <div key={j} className={styles.dot} style={{ backgroundColor: getStatusColor(o.status) }} title={o.title} />
                            ))}
                            {dayOrders.length > 4 && <span className={styles.moreCount}>+{dayOrders.length - 4}</span>}
                        </div>
                        )}
                    </div>
                    )
                })}
                </div>

                <div className={styles.legend}>
                {[
                    { color: '#f59e0b', label: 'Pendiente' },
                    { color: '#ea580c', label: 'En Progreso' },
                    { color: '#22c55e', label: 'Completado' },
                ].map(l => (
                    <div key={l.label} className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ backgroundColor: l.color }} />
                    <span>{l.label}</span>
                    </div>
                ))}
                </div>
            </div>

            <div className={styles.ordersCard}>
                <h3 className={styles.ordersTitle}>
                {selectedDate 
                    ? `Órdenes del ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`
                    : 'Selecciona una fecha'}
                </h3>
                <div className={styles.orderList}>
                {selectedDateOrders.length > 0 ? (
                    selectedDateOrders.map(o => (
                    <div key={o.id} className={styles.orderItem}>
                        <div className={styles.orderDot} style={{ backgroundColor: getPriorityColor(o.priority) }} />
                        <div className={styles.orderInfo}>
                        <div className={styles.orderHeader}>
                            <span className={styles.orderNumber}>{o.number}</span>
                            <span className={styles.orderStatus} style={{ color: getStatusColor(o.status), background: `${getStatusColor(o.status)}15` }}>
                            {getStatusLabel(o.status)}
                            </span>
                        </div>
                        <span className={styles.orderTitle}>{o.title}</span>
                        <div className={styles.orderMeta}>
                            <span>{o.clientName}</span>
                            <span>{o.startTime} - {o.endTime}</span>
                            {o.assignedTo && <span className={styles.assigned}>{o.assignedTo}</span>}
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <p className={styles.empty}>No hay órdenes para esta fecha</p>
                )}
                </div>
            </div>
            </div>
        ) : (
            <div className={styles.listView}>
            <h3 className={styles.listTitle}>Próximas Órdenes ({upcomingOrders.length})</h3>
            <div className={styles.upcomingList}>
                {upcomingOrders.map(o => (
                <div key={o.id} className={styles.upcomingItem}>
                    <div className={styles.upcomingDate}>
                    <span className={styles.upcomingDay}>{new Date(o.scheduledDate + 'T00:00:00').getDate()}</span>
                    <span className={styles.upcomingMonth}>{monthNames[new Date(o.scheduledDate + 'T00:00:00').getMonth()].slice(0, 3)}</span>
                    </div>
                    <div className={styles.upcomingDot} style={{ backgroundColor: getPriorityColor(o.priority) }} />
                    <div className={styles.upcomingInfo}>
                    <span className={styles.upcomingTitle}>{o.title}</span>
                    <span className={styles.upcomingClient}>{o.clientName} · {o.startTime}</span>
                    </div>
                    <span className={styles.upcomingStatus} style={{ color: getStatusColor(o.status), background: `${getStatusColor(o.status)}15` }}>
                    {getStatusLabel(o.status)}
                    </span>
                </div>
                ))}
                {upcomingOrders.length === 0 && <p className={styles.empty}>No hay órdenes próximas</p>}
            </div>
            </div>
        )}
        </div>
    )
    }

    export default OrderCalendar