    import styles from './TimeSlots.module.css'

    interface TimeSlotsProps {
    slots: { time: string; available: boolean }[]
    selectedTime: string
    onSelectTime: (time: string) => void
    }

    const TimeSlots = ({ slots, selectedTime, onSelectTime }: TimeSlotsProps) => {
    const morningSlots = slots.filter(s => parseInt(s.time.split(':')[0]) < 12)
    const afternoonSlots = slots.filter(s => parseInt(s.time.split(':')[0]) >= 12)

    const formatTime = (time: string) => {
        const [hour, minute] = time.split(':')
        const h = parseInt(hour)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
        return `${h12}:${minute} ${ampm}`
    }

    return (
        <div className={styles.timeSlots}>
        <h3 className={styles.title}>Selecciona un horario</h3>

        {morningSlots.length > 0 && (
            <div className={styles.section}>
            <span className={styles.periodLabel}>Mañana</span>
            <div className={styles.grid}>
                {morningSlots.map(slot => (
                <button
                    key={slot.time}
                    className={`${styles.slot} ${!slot.available ? styles.unavailable : ''} ${selectedTime === slot.time ? styles.selected : ''}`}
                    onClick={() => slot.available && onSelectTime(slot.time)}
                    disabled={!slot.available}
                >
                    {formatTime(slot.time)}
                </button>
                ))}
            </div>
            </div>
        )}

        {afternoonSlots.length > 0 && (
            <div className={styles.section}>
            <span className={styles.periodLabel}>Tarde</span>
            <div className={styles.grid}>
                {afternoonSlots.map(slot => (
                <button
                    key={slot.time}
                    className={`${styles.slot} ${!slot.available ? styles.unavailable : ''} ${selectedTime === slot.time ? styles.selected : ''}`}
                    onClick={() => slot.available && onSelectTime(slot.time)}
                    disabled={!slot.available}
                >
                    {formatTime(slot.time)}
                </button>
                ))}
            </div>
            </div>
        )}
        </div>
    )
    }

    export default TimeSlots