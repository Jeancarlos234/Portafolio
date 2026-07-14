    import { useState } from 'react'
    import styles from './Calendar.module.css'
    import type { VacationRequest } from '../../types'

    interface VacationCalendarProps {
    vacations: VacationRequest[]
    }

    const VacationCalendar = ({ vacations }: VacationCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    const approvedVacations = vacations.filter(v => v.status === 'approved')

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()
    const getFirstDay = (month: number, year: number) => new Date(year, month, 1).getDay()

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDay(currentMonth, currentYear)

    const isOnVacation = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return approvedVacations.filter(v => date >= v.startDate && date <= v.endDate)
    }

    const handlePrev = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(p => p - 1) }
        else setCurrentMonth(p => p - 1)
    }

    const handleNext = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(p => p + 1) }
        else setCurrentMonth(p => p + 1)
    }

    return (
        <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
            <button onClick={handlePrev} className={styles.navBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h3 className={styles.monthTitle}>{monthNames[currentMonth]} {currentYear}</h3>
            <button onClick={handleNext} className={styles.navBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
        </div>

        <div className={styles.daysHeader}>
            {daysOfWeek.map(d => <span key={d} className={styles.dayName}>{d}</span>)}
        </div>

        <div className={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className={styles.emptyDay} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const vacationers = isOnVacation(day)
            return (
                <div key={day} className={`${styles.day} ${vacationers.length > 0 ? styles.vacationDay : ''}`}>
                <span className={styles.dayNumber}>{day}</span>
                {vacationers.length > 0 && (
                    <div className={styles.vacationTooltip}>
                    {vacationers.map(v => (
                        <span key={v.id} className={styles.vacationName}>{v.employeeName}</span>
                    ))}
                    </div>
                )}
                </div>
            )
            })}
        </div>

        <div className={styles.legend}>
            <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.legendVacation}`}></div>
            <span>Vacaciones aprobadas</span>
            </div>
        </div>
        </div>
    )
    }

    export default VacationCalendar