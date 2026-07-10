    import { useEffect, useState, useMemo } from 'react'
    import styles from './KPICards.module.css'

    const KPICards = () => {
    const [counters, setCounters] = useState({
        sales: 0,
        users: 0,
        conversion: 0,
        revenue: 0,
        orders: 0,
        products: 0,
    })
    const [isVisible, setIsVisible] = useState(false)

    // ✅ Valores deterministas para las barras (sin Math.random)
    const barWidths = useMemo(() => {
        return [78, 65, 82, 70, 88, 73] // Valores fijos basados en el índice
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isVisible) return
        const finalValues = { sales: 48250, users: 2847, conversion: 3.24, revenue: 15680, orders: 423, products: 1892 }
        const duration = 1500
        const steps = 50
        const interval = duration / steps
        let step = 0

        const timer = setInterval(() => {
        step++
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        setCounters({
            sales: Math.round(finalValues.sales * eased),
            users: Math.round(finalValues.users * eased),
            conversion: +(finalValues.conversion * eased).toFixed(2),
            revenue: Math.round(finalValues.revenue * eased),
            orders: Math.round(finalValues.orders * eased),
            products: Math.round(finalValues.products * eased),
        })
        if (step >= steps) {
            clearInterval(timer)
            setCounters(finalValues)
        }
        }, interval)
        return () => clearInterval(timer)
    }, [isVisible])

    const kpis = [
        {
        title: 'Ventas Totales',
        value: `$${counters.sales.toLocaleString()}`,
        change: '+12.5%',
        positive: true,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        color: '#3b82f6',
        bgColor: '#eff6ff',
        },
        {
        title: 'Usuarios Activos',
        value: counters.users.toLocaleString(),
        change: '+8.2%',
        positive: true,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
        color: '#8b5cf6',
        bgColor: '#f5f3ff',
        },
        {
        title: 'Tasa de Conversión',
        value: `${counters.conversion}%`,
        change: '-0.8%',
        positive: false,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        ),
        color: '#f59e0b',
        bgColor: '#fffbeb',
        },
        {
        title: 'Ingresos Mensuales',
        value: `$${counters.revenue.toLocaleString()}`,
        change: '+15.3%',
        positive: true,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        color: '#22c55e',
        bgColor: '#f0fdf4',
        },
        {
        title: 'Órdenes Pendientes',
        value: counters.orders.toString(),
        change: '+5.7%',
        positive: true,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        ),
        color: '#ef4444',
        bgColor: '#fef2f2',
        },
        {
        title: 'Productos Vendidos',
        value: counters.products.toLocaleString(),
        change: '+18.9%',
        positive: true,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
        color: '#06b6d4',
        bgColor: '#ecfeff',
        },
    ]

    return (
        <div className={`${styles.kpiGrid} ${isVisible ? styles.visible : ''}`}>
        {kpis.map((kpi, index) => (
            <div 
            key={index} 
            className={styles.kpiCard}
            style={{ animationDelay: `${index * 0.1}s` }}
            >
            <div className={styles.kpiHeader}>
                <div className={styles.kpiIcon} style={{ backgroundColor: kpi.bgColor, color: kpi.color }}>
                {kpi.icon}
                </div>
                <div className={`${styles.kpiChange} ${kpi.positive ? styles.positive : styles.negative}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {kpi.positive ? (
                    <polyline points="18 15 12 9 6 15"/>
                    ) : (
                    <polyline points="6 9 12 15 18 9"/>
                    )}
                </svg>
                {kpi.change}
                </div>
            </div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiTitle}>{kpi.title}</div>
            <div className={styles.kpiBar}>
                <div 
                className={styles.kpiBarFill} 
                style={{ 
                    width: `${barWidths[index]}%`,  // ✅ Usando valores deterministas
                    backgroundColor: kpi.color 
                }} 
                />
            </div>
            </div>
        ))}
        </div>
    )
    }

    export default KPICards