    import { useState, useRef, useEffect, useCallback } from 'react'
    import styles from '../../WeatherApp/css/SearchBar.module.css'

    interface SearchBarProps {
    onSearch: (city: string) => void
    }

    interface CitySuggestion {
    name: string
    state?: string
    country: string
    lat: number
    lon: number
    displayName: string
    }

    const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const API_KEY = '71c7f44fa689f31a12cb227050980260'

    // Buscar ciudades con debounce
    const fetchSuggestions = useCallback(async (query: string) => {
        if (query.length < 3) {
        setSuggestions([])
        setShowSuggestions(false)
        return
        }

        setIsLoading(true)
        try {
        const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        )
        const data = await res.json()
        
        const formatted: CitySuggestion[] = data.map((item: { name: string; state?: string; country: string; lat: number; lon: number }) => ({
            name: item.name,
            state: item.state,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
            displayName: item.state 
            ? `${item.name}, ${item.state}, ${item.country}`
            : `${item.name}, ${item.country}`
        }))
        
        setSuggestions(formatted)
        setShowSuggestions(formatted.length > 0)
        setSelectedIndex(-1)
        } catch {
        setSuggestions([])
        } finally {
        setIsLoading(false)
        }
    }, [])

    // Debounce para no hacer demasiadas llamadas
    useEffect(() => {
        if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        }
        
        debounceRef.current = setTimeout(() => {
        fetchSuggestions(input)
        }, 300)

        return () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        }
    }, [input, fetchSuggestions])

    // Cerrar sugerencias al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (
            suggestionsRef.current && 
            !suggestionsRef.current.contains(e.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(e.target as Node)
        ) {
            setShowSuggestions(false)
        }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = () => {
        if (input.trim()) {
        onSearch(input.trim())
        setShowSuggestions(false)
        setInput('')
        setSuggestions([])
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) {
        if (e.key === 'Enter') {
            handleSubmit()
        }
        return
        }

        switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
            )
            break
        case 'ArrowUp':
            e.preventDefault()
            setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
            )
            break
        case 'Enter':
            e.preventDefault()
            if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSelectSuggestion(suggestions[selectedIndex])
            } else {
            handleSubmit()
            }
            break
        case 'Escape':
            setShowSuggestions(false)
            setSelectedIndex(-1)
            break
        }
    }

    const handleSelectSuggestion = (suggestion: CitySuggestion) => {
        setInput(suggestion.displayName)
        onSearch(suggestion.name)
        setShowSuggestions(false)
        setSuggestions([])
        setSelectedIndex(-1)
        inputRef.current?.blur()
    }

    const handleGeolocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const { latitude, longitude } = position.coords
            try {
                const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
                )
                const data = await res.json()
                if (data.length > 0) {
                const city = data[0]
                const displayName = city.state 
                    ? `${city.name}, ${city.state}, ${city.country}`
                    : `${city.name}, ${city.country}`
                setInput(displayName)
                onSearch(city.name)
                }
            } catch {
                alert('No se pudo obtener tu ubicación')
            }
            },
            () => {
            alert('No se pudo acceder a tu ubicación')
            }
        )
        }
    }

    const getFlagEmoji = (countryCode: string) => {
        try {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char: string) => 127397 + char.charCodeAt(0))
        return String.fromCodePoint(...codePoints)
        } catch {
        return ''
        }
    }

    return (
        <div className={styles.searchWrapper}>
        <div className={styles.searchBar}>
            <div className={styles.inputWrapper}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Buscar ciudad... Ej: Guayaquil, Madrid, New York"
                className={styles.input}
                autoComplete="off"
            />
            {isLoading && (
                <div className={styles.searchingSpinner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                </div>
            )}
            <button 
                type="button" 
                onClick={handleGeolocation}
                className={styles.locationBtn}
                aria-label="Usar mi ubicación"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
                </svg>
            </button>
            </div>
            <button 
            onClick={handleSubmit} 
            className={styles.searchBtn}
            >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Buscar
            </button>
        </div>

        {/* Sugerencias */}
        {showSuggestions && suggestions.length > 0 && (
            <div className={styles.suggestions} ref={suggestionsRef}>
            <div className={styles.suggestionsHeader}>
                <span>Sugerencias</span>
                <button 
                className={styles.closeSuggestions}
                onClick={() => setShowSuggestions(false)}
                >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            <ul className={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                <li
                    key={`${suggestion.lat}-${suggestion.lon}`}
                    className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''}`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                >
                    <div className={styles.suggestionInfo}>
                    <span className={styles.suggestionCity}>{suggestion.name}</span>
                    <span className={styles.suggestionCountry}>
                        {getFlagEmoji(suggestion.country)} {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                    </span>
                    </div>
                    <div className={styles.suggestionArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    </div>
                </li>
                ))}
            </ul>
            <div className={styles.suggestionsFooter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
                </svg>
                <span>Usa las flechas para navegar, Enter para seleccionar</span>
            </div>
            </div>
        )}
        </div>
    )
    }

    export default SearchBar