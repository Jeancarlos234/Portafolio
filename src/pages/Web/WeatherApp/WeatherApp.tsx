    import { useState, useCallback } from 'react'
    import { Link } from 'react-router-dom'
    import SearchBar from './components/SearchBar'
    import CurrentWeather from './components/CurrentWeather'
    import ForecastCard from './components/ForecastCard'
    import WeatherDetails from './components/WeatherDetails'
    import styles from '../../../pages/Web/WeatherApp/css/WeatherApp.module.css'

    const API_KEY = '71c7f44fa689f31a12cb227050980260'

    interface WeatherData {
    name: string
    main: {
        temp: number
        feels_like: number
        humidity: number
        pressure: number
        temp_min: number
        temp_max: number
    }
    weather: Array<{
        main: string
        description: string
        icon: string
    }>
    wind: {
        speed: number
        deg: number
    }
    sys: {
        sunrise: number
        sunset: number
        country: string
    }
    visibility: number
    clouds: {
        all: number
    }
    }

    interface ForecastData {
    list: Array<{
        dt: number
        main: {
        temp: number
        temp_min: number
        temp_max: number
        }
        weather: Array<{
        icon: string
        description: string
        main: string
        }>
    }>
    }

    const WeatherApp = () => {
    const [city, setCity] = useState('Madrid')
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [forecast, setForecast] = useState<ForecastData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
    const [initialLoad, setInitialLoad] = useState(false)

    const fetchWeather = useCallback(async (cityName: string, currentUnit: string) => {
        setLoading(true)
        setError('')
        
        try {
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${currentUnit}&appid=${API_KEY}&lang=es`
        )
        
        if (!weatherRes.ok) {
            throw new Error('Ciudad no encontrada')
        }
        
        const weatherData = await weatherRes.json()
        setWeather(weatherData)

        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${currentUnit}&appid=${API_KEY}&lang=es`
        )
        const forecastData = await forecastRes.json()
        setForecast(forecastData)
        
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener datos')
        setWeather(null)
        setForecast(null)
        } finally {
        setLoading(false)
        }
    }, [])

    if (!initialLoad) {
        setInitialLoad(true)
        fetchWeather(city, unit)
    }

    const handleSearch = (searchCity: string) => {
        setCity(searchCity)
        fetchWeather(searchCity, unit)
    }

    const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
        setUnit(newUnit)
        if (weather) {
        fetchWeather(city, newUnit)
        }
    }

    const getDailyForecast = () => {
        if (!forecast) return []
        const daily = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5)
        return daily
    }

    const getBackgroundClass = () => {
        if (!weather) return styles.defaultBg
        const condition = weather.weather[0].main.toLowerCase()
        
        switch (condition) {
        case 'clear': return styles.clearBg
        case 'clouds': return styles.cloudyBg
        case 'rain':
        case 'drizzle': return styles.rainyBg
        case 'thunderstorm': return styles.stormBg
        case 'snow': return styles.snowBg
        case 'mist':
        case 'fog':
        case 'haze': return styles.mistBg
        default: return styles.defaultBg
        }
    }

    return (
        <div className={`${styles.app} ${getBackgroundClass()}`}>
        {/* Botón de regreso */}
        <Link to="/projects" className={styles.backBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al portafolio
        </Link>

        {/* Nubes decorativas de fondo */}
        <div className={styles.clouds}>
            <div className={styles.cloud1}></div>
            <div className={styles.cloud2}></div>
            <div className={styles.cloud3}></div>
        </div>

        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
                </div>
                <div>
                <h1 className={styles.title}>WeatherNow</h1>
                <p className={styles.subtitle}>Pronóstico meteorológico en tiempo real</p>
                </div>
            </div>
            </div>

            <SearchBar onSearch={handleSearch} />
            
            {/* Toggle de unidad */}
            <div className={styles.unitToggle}>
            <span className={styles.unitLabel}>Unidad:</span>
            <button 
                className={`${styles.unitBtn} ${unit === 'metric' ? styles.active : ''}`}
                onClick={() => handleUnitChange('metric')}
            >
                Celsius (°C)
            </button>
            <button 
                className={`${styles.unitBtn} ${unit === 'imperial' ? styles.active : ''}`}
                onClick={() => handleUnitChange('imperial')}
            >
                Fahrenheit (°F)
            </button>
            </div>

            {/* Loading */}
            {loading && (
            <div className={styles.loading}>
                <div className={styles.spinner}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
                </div>
                <p className={styles.loadingText}>Consultando datos meteorológicos...</p>
                <div className={styles.loadingBar}>
                <div className={styles.loadingProgress}></div>
                </div>
            </div>
            )}

            {/* Error */}
            {error && !loading && (
            <div className={styles.error}>
                <div className={styles.errorIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                </div>
                <div className={styles.errorContent}>
                <h3 className={styles.errorTitle}>Ubicación no encontrada</h3>
                <p className={styles.errorText}>{error}. Intenta con otra ciudad.</p>
                </div>
            </div>
            )}

            {/* Contenido del clima */}
            {weather && !loading && !error && (
            <div className={styles.weatherContent}>
                <CurrentWeather weather={weather} unit={unit} />
                <WeatherDetails weather={weather} unit={unit} />
                
                <div className={styles.forecastSection}>
                <h2 className={styles.forecastTitle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                    <line x1="7" y1="2" x2="7" y2="22"/>
                    <line x1="17" y1="2" x2="17" y2="22"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <line x1="2" y1="7" x2="7" y2="7"/>
                    <line x1="2" y1="17" x2="7" y2="17"/>
                    <line x1="17" y1="7" x2="22" y2="7"/>
                    <line x1="17" y1="17" x2="22" y2="17"/>
                    </svg>
                    Pronóstico de 5 días
                </h2>
                <div className={styles.forecastGrid}>
                    {getDailyForecast().map((day, index) => (
                    <ForecastCard key={index} day={day} unit={unit} />
                    ))}
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    )
    }

    export default WeatherApp