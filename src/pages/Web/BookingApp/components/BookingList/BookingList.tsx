    import { useState } from 'react'
    import styles from './BookingList.module.css'
    import type { Booking } from '../../type'

    interface BookingListProps {
    bookings: Booking[]
    onCancel: (id: string) => void
    }

    const BookingList = ({ bookings, onCancel }: BookingListProps) => {
    const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all')

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true
        return b.status === filter
    })

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'confirmed': return styles.statusConfirmed
        case 'pending': return styles.statusPending
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'confirmed': return 'Confirmada'
        case 'pending': return 'Pendiente'
        case 'cancelled': return 'Cancelada'
        default: return status
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })
    }

    const formatTime = (timeStr: string) => {
        const [hour, minute] = timeStr.split(':')
        const h = parseInt(hour)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
        return `${h12}:${minute} ${ampm}`
    }

    return (
        <div className={styles.list}>
        <div className={styles.header}>
            <h2 className={styles.title}>Mis Reservas ({bookings.filter(b => b.status === 'confirmed').length})</h2>
            <div className={styles.filters}>
            {(['all', 'confirmed', 'cancelled'] as const).map(f => (
                <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                onClick={() => setFilter(f)}
                >
                {f === 'all' ? 'Todas' : f === 'confirmed' ? 'Confirmadas' : 'Canceladas'}
                </button>
            ))}
            </div>
        </div>

        {filteredBookings.length === 0 ? (
            <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <h3>No hay reservas</h3>
            <p>{filter === 'all' ? 'Aún no has hecho ninguna reserva' : `No tienes reservas ${filter === 'confirmed' ? 'confirmadas' : 'canceladas'}`}</p>
            </div>
        ) : (
            <div className={styles.grid}>
            {filteredBookings.map(booking => (
                <div key={booking.id} className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className={styles.serviceName}>{booking.serviceName}</span>
                    <span className={`${styles.status} ${getStatusStyle(booking.status)}`}>
                    {getStatusLabel(booking.status)}
                    </span>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    </svg>
                    <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{formatTime(booking.time)}</span>
                    </div>
                    <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>{booking.name}</span>
                    </div>
                </div>
                {booking.notes && (
                    <p className={styles.notes}>"{booking.notes}"</p>
                )}
                {booking.status === 'confirmed' && (
                    <button 
                    className={styles.cancelBtn}
                    onClick={() => onCancel(booking.id)}
                    >
                    Cancelar reserva
                    </button>
                )}
                </div>
            ))}
            </div>
        )}
        </div>
    )
    }

    export default BookingList