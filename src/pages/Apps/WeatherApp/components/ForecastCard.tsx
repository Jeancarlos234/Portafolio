    import styles from '../../WeatherApp/css/ForecastCard.module.css'

    interface ForecastCardProps {
    day: {
        dt: number
        main: {
        temp: number
        }
        weather: Array<{
        icon: string
        description: string
        }>
    }
    unit: 'metric' | 'imperial'
    }

    const ForecastCard = ({ day, unit }: ForecastCardProps) => {
    const getDayName = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (date.toDateString() === today.toDateString()) return 'Hoy'
        if (date.toDateString() === tomorrow.toDateString()) return 'Mañana'
        
        return date.toLocaleDateString('es-ES', { weekday: 'short' })
    }

    const getWeatherIcon = (icon: string) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    return (
        <div className={styles.card}>
        <span className={styles.day}>{getDayName(day.dt)}</span>
        <img 
            src={getWeatherIcon(day.weather[0].icon)} 
            alt={day.weather[0].description}
            className={styles.icon}
        />
        <div className={styles.tempWrapper}>
            <span className={styles.temp}>
            {Math.round(day.main.temp)}
            </span>
            <span className={styles.unit}>
            °{unit === 'metric' ? 'C' : 'F'}
            </span>
        </div>
        <span className={styles.desc}>
            {day.weather[0].description}
        </span>
        </div>
    )
    }

    export default ForecastCard