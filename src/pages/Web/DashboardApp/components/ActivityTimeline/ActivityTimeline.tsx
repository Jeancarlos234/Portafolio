    import styles from './ActivityTimeline.module.css'

    const ActivityTimeline = () => {
    const activities = [
        {
        action: 'Nueva orden completada',
        detail: 'Orden #ORD-7841 por $2,499',
        time: 'Hace 5 minutos',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
            </svg>
        ),
        color: '#22c55e',
        },
        {
        action: 'Usuario registrado',
        detail: 'Carlos García creó una cuenta',
        time: 'Hace 15 minutos',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
        ),
        color: '#3b82f6',
        },
        {
        action: 'Pago recibido',
        detail: '$1,299 de María López',
        time: 'Hace 1 hora',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        color: '#f59e0b',
        },
        {
        action: 'Producto actualizado',
        detail: 'Stock de MacBook Pro actualizado',
        time: 'Hace 3 horas',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
        ),
        color: '#8b5cf6',
        },
        {
        action: 'Orden cancelada',
        detail: 'Orden #ORD-7846 cancelada',
        time: 'Hace 5 horas',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
        ),
        color: '#ef4444',
        },
    ]

    return (
        <div className={styles.container}>
        {activities.map((activity, index) => (
            <div key={index} className={styles.activity}>
            <div className={styles.timeline}>
                <div className={styles.dot} style={{ backgroundColor: activity.color }}>
                {activity.icon}
                </div>
                {index < activities.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.content}>
                <span className={styles.action}>{activity.action}</span>
                <span className={styles.detail}>{activity.detail}</span>
                <span className={styles.time}>{activity.time}</span>
            </div>
            </div>
        ))}
        </div>
    )
    }

    export default ActivityTimeline