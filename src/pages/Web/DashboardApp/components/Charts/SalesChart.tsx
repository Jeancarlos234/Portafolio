    import { useEffect, useState, useRef } from 'react'
    import styles from './Charts.module.css'

    const SalesChart = () => {
    const [isVisible, setIsVisible] = useState(false)
    const chartRef = useRef<HTMLDivElement>(null)

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const data = [4500, 5200, 4800, 6100, 7300, 6800, 8200, 9100, 8700, 9500, 10200, 11500]
    const maxValue = Math.max(...data)

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
        <div className={styles.barChart}>
            {data.map((value, index) => (
            <div key={index} className={styles.barGroup}>
                <div className={styles.barValue}>${value.toLocaleString()}</div>
                <div className={styles.barWrapper}>
                <div
                    className={styles.bar}
                    style={{
                    height: isVisible ? `${(value / maxValue) * 100}%` : '0%',
                    background: 'linear-gradient(180deg, #3b82f6, #60a5fa)',
                    transitionDelay: `${index * 0.08}s`,
                    }}
                />
                </div>
                <span className={styles.barLabel}>{months[index]}</span>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default SalesChart