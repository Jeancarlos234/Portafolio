    import { useState, useMemo } from 'react'
    import styles from './Calendar.module.css'
    import type { CalendarEvent } from '../../types'

    interface CorpCalendarProps {
    events: CalendarEvent[]
    onAdd: (event: Omit<CalendarEvent, 'id'>) => void
    }

    const CorpCalendar = ({ events, onAdd }: CorpCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState<{
        title: string
        date: string
        time: string
        type: CalendarEvent['type']
        attendees: string
    }>({ 
        title: '', date: '', time: '', type: 'meeting', attendees: '' 
    })

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()

    const today = useMemo(() => new Date().toISOString().split('T')[0], [])

    const getEventsForDate = (day: number) => {
        const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return events.filter(e => e.date === date)
    }

    const handlePrev = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(p => p - 1) }
        else setCurrentMonth(p => p - 1)
    }

    const handleNext = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(p => p + 1) }
        else setCurrentMonth(p => p + 1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.date) return
        onAdd({ 
        title: formData.title,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean)
        })
        setFormData({ title: '', date: '', time: '', type: 'meeting', attendees: '' })
        setShowForm(false)
    }

    return (
        <div className={styles.calendar}>
        <div className={styles.header}>
            <h1 className={styles.title}>Calendario Corporativo</h1>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            {showForm ? 'Cancelar' : '+ Evento'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <input type="text" placeholder="Título *" value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} required className={styles.input} />
                <input type="date" value={formData.date} onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))} required className={styles.input} />
                <input type="time" value={formData.time} onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))} className={styles.input} />
                <select value={formData.type} onChange={(e) => setFormData(p => ({ ...p, type: e.target.value as CalendarEvent['type'] }))} className={styles.input}>
                <option value="meeting">Reunión</option>
                <option value="deadline">Entrega</option>
                <option value="reminder">Recordatorio</option>
                <option value="call">Llamada</option>
                </select>
                <input type="text" placeholder="Asistentes (separados por coma)" value={formData.attendees} onChange={(e) => setFormData(p => ({ ...p, attendees: e.target.value }))} className={styles.input} />
                <button type="submit" className={styles.submitBtn}>Guardar</button>
            </div>
            </form>
        )}

        <div className={styles.grid}>
            <div className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
                <button onClick={handlePrev} className={styles.navBtn}>◀</button>
                <h3>{monthNames[currentMonth]} {currentYear}</h3>
                <button onClick={handleNext} className={styles.navBtn}>▶</button>
            </div>
            <div className={styles.daysHeader}>
                {daysOfWeek.map(d => <span key={d}>{d}</span>)}
            </div>
            <div className={styles.daysGrid}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                const dayEvents = getEventsForDate(day)
                return (
                    <div key={day} className={`${styles.day} ${date === today ? styles.today : ''} ${dayEvents.length > 0 ? styles.hasEvent : ''}`}>
                    <span>{day}</span>
                    {dayEvents.length > 0 && <div className={styles.dot} />}
                    </div>
                )
                })}
            </div>
            </div>

            <div className={styles.eventsCard}>
            <h3>Próximos Eventos</h3>
            {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5).map(e => (
                <div key={e.id} className={styles.eventItem}>
                <span className={styles.eventDate}>{new Date(e.date + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                <span className={styles.eventTitle}>{e.title}</span>
                <span className={styles.eventTime}>{e.time}</span>
                </div>
            ))}
            {events.length === 0 && <p className={styles.empty}>Sin eventos</p>}
            </div>
        </div>
        </div>
    )
    }

    export default CorpCalendar