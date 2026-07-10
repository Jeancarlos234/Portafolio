    import { useEffect, useState, useRef } from 'react'
    import styles from './Charts.module.css'

    const RevenueChart = () => {
    const [isVisible, setIsVisible] = useState(false)
    const chartRef = useRef<HTMLDivElement>(null)

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
    const income = [8500, 9200, 7800, 10500, 11200, 9800]
    const expenses = [5200, 5800, 4900, 6200, 6800, 5400]
    const maxValue = Math.max(...income, ...expenses)

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) setIsVisible(true)
        },
        { threshold: 0.3 }
        )
        if (chartRef.current) observer.observe(chartRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className={styles.chartContainer} ref={chartRef}>
        <div className={styles.areaChart}>
            {months.map((month, index) => (
            <div key={index} className={styles.areaGroup}>
                <div className={styles.areaBars}>
                <div
                    className={styles.areaBar}
                    style={{
                    height: isVisible ? `${(income[index] / maxValue) * 100}%` : '0%',
                    background: 'linear-gradient(180deg, #3b82f6, #60a5fa)',
                    transitionDelay: `${index * 0.1}s`,
                    }}
                />
                <div
                    className={styles.areaBar}
                    style={{
                    height: isVisible ? `${(expenses[index] / maxValue) * 100}%` : '0%',
                    background: 'linear-gradient(180deg, #ef4444, #f87171)',
                    transitionDelay: `${index * 0.1 + 0.05}s`,
                    }}
                />
                </div>
                <span className={styles.barLabel}>{month}</span>
            </div>
            ))}
        </div>
        <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: '#3b82f6' }} />
            <span>Ingresos</span>
            </div>
            <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: '#ef4444' }} />
            <span>Gastos</span>
            </div>
        </div>
        </div>
    )
    }

    export default RevenueChart