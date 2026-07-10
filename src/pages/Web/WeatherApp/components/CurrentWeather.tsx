    import styles from '../../WeatherApp/css/CurrentWeather.module.css'

    interface CurrentWeatherProps {
    weather: {
        name: string
        main: {
        temp: number
        temp_min: number
        temp_max: number
        }
        weather: Array<{
        main: string
        description: string
        icon: string
        }>
        sys: {
        country: string
        }
    }
    unit: 'metric' | 'imperial'
    }

    const CurrentWeather = ({ weather, unit }: CurrentWeatherProps) => {
    const getWeatherIcon = (icon: string) => {
        return `https://openweathermap.org/img/wn/${icon}@4x.png`
    }

    const getConditionLabel = (condition: string) => {
        const labels: Record<string, string> = {
        Clear: 'Despejado',
        Clouds: 'Nublado',
        Rain: 'Lluvia',
        Drizzle: 'Llovizna',
        Thunderstorm: 'Tormenta',
        Snow: 'Nieve',
        Mist: 'Neblina',
        Fog: 'Niebla',
        Haze: 'Bruma',
        }
        return labels[condition] || condition
    }

    return (
        <div className={styles.currentWeather}>
        <div className={styles.topSection}>
            <div className={styles.locationInfo}>
            <div className={styles.locationRow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <h2 className={styles.cityName}>{weather.name}, {weather.sys.country}</h2>
            </div>
            <span className={styles.conditionLabel}>
                {getConditionLabel(weather.weather[0].main)}
            </span>
            </div>
            <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description}
            className={styles.weatherIcon}
            />
        </div>

        <div className={styles.tempSection}>
            <div className={styles.mainTemp}>
            <span className={styles.tempValue}>
                {Math.round(weather.main.temp)}
            </span>
            <span className={styles.tempUnit}>°{unit === 'metric' ? 'C' : 'F'}</span>
            </div>
            <div className={styles.tempRange}>
            <span className={styles.highTemp}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2v12m0-12l-4 4m4-4l4 4"/>
                </svg>
                {Math.round(weather.main.temp_max)}°
            </span>
            <span className={styles.lowTemp}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22V10m0 12l-4-4m4 4l4-4"/>
                </svg>
                {Math.round(weather.main.temp_min)}°
            </span>
            </div>
        </div>

        <p className={styles.description}>
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
        </p>
        </div>
    )
    }

    export default CurrentWeather