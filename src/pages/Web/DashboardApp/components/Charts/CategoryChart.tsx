    import { useEffect, useState, useRef } from 'react'
    import styles from './Charts.module.css'

    const CategoryChart = () => {
    const [isVisible, setIsVisible] = useState(false)
    const chartRef = useRef<HTMLDivElement>(null)

    const categories = [
        { name: 'Electrónica', value: 35, color: '#3b82f6' },
        { name: 'Ropa', value: 25, color: '#8b5cf6' },
        { name: 'Hogar', value: 20, color: '#22c55e' },
        { name: 'Deportes', value: 12, color: '#f59e0b' },
        { name: 'Otros', value: 8, color: '#94a3b8' },
    ]

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

    let cumulativePercent = 0

    return (
        <div className={styles.chartContainer} ref={chartRef}>
        <div className={styles.donutChart}>
            <svg viewBox="0 0 200 200">
            {categories.map((cat, index) => {
                const percent = cat.value
                const startAngle = (cumulativePercent / 100) * 360
                cumulativePercent += percent
                const endAngle = (cumulativePercent / 100) * 360
                
                const startRad = (startAngle - 90) * Math.PI / 180
                const endRad = (endAngle - 90) * Math.PI / 180
                const r = 80
                const x1 = 100 + r * Math.cos(startRad)
                const y1 = 100 + r * Math.sin(startRad)
                const x2 = 100 + r * Math.cos(endRad)
                const y2 = 100 + r * Math.sin(endRad)
                const largeArc = percent > 50 ? 1 : 0

                return (
                <path
                    key={index}
                    d={`M100,100 L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={cat.color}
                    opacity={isVisible ? 1 : 0}
                    style={{ transition: 'opacity 0.5s ease', transitionDelay: `${index * 0.15}s` }}
                />
                )
            })}
            <circle cx="100" cy="100" r="45" fill="#ffffff" />
            </svg>
            <div className={styles.donutCenter}>
            <span className={styles.donutValue}>100%</span>
            <span className={styles.donutLabel}>Total</span>
            </div>
        </div>
        <div className={styles.legend}>
            {categories.map((cat, index) => (
            <div key={index} className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: cat.color }} />
                <span className={styles.legendName}>{cat.name}</span>
                <span className={styles.legendValue}>{cat.value}%</span>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default CategoryChart