    import { useState } from 'react'
    import styles from './Attendance.module.css'
    import type { Employee, AttendanceRecord } from '../../types'

    interface AttendanceProps {
    employees: Employee[]
    attendance: AttendanceRecord[]
    onAdd: (record: Omit<AttendanceRecord, 'id'>) => void
    }

    const Attendance = ({ employees, attendance, onAdd }: AttendanceProps) => {
    const today = new Date().toISOString().split('T')[0]
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [checkIn, setCheckIn] = useState(new Date().toTimeString().slice(0, 5))
    const [checkOut, setCheckOut] = useState('')
    const [notes, setNotes] = useState('')
    const [message, setMessage] = useState('')

    const activeEmployees = employees.filter(e => e.status === 'active')
    const todayAttendance = attendance.filter(a => a.date === today)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedEmployee) return

        const emp = employees.find(e => e.id === selectedEmployee)
        if (!emp) return

        const hour = parseInt(checkIn.split(':')[0])
        const status = hour > 9 ? 'late' : 'present'

        onAdd({
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        date: today,
        checkIn,
        checkOut: checkOut || '--:--',
        status,
        notes,
        })

        setMessage(`Asistencia registrada para ${emp.firstName} ${emp.lastName}`)
        setSelectedEmployee('')
        setCheckIn(new Date().toTimeString().slice(0, 5))
        setCheckOut('')
        setNotes('')
        setTimeout(() => setMessage(''), 3000)
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'present': return styles.statusPresent
        case 'late': return styles.statusLate
        case 'absent': return styles.statusAbsent
        case 'half_day': return styles.statusHalfDay
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'present': return 'Presente'
        case 'late': return 'Tarde'
        case 'absent': return 'Ausente'
        case 'half_day': return 'Medio día'
        default: return status
        }
    }

    return (
        <div className={styles.attendance}>
        <div className={styles.header}>
            <h1 className={styles.title}>Registro de Asistencia</h1>
            <p className={styles.date}>{new Date(today).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {message && (
            <div className={styles.message}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            {message}
            </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Registrar Entrada/Salida</h3>
            <div className={styles.formGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Empleado *</label>
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} required className={styles.input}>
                <option value="">Seleccionar empleado...</option>
                {activeEmployees.map(e => (
                    <option key={e.id} value={e.id}>{e.firstName} {e.lastName} - {e.department}</option>
                ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Hora de entrada</label>
                <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Hora de salida</label>
                <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Notas</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={styles.input} placeholder="Opcional" />
            </div>
            </div>
            <button type="submit" className={styles.submitBtn}>Registrar Asistencia</button>
        </form>

        <div className={styles.todaySection}>
            <h3 className={styles.sectionTitle}>Asistencia de Hoy ({todayAttendance.length})</h3>
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr><th>Empleado</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Notas</th></tr></thead>
                <tbody>
                {todayAttendance.map(a => (
                    <tr key={a.id} className={styles.row}>
                    <td className={styles.empName}>{a.employeeName}</td>
                    <td>{a.checkIn}</td>
                    <td>{a.checkOut}</td>
                    <td><span className={`${styles.statusBadge} ${getStatusStyle(a.status)}`}>{getStatusLabel(a.status)}</span></td>
                    <td className={styles.notes}>{a.notes || '-'}</td>
                    </tr>
                ))}
                {todayAttendance.length === 0 && (
                    <tr><td colSpan={5} className={styles.empty}>No hay registros hoy</td></tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
    }

    export default Attendance