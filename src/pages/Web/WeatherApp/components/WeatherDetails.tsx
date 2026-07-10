    import styles from '../../WeatherApp/css/WeatherDetails.module.css'

    interface WeatherDetailsProps {
    weather: {
        main: {
        feels_like: number
        humidity: number
        pressure: number
        }
        wind: {
        speed: number
        deg: number
        }
        sys: {
        sunrise: number
        sunset: number
        }
        visibility: number
        clouds: {
        all: number
        }
    }
    unit: 'metric' | 'imperial'
    }

    const WeatherDetails = ({ weather, unit }: WeatherDetailsProps) => {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        })
    }

    const getWindDirection = (deg: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
        const index = Math.round(deg / 45) % 8
        return directions[index]
    }

    const details = [
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
            </svg>
        ),
        label: 'Sensación térmica',
        value: `${Math.round(weather.main.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`,
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
        ),
        label: 'Humedad',
        value: `${weather.main.humidity}%`,
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        label: 'Viento',
        value: `${weather.wind.speed} m/s ${getWindDirection(weather.wind.deg)}`,
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
            </svg>
        ),
        label: 'Amanecer',
        value: formatTime(weather.sys.sunrise),
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l-4 2"/>
            </svg>
        ),
        label: 'Atardecer',
        value: formatTime(weather.sys.sunset),
        },
        {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
            </svg>
        ),
        label: 'Visibilidad',
        value: `${(weather.visibility / 1000).toFixed(1)} km`,
        },
    ]

    return (
        <div className={styles.details}>
        <div className={styles.grid}>
            {details.map((detail, index) => (
            <div key={index} className={styles.card}>
                <div className={styles.icon}>{detail.icon}</div>
                <div className={styles.info}>
                <span className={styles.label}>{detail.label}</span>
                <span className={styles.value}>{detail.value}</span>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default WeatherDetails