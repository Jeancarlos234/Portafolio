    import { useState } from 'react'
    import styles from './Calendar.module.css'

    interface CalendarProps {
    selectedDate: string
    onSelectDate: (date: string) => void
    bookedDates: string[]
    }

    const Calendar = ({ selectedDate, onSelectDate, bookedDates }: CalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    const today = new Date().toISOString().split('T')[0]

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(prev => prev - 1)
        } else {
        setCurrentMonth(prev => prev - 1)
        }
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(prev => prev + 1)
        } else {
        setCurrentMonth(prev => prev + 1)
        }
    }

    const handleDateClick = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        if (date >= today) {
        onSelectDate(date)
        }
    }

    const isPastDate = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return date < today
    }

    const isBooked = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return bookedDates.includes(date)
    }

    return (
        <div className={styles.calendar}>
        <div className={styles.header}>
            <button onClick={handlePrevMonth} className={styles.navBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
            </button>
            <h3 className={styles.monthTitle}>{months[currentMonth]} {currentYear}</h3>
            <button onClick={handleNextMonth} className={styles.navBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
            </button>
        </div>

        <div className={styles.daysHeader}>
            {daysOfWeek.map(day => (
            <span key={day} className={styles.dayName}>{day}</span>
            ))}
        </div>

        <div className={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className={styles.emptyDay} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
            const isSelected = date === selectedDate
            const past = isPastDate(day)
            const booked = isBooked(day)

            return (
                <button
                key={day}
                className={`${styles.day} ${isSelected ? styles.selected : ''} ${past ? styles.past : ''} ${booked ? styles.booked : ''}`}
                onClick={() => handleDateClick(day)}
                disabled={past}
                >
                <span className={styles.dayNumber}>{day}</span>
                {booked && <span className={styles.bookedDot}></span>}
                </button>
            )
            })}
        </div>
        </div>
    )
    }

    export default Calendar